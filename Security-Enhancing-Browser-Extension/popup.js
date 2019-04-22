'use strict';

let messageElem = document.getElementById('message');

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	messageElem.innerHTML = tabs[0].url;
});
