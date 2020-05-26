---
id: 127
title: 'Google Chrome Extension: Inject contentscript in a webpage with js errors'
date: 2011-04-26T14:47:58+02:00
author: remmel
layout: post
guid: http://www.remy-mellet.com/?p=127
permalink: /blog/127-extension-google-chrome-inject-contentscript-in-a-webpage-with-js-errors/
categories:
  - Uncategorized
tags:
  - Javascript
---
Because the webpage contains errors, we can&#8217;t inject directly the content script using this code in the manifest.json file

```js
"content_scripts": [
    {
      "matches": ["http://*/*"],
      "js": ["jquery.js", "content_script.js"]
    }
  ]
  ```

But we can inject the code each time the page is changed using an url change event listener, inserting the following code in the background.html page:

```js
chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
	if(changeInfo.status == "complete" && (tab.url.substr(0,25) == "http://www.mypage.com/" || tab.url.substr(0,26) == "https://www.mypage.com/") ){
		chrome.tabs.executeScript(null, {file: "jquery.js"});
		chrome.tabs.executeScript(null, {file: "content_script_injected.js"});
	}
  });
```