---
layout: post
title: Wrap long links on small screens
date: '2015-04-19T23:26:38-05:00'
tags: []
tumblr_url: http://michaelehead.com/post/116880860843/wrap-long-links-on-small-screens
---
When building mobile-friendly web pages, you may come across long links in your content that cause horizontal scrollbars on smaller screens. Since links don't contain spaces, there is no natural break for them to wrap when their parent container shrinks in width. You can use the following CSS rule to fix this:

<!-- 
	Unfortunately, the syntax highlighting CSS thinks "overflow" in "overflow-wrap" needs to be bold.
	Forgive this inline style as a workaround.
-->
<style>
	.highlight .k { font-weight: normal; }
</style>
{% highlight css %}
a {
    /* standard syntax for modern browsers */
    overflow-wrap: break-word;
    /* older browser syntax */
    word-wrap: break-word; 
}
{% endhighlight %}
A better approach is to change the text of the link itself. Instead of having <a href="#nogo">http://some/really/long/link?withabunchoftextinit</a>, you can just link an <a href="#nogo">appropriate keyword</a> or two. Better for SEO and better for users. 
