---
layout: post
title: Using Charles Proxy with Google Chrome on Mac OS X
date: '2011-09-24T08:05:00-05:00'
tags:
- development
- tools
tumblr_url: http://michaelehead.com/post/10593786996/using-charles-proxy-with-google-chrome-on-mac-os-x
---
I've been using [Charles Proxy](http://www.charlesproxy.com/) to test on a development environment before pushing new front-end code to the environment itself. However, I wasn't able to get it to work in Google Chrome "out of the box". It turns out that Google Chrome uses the operating system's proxy settings, so you actually have to alter the built-in Mac OS X proxy settings for it to work. 

First, check to see what port # Charles Proxy is using: Proxy > Proxy Settings menu (this defaults to "8888").

Next, configure the Mac OS X proxy by going into System Preferences > Network > Advanced > Proxies. Put the host as "127.0.0.1" (your local machine) and the port number as whatever you found from Proxy Settings above. 

![Web proxy settings](/images/posts/web-proxy-settings.gif)

Update: I forgot to mention that if you turn Charles Proxy off, you must disable the Mac OS X web proxy, too. Otherwise, no webpages will load because you're routing everything to your local machine. So, that can be a hassle. As a result, I've started using Proxy Switchy (a Chrome plugin) to be able to modify Chrome's settings itself, rather than tinkering with the Mac OS X settings. 

Update 2: I still occasionally have problems with Charles Proxy picking up the HTTP traffic when using Google Chrome on Mac OS X, even with the Proxy Switchy plugin. As of this writing I'm using Charles Proxy v. 3.6.4, so I'm kind of at a loss. I'll definitely post something if I find a definitive solution to make it always work, rather than being a crapshoot.

Update 3: I think some of the problems I was having came from using Charles Proxy when trying to use VPN for work. Charles Proxy must be turned on before connecting to a VPN, otherwise it won't see the traffic going over the VPN. After figuring out this proper order I haven't had any issues for a month or so.
