
let FormTypeEnum = {
	LOGIN: 1,
	SIGNUP: 2,
	UNKOWN: 3
	//Can be extended with RESET form
}

/*
Problems with enigma plugin

Does not work in the following cases
1. Password field is hidden. Ex - Yahoo
2. Button mentions “Next”/“Continue” - Form Type is Unknown. Ex - Gmail/LinkedIn
3. Document loads dynamically so difficult to add handler on password input Ex - Instagram
4. Document has multiple forms. Ex - Facebook

*/

/* Logic to store hash of the password */
function hexString(buffer) 
{
	const byteArray = new Uint8Array(buffer);

  	const hexCodes = [...byteArray].map(value => {
    const hexCode = value.toString(16);
    const paddedHexCode = hexCode.padStart(2, '0');
    	return paddedHexCode;
  	});

  	return hexCodes.join('');
}

function getMessageHash(message) 
{
  	const encoder = new TextEncoder();
  	const data = encoder.encode(message);
  	return window.crypto.subtle.digest('SHA-512', data);
}

function storeUrlAndPassword(url, password) 
{
	chrome.storage.local.get({ enigmaPlugin: []}, function (result) {
		let enigmaPlugin = result.enigmaPlugin;

		enigmaPlugin = enigmaPlugin.filter(urlPassword => (urlPassword.url != url));
		enigmaPlugin.push({url: url, password: password});
		
		chrome.storage.local.set({enigmaPlugin: enigmaPlugin}, function () {
			chrome.storage.local.get('enigmaPlugin', function (result2) {

				alert(JSON.stringify(result2.enigmaPlugin));
				//document.getElementById("modalHeader").innerHTML = "Password Reuse Warning";
				//document.getElementById("modalBody").innerHTML = "<h2>You reused a password</h2><h2>Please fix</h2><<h2>Please fix</h2>";
				//document.getElementById("myBtn").click();

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

		getMessageHash(password).then(digestValue => {
  			let hash = hexString(digestValue);
  			storeUrlAndPassword(url, hash);
		});	
	}
}

function comparePasswords(result, password, formType)
{
	getMessageHash(password).then(digestValue => {

		let hash = hexString(digestValue);
		let url = window.location.host;
		let len = result.enigmaPlugin.length;
		for(let i = 0; i < len; i++) {
			if(result.enigmaPlugin[i].password === hash && result.enigmaPlugin[i].url != url) {

				if(formType === FormTypeEnum.LOGIN) {
					alert("You are using password of " +result.enigmaPlugin[i].url+ " on " + url);
				}
				else {
					alert("This is the password of " + result.enigmaPlugin[i].url + " website. Please choose a different password.");
				}
				
			}
		}
	});
}

/************** Rules to determine the form type ******************/
function getFormTypeBySubmitButtonText(formElement)
{
	let buttonInFormEl = formElement.querySelector('input[type=\'submit\'], button[type=\'submit\']');
	let text = buttonInFormEl.value + buttonInFormEl.innerText;
	let logInText = ["log in", "sign in"];
	for(let i=0; i < logInText.length; i++) {
		let index = text.toLowerCase().indexOf(logInText[i]);
		if(index != -1) {
			return FormTypeEnum.LOGIN;
		}
	}
	
	let signUpText = ["sign up", "create", "join"];
	let signUpScore = 0;

	for(let i=0; i < signUpText.length; i++) {
		let index = text.toLowerCase().indexOf(signUpText[i]);
		if(index != -1) {
			return FormTypeEnum.SIGNUP;
		}
	}

	return FormTypeEnum.UNKOWN;
}

function getFormTypeByNoOfPasswordFields(formElement)
{
	let passwordElems = formElement.querySelectorAll('input[type=\'password\']');
	if(passwordElems.length > 1) {
		return FormTypeEnum.SIGNUP;
	}

	return FormTypeEnum.UNKOWN;
}

function getFormTypeByNoOfInputFields(formElement)
{
	let inputElems = formElement.querySelectorAll('input[type=\'text\'], input[type=\'email\']');
	if(inputElems.length > 1) {
		return FormTypeEnum.SIGNUP;
	}

	return FormTypeEnum.LOGIN;
}

// Priority Algorithm
// The checks for a form being login/signup are written in order
// If first check satisfies, we don't check the other ones.
function getFormType(formElement)
{
	formType = getFormTypeBySubmitButtonText(formElement);
	if(formType != FormTypeEnum.UNKOWN)
		return formType;

	formType = getFormTypeByNoOfPasswordFields(formElement);
	if(formType != FormTypeEnum.UNKOWN)
		return formType;

	formType = getFormTypeByNoOfInputFields(formElement);
	return formType;
}


function interceptUserInput()
{
	passwordElem = document.querySelector("input[type=\'password\']");
	if(passwordElem && passwordElem.value) {

		let closestFormElement = passwordElem.closest('form');
		let formType = getFormType(closestFormElement);

		password = passwordElem.value;
		chrome.storage.local.get({ enigmaPlugin: []}, function (result) {
			comparePasswords(result, password, formType);
		});
		
	}
}

function addSubmitEventListener(passwordElem) {

	//Only that submit button should have on-click event which belong to the password form
	let closestFormElement = passwordElem.closest('form');
	let submitBtn = closestFormElement.querySelector('input[type=\'submit\'], button[type=\'submit\']');
	if(submitBtn) {
		submitBtn.onclick = interceptPassword;
	}
}

function isHidden(el) {
    var style = window.getComputedStyle(el);
    return (style.display === 'none')
}

//TODO: Many webpages show the login/signup forms dynamically. The form is not there when page loads.
//It gets added after some times
//Ex. Instagram
window.addEventListener('load',function(){
	let passwordElem = document.querySelector("input[type=\'password\']");

	if(passwordElem && !isHidden(passwordElem)) {
		passwordElem.oninput = interceptUserInput;
		addSubmitEventListener(passwordElem);
	}
});

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

function interceptClickEvent(json) 
{

// 	document.addEventListener('click', function (event) {

// 	// If the clicked element doesn't have the right selector, bail
// 	// if (!event.target.matches('.click-me')) return;

// 	// Don't follow the link
// 	alert("Website Doesn't belong to 10k");
// 	event.preventDefault();

// 	// Log the clicked element in the console
// 	console.log(event.target);

// }, false);

	var anchors = document.getElementsByTagName("a");
	for (var i = 0, length = anchors.length; i < length; i++) {
	  	var anchor = anchors[i];
	  	var hostname;
	  	anchor.addEventListener('click', function(event) {
	    	// `this` refers to the anchor tag that's been clicked
	    	hostname = extractHostname(this.getAttribute('href'));
	    	flag = 1;
	    	for(var j = 0; j < 10000; j++)
	    	{
	    		if(hostname == json[j])
	    			flag = 0;
	    	}
	    	if(flag)
	    	{
	    		event.preventDefault();
	    		alert(hostname + " doesn't belong to Alexa 10k websites\n");
	    	}
    		// Log the clicked element in the console
			console.log(event.target);
	  	}, true);
	};
}



const url = chrome.runtime.getURL('alexa_10k.json');

fetch(url)
    .then((response) => response.json()) //assuming file contains json
    .then((json) => interceptClickEvent(json));


 //chrome.storage.local.clear(function() {
 //});


//$.get(chrome.extension.getURL("modal.html"), function(data) {
	//	$(data).appendTo('body');
//});








