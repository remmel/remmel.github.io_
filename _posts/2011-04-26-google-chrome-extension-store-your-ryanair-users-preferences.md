---
id: 137
title: 'Google Chrome extension: Store your Ryanair user''s preferences'
date: 2011-04-26T17:11:18+02:00
author: remmel
layout: post
guid: http://www.remy-mellet.com/?p=137
permalink: /blog/137-google-chrome-extension-store-your-ryanair-users-preferences/
categories:
  - Uncategorized
tags:
  - Javascript
---
[Download the google chrome extension.](/wp-content/uploads/2011/04/ryanair_preferences.crx)

This extension allows you to save time when booking a Ryanair ticket by:

  * storing you preferences (Firstname, Lastname, address, phone number, etc)
  * pre-filling the forms to avoid paying extra charges (No bags, No insurances, No text messages, etc)

You can change you preferences (which will be set automatically the first time you buy a ticket whis the extension enable) by clicking on the icon which appear when you are on ryanair website.

  <a href="/wp-content/uploads/2011/04/RyanairExtensionScreeshot.png"><img title="RyanairExtensionScreeshot" src="/wp-content/uploads/2011/04/RyanairExtensionScreeshot.png" alt="" width="492" height="214" /></a>

Developers:  
Download source code : [ryanair_preferences](/wp-content/uploads/2011/04/ryanair_preferences.zip)  
This extension uses:

  * content script injection (when the page is changed)
  * localStorage
  * input value and localStorage mapping
  * option page