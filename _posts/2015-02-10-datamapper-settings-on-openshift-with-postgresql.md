---
layout: post
title: DataMapper settings on OpenShift with PostgreSQL
date: '2015-02-10T11:43:42-05:00'
tags:
- development
- ruby
- databases
tumblr_url: http://michaelehead.com/post/110640551578/datamapper-settings-on-openshift-with-postgresql
---
The OpenShift documentation shows that a PostgreSQL connection string should look like this:

{% highlight text %}

postgresql://user:password@host:port

{% endhighlight %}

However, the DataMapper documentation shows that a PostgreSQL connection string should look like this:

{% highlight text %}

postgres://user:password@hostname/database

{% endhighlight %}

When using DataMapper on OpenShift, though, follow the DataMapper documentation, **not** the OpenShift documentation. The DataMapper gem attempts to require adapters based on the prefix name, so if you use "postgresql" as the prefix, it attempts to load the "dm-postgresql-adapter" gem, which does not exist. You will get a "cannot load file – dm-postgresql-adapter" error. So, stick with the DataMapper version and use the "postgres" prefix. 
