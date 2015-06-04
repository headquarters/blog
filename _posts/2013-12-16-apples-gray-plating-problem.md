---
layout: post
title: Apple's Gray Plating Problem
date: '2013-12-16T13:52:56-05:00'
tags: []
tumblr_url: http://michaelehead.com/post/70208430183/apples-gray-plating-problem
---
As defined in my previous post, Gray Plating is the overuse of gray in a user interface when it is detrimental to the user experience. Today, while reading about an app on the iTunes store, I found a good example of this problem on apple.com. 

Reading the body text that describes the app Comic Zeal, I found the text to be a little hard to read in my living room, with natural light in the environment. Here is a screenshot of the body text:

![Screenshot of an app description on the App Store](/images/posts/ipad-app-store.png)

If we plug the foreground text color (#898989) and background color (#ffffff) into [Lea Verou's awesome WCAG 2.0 Color Contrast calculator](http://leaverou.github.io/contrast-ratio/#%23898989-on-white), then we get a result of 3.5, which partially explains the problem with the contrast. A 3.5, as the tooltip help text states, means this contrast "passes AA for large text (above 18pt or bold above 14pt)". The website's body text is 12px, or roughly 9pt, on my 1680x1050 resolution MacBook Pro screen. 

At a font-size equivalent to 9pt, the iTunes app store body content fails to meet the WCAG 2.0 guideline 1.4.3 on minimum contrast, unless users resize the text themselves. It's a good thing I'm nearsighted at this age, but for 80-year-old me, and for others that currently don't have as good of vision, this kind of Gray Plating is a real problem. 
