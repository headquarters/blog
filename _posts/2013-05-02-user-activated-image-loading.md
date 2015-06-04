---
layout: post
title: User-activated image loading
date: '2013-05-02T12:12:44-05:00'
tags: []
tumblr_url: http://michaelehead.com/post/49442651939/user-activated-image-loading
---
After seeing this [series of tweets](https://twitter.com/nixonmedia/status/329964035636334593) about responsive images and picturefill.js, I started wondering if there was another approach web developers should take for serving up images. The following relates to inline or content images, not background or decorative images. For example, large images in the middle of a long article on a news site. 

Imagine loading pages without inline images even present by default. Pages would load blazingly fast, because there are fewer HTTP requests overall and images aren't taking up bandwidth on initial page load. The user could tap or click an image placeholder to request the image. 

I think it would be great to see this user tested on content-heavy sites, such as blogs or news sites. 
