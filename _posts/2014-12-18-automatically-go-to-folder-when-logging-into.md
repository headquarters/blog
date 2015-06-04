---
layout: post
title: Automatically go to folder when logging into Vagrant VM
date: '2014-12-18T15:41:17-05:00'
tags: []
tumblr_url: http://michaelehead.com/post/105546796898/automatically-go-to-folder-when-logging-into
---
Instead of going to the home directory, you may prefer to go to another directory when you SSH into a Vagrant VM. If so, here's how to accomplish that.

SSH into the Vagrant box you want to modify. Once logged in, open `~/.bashrc` in your editor of choice. Add 

{% highlight text %}
cd /path/to/your/preferred/location

{% endhighlight %}

to the bottom the `.bashrc` file. Next time you SSH into your Vagrant VM, you'll be where you want to be without having to change directories manually every time. Verified on Ubuntu 14.04. Tip inspired by [http://unix.stackexchange.com/a/32471](http://unix.stackexchange.com/a/32471). 
