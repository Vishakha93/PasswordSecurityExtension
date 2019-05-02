'use strict';

/*
 * Intercept messages sent by contentSript.js 
chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {
  alert(response);
});
*/

    // add event listners

chrome.webRequest.onCompleted.addListener( 
  function(details) {
    console.log('onCompleted', details);
  },
  {urls: ["<all_urls>"]},
  []
);


chrome.runtime.onInstalled.addListener(function(details) {

     chrome.storage.local.clear(function() {

      });

});
