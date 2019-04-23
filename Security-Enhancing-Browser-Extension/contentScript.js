function storeUrlAndPassword(url, password) 
{
	chrome.storage.local.get({ enigmaPlugin: []}, function (result) {
		let enigmaPlugin = result.enigmaPlugin;

		enigmaPlugin = enigmaPlugin.filter(urlPassword => (urlPassword.url != url));
		enigmaPlugin.push({url: url, password: password});
		
		chrome.storage.local.set({enigmaPlugin: enigmaPlugin}, function () {
			chrome.storage.local.get('enigmaPlugin', function (result2) {

				//alert(JSON.stringify(result2.enigmaPlugin));
				document.getElementById("modalHeader").innerHTML = "Password Reuse Warning";
				document.getElementById("modalBody").innerHTML = "<h2>You reused a password</h2><h2>Please fix</h2><<h2>Please fix</h2>";
				document.getElementById("myBtn").click();

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


$.get(chrome.extension.getURL("modal.html"), function(data) {
	$(data).appendTo('body');
});

interceptSubmitEvent();


/* 
 * Pass message to background.js
 * chrome.runtime.sendMessage(password);
 */


