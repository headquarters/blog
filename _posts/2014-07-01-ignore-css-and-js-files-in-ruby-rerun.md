---
layout: post
title: Ignore CSS and JS files in Ruby Rerun
date: '2014-07-01T11:48:34-05:00'
tags: []
tumblr_url: http://michaelehead.com/post/90462460318/ignore-css-and-js-files-in-ruby-rerun
---
If you're using the Rerun gem to watch for file changes in your Ruby web application, you may find it annoying that CSS and JS file changes cause the entire application to restart. Use the –ignore flag to ignore certain file types when calling Rerun. For example, below is a shell script I use to start a Sinatra application in my project:

{% highlight bash %}
#! /bin/bash
rerun --ignore "**/*.{js,css}" ruby app.rb
{% endhighlight %}