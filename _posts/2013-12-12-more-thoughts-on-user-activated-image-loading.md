---
layout: post
title: More thoughts on user-activated image loading
date: '2013-12-12T00:17:36-05:00'
tags: []
tumblr_url: http://michaelehead.com/post/69763088369/more-thoughts-on-user-activated-image-loading
---
Despite the fact that responsive images may one day fix the bandwidth problem for images, I still think it is worthwhile to explore a simple alternative for certain types of sites. On mobile devices with slow network connections, images can take up a huge amount of the page weight for a single web page. I started discussing in my [previous post](/2013/05/02/user-activated-image-loading.html) a simple idea: just link to the images by default and let the user click the link to show the image. The user's click could send a normal HTTP request, or an AJAX request to fetch the image and put it in some sort of modal dialog. 
In practice, it might work for something like this ArsTechnica article from last year. 

![ArsTechinca article screenshot with images](/images/posts/arstechnica-with-images.jpg)

With images, this page is 14 HTTP requests and it has **896KB** worth of images in the page. 
In a user-activated version, with the images as links, it would look like the following image.

![ArsTechinca article screenshot without images](/images/posts/arstechnica-no-images.jpg)


This version contains 11 HTTP requests, with only **8.6KB** worth of images for decoration. 

The first example is 1.1MB and the second example is 221KB. That is an **80% reduction in total page weight** by just making the body images links. I think this kind of page weight reduction would be worthwhile for blogs and news sites where the main draw of the site is the written content, not the images. An option not to show these large images could be saved in a cookie, much like the option to "view mobile" or "view desktop" is saved on these kinds of sites currently. This is a really simple idea, and users may not find it worth the bandwidth savings having to click for their images, but then again, they may find it is completely worth a site loading dozens of seconds faster.