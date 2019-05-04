/************** Alexa-10k support ******************/

function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

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
			// chrome.storage.local.get('enigmaExtension_urls', function (result2) {
				alert(result2.enigmaExtension_urls);
			// });

		});
	});
}

function matchHostnames(hostname, domain)
{
	if (hostname.endsWith(domain))
		return true;
	else
		return false;
}

function interceptClickEvent() 
{
	var anchors = document.getElementsByTagName("a");
	chrome.storage.local.get({ enigmaExtension_urls: []}, function (result) {
		var whitelist = result.enigmaExtension_urls;
		for (var i = 0, length = anchors.length; i < length; i++) {
		  	var anchor = anchors[i];
		  	var hostname;
		  	// var size;
		  	anchor.addEventListener('click', function(event) {
		    	// `this` refers to the anchor tag that's been clicked
		    	hostname = extractHostname(this.href);
		    	flag = 1;
		    	if (flag && whitelist != null)
		    	{
		    		for(var k = 0; k < whitelist.length; k++)
		    		{
		    			if(matchHostnames(hostname, whitelist[k]))
		    				flag = 0;		
		    		}
		    	}
		    	if (flag)
		    	{
		    		if (confirm(hostname + " doesn't belong to Alexa Top 10k websites!\nStill continue to website?"))
		    		{
		    			if (confirm("Add " + hostname + " to list of safe sites?"))
		    			{
							storeUrl(hostname);
		    			}
		    		}
		    		else
		    		{
			    		event.preventDefault();
		    		}
		    	}
	    		// Log the clicked element in the console
				console.log(event.target);
		  	}, true);
		};
	});
}
interceptClickEvent();