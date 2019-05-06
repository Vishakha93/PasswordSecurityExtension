********************************************** WHAT WE HAVE ************************************************************
# UniqPass
A Security Enhancing Browser Extension

Every day, millions of users and websites are joining the internet. Users avail common services like online shopping, social connectivity, banking transactions, booking cabs, flights, hotels, appointments, etc on these websites. Often, users actions on these websites involve establishing an online identity, expressing their personal opinions, sharing sensitive documents and transferring money. This flow of sensitive information and money on the web is what makes security so important for the web. Modern browsers employ a wide range of security mechanisms to protect users information against malicious websites. Unfortunately, these protections are not sufficient and therefore users are often exposed to malicious and unwanted content. To help users secure their information on the internet, we present UniqPass - 
a security enhancing browser extension.

## UniqPass provides the following functionalities:

### Detect password reuse
Users, unfortunately, tend to reuse passwords across websites. Whenever one of these websites is compromised, attackers can take advantage of these passwords and use them against different services. The ideal solution to this problem is to stop users from reusing passwords in the first place. UniqPass detects when a user is creating a new account on a website and compare the password that the user has selected against all other previously stored passwords. If the password is the same, the extension warns the user and encourage him to choose a different password.

### Detect the entering of passwords on the wrong website
UniqPass detects whether the user is trying to login to a website with the password of a different website. This should allow us to protect users from falling victim to phishing attacks (e.g. detect that the user is entering her paypal.com password to the attacker.com website). 

### Modify link-clicking behavior
Some security researchers have argued that most users would be protected if the software would stop them from visiting unpopular websites. Your extension should inspect all links in all web pages visited and for those links that are leading the user outside of the Alexa top 10K websites, the user should be warned if they click on that link. The user should have the option to dismiss the block once (i.e. be allowed to visit that website) or forever (i.e. ask the extension not to bother her next time she visits that particular website).

