********************************************** WHAT WE HAVE ************************************************************
# Password Security Plugin
Chrome Plugin to avoid reuse of passwords

* A simple plugin which opens a form on click of new tab.
   To use the code :

   1) Download the files in a directory
   2) Visit chrome://extensions in your browser and ensure that the Developer mode checkbox in the top right-hand corner is         checked
   3) Click Load unpacked extension and select the directory in which your extension files live.
   4) Test it by clicking a new tab.

* Color change plugin created to perform basic saving and retrieval to/from the DB. https://developers.chrome.com/extensions/getstarted                                 

   Enhanced the plugin to include a form. Data is persisted and retrieved using chrome storage API.

************************************************** WHAT WE HAVE PLANNED *********************************************

## Tasks:

1. Framework for common functionalities accross all three sub tasks of the project : Needs contribution from everyone
    * Database storage and retrieval  
    * Async API calls (JS code to handle APIs)
    * Basic DOM event handling
    * CSS and style guidelines
    * Documentation to set the common convention, for e.g., ids should be metioned as idButton etc.
    
 2. Figuring out APIs : Needs contribution from everyone
    * API to parse URL, in the following direction:If we are on webpage "facebook.com" or something like "fb.com" or "fb.com/page=12222", how to save this in the DB.
    * APIs to hash the password while saving on the DB
    * API to fetch top 10k popular website from Alexa
    * Think if we need more APIs . ??!!!
              
3. Figuring out chrome permissions to access the current page and to figure out how are we going to catch the event just before user signs-in -> NEEDS DISCUSSION

## Division of work: 

1. Detect Password Reuse : Vishakha
2. Detect the entering of the passwords on the wrong website : Mitesh
3. Modify link-clicking behaviour : Divyam

## Questions

1. On visitng a website, how to detect a new login form filling? 
2. On visiting a website, how to detect the login box - User Box and Password Box ?
2. Should we display relevant existing password credential to users? - Just like Chrome dropdown on Citi
3. Should we show dialog box on Password Change ? Is the feature in scope?

## UI Components

1. On plugin click, Show Basic Details About Plugin
2. When a user fills a new login form and uses already used password, show a dialog blox warning user that existing password is being reused - Task 1
3. On entering a different website's password, warn user that they already have this password - Task 2
4. On links other than Alexa 10K websites, show dialog box to warn users and save settings (For once or For all) - Task 3
5. On password change (successful or unsuccessful), show a dialog box asking whether to update the password?

## Thinking about security!

1. Can we make the source code of extension inaccessible by others.
2. Our mechanism should be secure even if an attacker can look into the source code of extensions. (encryption versus hashes)
3. How do we stop an attacker/other extensions from accessing credentials. (other extensions can get password from common storage api by using the same key)



## Development Steps

`git clone --single-branch --branch master-dev https://github.com/Vishakha93/PasswordSecurityPlugin.git`
