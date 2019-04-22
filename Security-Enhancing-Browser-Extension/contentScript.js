function storeUrlAndPassword(url, password) 
{
	chrome.storage.local.get({ enigmaPlugin: []}, function (result) {
		let enigmaPlugin = result.enigmaPlugin;

		enigmaPlugin = enigmaPlugin.filter(urlPassword => (urlPassword.url != url));
		enigmaPlugin.push({url: url, password: password});
		
		chrome.storage.local.set({enigmaPlugin: enigmaPlugin}, function () {
			chrome.storage.local.get('enigmaPlugin', function (result2) {
				alert(JSON.stringify(result2.enigmaPlugin));
			});
		});
	});
}

function interceptPassword() 
{	
	let passwordElem = document.querySelector("input[type=\'password\']");
	if (passwordElem){
		let url = window.location.host;
		let password = passwordElem.value;
		storeUrlAndPassword(url, password);
	}
}

function interceptSubmitEvent() 
{
	let submitBtn = document.querySelector('input[type=\'submit\'], button[type=\'submit\']');
	if (submitBtn) {
		submitBtn.onclick = interceptPassword;
	}
}

chrome.storage.local.clear(function() {
});

interceptSubmitEvent();


/* 
 * Pass message to background.js
 * chrome.runtime.sendMessage(password);
 */


