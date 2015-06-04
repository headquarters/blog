---
layout: post
title: Testing Google Maps locally
date: '2013-06-17T12:13:52-05:00'
tags: []
tumblr_url: http://michaelehead.com/post/53201880490/testing-google-maps-locally
---
When setting up your Google Maps API key, specify that it works on all subdomains, i.e. `*.mysite.com`. Then, create a host name in `/etc/hosts` (different path on Windows) that is something like "local.mysite.com" to point at 127.0.0.1. Now, instead of using “localhost" to access your site locally, you can use "local.mysite.com" to access it, and the Google Maps API will treat it as a legitimate site. Yay, no more API key error messages!
