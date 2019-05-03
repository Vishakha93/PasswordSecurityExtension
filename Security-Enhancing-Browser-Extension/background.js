'use strict';

/*
 * Intercept messages sent by contentSript.js 
chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {
  alert(response);
});
*/

    // add event listners

let PasswordStatusEnum = {
  UNVERIFIED: 1,
  VERIFIED: 2
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

chrome.webNavigation.onCommitted.addListener(function (details) {

    let NAVIGATE_TIME_IN_MILLIS = 600000;
    console.log(details);
    if(details.frameId === 0 && details.transitionType === 'form_submit') {

        let hostUrl = getLocation(details.url);
        let hostName = hostUrl.hostname;
        chrome.storage.local.get({ enigmaPlugin: []}, function (result) {
            let enigmaPlugin = result.enigmaPlugin;
            let matchedUrls = enigmaPlugin.filter(urlPassword => (urlPassword.url === hostName));
            let existingData = matchedUrls[0];
            let currenTime = Date.now()
            let timeDiff =  currenTime - existingData.storeTime;

            if (timeDiff < NAVIGATE_TIME_IN_MILLIS) {

                existingData.storeTime = currenTime;
                existingData.status = PasswordStatusEnum.VERIFIED;
                let updatedData = enigmaPlugin.filter(urlPassword => (urlPassword.url != hostName));
                updatedData.push(existingData);

                chrome.storage.local.set({enigmaPlugin: updatedData}, function () {
                  console.log("Stored in DB");
                });
            }
        });
    }
})