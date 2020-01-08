---
layout: post
title: Internet Explorer 7 redraw fix with JavaScript
date: '2011-09-23T21:17:00-05:00'
tags:
- ie
- development
- bug
- cross-browser
tumblr_url: http://michaelehead.com/post/10578198882/internet-explorer-7-redraw-fix-with-javascript
---
Twice now I've run across a problem with Internet Explorer 7 (and sometimes 8) having problems redrawing HTML when modifying the class on an element that contains several children. Usually I'm trying to swap a class to apply styles for a "grid view" of products or a "list view" of products. The simplest solution I've found is mentioned in the comments of an [Ajaxian post](http://ajaxian.com/archives/forcing-a-ui-redraw-from-javascript). Here is the simple solution using jQuery (not that it matters; we had the selector already cached in my situation):

{% highlight javascript %}
var productContainer = $("#product-container");
productContainer.css("display", "none");  
var productContainerTop = productContainer.offset().top;  
productContainer.css("display", "block"); //or whatever display type needs to be reset
{% endhighlight %}

You grab the element, hide it, access its offset (while hidden), then restore it. I'm guessing this forces IE7 to re-calculate the offset when the item is hidden, even though you store the value and never use it, then making it visible again causes it to redraw properly. A wild guess, but these few lines work nonetheless. 
