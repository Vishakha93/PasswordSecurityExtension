'use strict';

/*
 * Intercept messages sent by contentSript.js 
chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {
  alert(response);
});
*/


chrome.runtime.onInstalled.addListener(function(details) {

     chrome.storage.local.clear(function() {

      });

});
