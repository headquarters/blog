---
layout: post
title: Accessing real IP addresses on OpenShift
date: '2015-02-12T16:22:00-05:00'
tags: []
tumblr_url: http://michaelehead.com/post/110837514008/accessing-real-ip-addresses-on-openshift
---
I'm working on a Sinatra app and using request.ip returned the wrong IP address on OpenShift. This is due to OpenShift running a reverse proxy. After doing some searching online, I found the best way to get the user's real IP address is as follows:

{% highlight ruby %}
@@ip_address = env['HTTP_X_FORWARDED_FOR'] ? 
    env['HTTP_X_FORWARDED_FOR'] : env['REMOTE_ADDR']
{% endhighlight %}

Ignoring the syntax (which isn't very Ruby-like) and the use of a global variable (oh no!), this worked for me on OpenShift. Now, instead of getting a reverse proxy IP, I get the user's real IP address. 
