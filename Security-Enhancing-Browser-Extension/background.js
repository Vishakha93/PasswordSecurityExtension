// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

/*
 * Our plugin pop up is shown only when the page has password field
 */
 
chrome.runtime.onInstalled.addListener(function(details) {
  var rule = {
    conditions: [
      new chrome.declarativeContent.PageStateMatcher({
        css: ["input[type='password']"],
      })
    ],
    actions: [ new chrome.declarativeContent.ShowPageAction() ]
  };

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([rule]);
  });
});


/*
 * Intercept messages sent by contentSript.js 
chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {
  alert(response);
});
*/