'use strict';

/*
 * Intercept messages sent by contentSript.js 
chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {
  alert(response);
});
*/

    // add event listners

let PasswordStatusEnum = {
  UNVERIFIED: "UNVERIFIED",
  VERIFIED: "VERIFIED"
}

/*chrome.webRequest.onCompleted.addListener( 
  function(details) {
    console.log('onCompleted', details);
  },
  {urls: ["<all_urls>"]},
  []
);*/


chrome.runtime.onInstalled.addListener(function(details) {

     chrome.storage.local.clear(function() {

      });

});



/*Referred - https://stackoverflow.com/questions/736513/how-do-i-parse-a-url-into-hostname-and-path-in-javascript*/
var getLocation = function(href) {
    var l = document.createElement("a");
    l.href = href;
    return l;
};

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

chrome.webNavigation.onCommitted.addListener(function (details) {

    let NAVIGATE_TIME_IN_MILLIS = 600000;
    console.log(details);
    if(details.frameId === 0 && (details.transitionType === 'form_submit' || details.transitionType === 'link')) {

        let hostUrl = getLocation(details.url);
        let hostName = hostUrl.hostname;
        chrome.storage.local.get({ enigmaPlugin: []}, function (result) {
            let enigmaPlugin = result.enigmaPlugin;
            let allPasswords = enigmaPlugin.filter(urlPassword => (urlPassword.url === hostName));

            //Get the entry with latest password
            let latestPassword = allPasswords.sort(function(a, b){
                                    var keyA = new Date(a.storeTime),
                                        keyB = new Date(b.storeTime);
                                    // Compare the 2 dates
                                    if(keyA < keyB) return 1;
                                    if(keyA > keyB) return -1;
                                    return 0;
                                })[0];

            let currenTime = Date.now()
            let timeDiff =  currenTime - latestPassword.storeTime;

            if (timeDiff < NAVIGATE_TIME_IN_MILLIS) {

                latestPassword.storeTime = currenTime;
                latestPassword.status = PasswordStatusEnum.VERIFIED;

                //This deletes all the entries for this website
                let updatedData = enigmaPlugin.filter(urlPassword => (urlPassword.url != hostName));

                //Add the latest entry which we just VERIFIED into the password field
                updatedData.push(latestPassword);

                chrome.storage.local.set({enigmaPlugin: updatedData}, function () {
                  console.log("Stored in DB");

                  alert("Stored in DB");
                });
            }
        });
    }
})




function loadUrls(json)
{
  var jsonSize = Object.keys(json).length;
  // chrome.storage.local.get({ enigmaExtension_urls: []}, function (result) {
    // let whitelist = result.enigmaExtension_urls;
    let whitelist = [];
    for(var i = 0; i < jsonSize; i++)
    {
      whitelist.push(json[i]);
    }
    let url_set = new Set(whitelist);
    whitelist = [...url_set];
    chrome.storage.local.set({'enigmaExtension_urls': whitelist}, function () {
    // chrome.storage.local.get('enigmaExtension_urls', function (result2) {
      //alert(result2.enigmaExtension_urls);
    console.log("Done!");
    // });

    });
  // });
}

const url = chrome.runtime.getURL('alexa_10k.json');

fetch(url)
    .then((response) => response.json()) //assuming file contains json
    .then((json) => loadUrls(json));


