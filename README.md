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

Tasks:

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

Division of work: 

1) Detect Password Reuse : Vishakha
2) Detect the entering of the passwords on the wrong website : Mitesh
3) Modify link-clicking behaviour : Divyam

Since Vishakha and Mitesh have experience on Frontend -> Working on tasks 1 & 2
Divyam will explore the Frontend tech stack first : Bootstrap, jQuery and AJAX and then task 3.

Thinking Points

1. On visitng a website, how to figure out the login box - User Box and Password ?
2. How to display relevant existing password credential to users? - Just like Chrome dropdown on Citi

