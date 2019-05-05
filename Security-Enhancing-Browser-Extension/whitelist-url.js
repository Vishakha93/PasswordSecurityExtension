/************** Alexa-10k support ******************/

/*
Problems
1. sweet alert. DONE
2. preventdefault not working for clicks. 
3. yy.com is whitelisted so swiggyy.com will get whitelisted too. DONE
4. link gets saved after clicking twice
5. on Right-click link doesn't gets whitelisted.
*/

function extractHostname(url) {
    var hostname;
    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];
    console.log(hostname);
    hostname = hostname.replace('www.','');
    console.log(hostname);
    return hostname;
}

function storeUrl(url)
{
	chrome.storage.local.get({ enigmaExtension_urls: []}, function (result) {
		let whitelist = result.enigmaExtension_urls;
		whitelist.push(url);
		let url_set = new Set(whitelist);
		whitelist = [...url_set];
		
		chrome.storage.local.set({'enigmaExtension_urls': whitelist}, function () {
			chrome.storage.local.get('enigmaExtension_urls', function (result2) {
				alert(result2.enigmaExtension_urls);
			});

		});
	});
}

function matchHostnames(hostname, domain)
{
	hostname = "." + hostname;
	domain = "." + domain;
	if (hostname.endsWith(domain))
		return true;
	else
		return false;
}

function interceptClickEvent() 
{
	var anchors = document.getElementsByTagName("a");
	chrome.storage.local.get({ enigmaExtension_urls: []}, function (result) {
		for (var i = 0, length = anchors.length; i < length; i++) {
		  	var anchor = anchors[i];
		  	var hostname;
		  	// var size;
		  	anchor.addEventListener('click', function(event) {
	    	// `this` refers to the anchor tag that's been clicked
	    	hostname = extractHostname(this.href);
			var whitelist = result.enigmaExtension_urls;
	    	flag = 1;
	    	if (whitelist == null)
	    	{
	    		console.log("Whitelist is Null by default!");
	    		refreshWhitelist();
	    	}
    		for(var k = 0; k < whitelist.length; k++)
    		{
    			if(matchHostnames(hostname, whitelist[k]))
    				flag = 0;		
    		}
	    	if (flag)
	    	{
	    		event.preventDefault();
				swal({
				  title: "'" + hostname + "' not in Alexa Top 10k!",
				  text: "Still Continue?",
				  icon: "warning",
				  buttons: {
				    cancel: "Cancel",
				    catch: {
				      text: "Allow this once",
				      value: "skip",
				    },
				    skip: {
				    	text: "Allow always",
				    	value: "whitelist",
				    },
				  },
				})
				.then((value) => {
				  let closest_link = event.target.closest('a');
				  switch (value) {
				    case "whitelist":
				    	storeUrl(hostname);
						window.open(closest_link.href,"_self");
				    	break;				 
				    case "skip":
						window.open(closest_link.href,"_self");
				    	break;				 
				    default:
				  }
				});
	    	}
    		// Log the clicked element in the console
			
		  	}, true);
		};
    });
}
interceptClickEvent();