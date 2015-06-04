---
layout: post
title: Animate the ZURB Foundation Progress Bar
date: '2014-07-01T11:45:42-05:00'
tags: []
tumblr_url: http://michaelehead.com/post/90462243998/animate-the-zurb-foundation-progress-bar
---
After doing a search for animating the Foundation progress bar, I came across a ZURB forums post. However, I was trying to avoid using JavaScript to do the animation. So, if anyone out there is interested in a CSS-based method for animating the ZURB Foundation progress bar, just drop this CSS into your stylesheet:

{% highlight css %}

.progress .meter {
	-moz-transition:width 0.7s ease;
	-webkit-transition:width 0.7s ease;
	-transition:width 0.7s ease;
}

{% endhighlight %}

Adjust the transition properties as you see fit, but leave "width" in there, since that's the property that changes on the .meter element.
