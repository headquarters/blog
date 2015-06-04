---
layout: post
title: DataMapper fails silently when strings are longer than schema property
date: '2014-07-07T13:41:07-05:00'
tags: []
tumblr_url: http://michaelehead.com/post/91062483073/datamapper-fails-silently-when-strings-are-longer
---
When inserting content into your database using DataMapper's create method, any String longer than the corresponding schema property will cause the create method to fail silently. For example, if your model has a property with a :length of 256 as below:

{% highlight ruby %}

class Message
  include DataMapper::Resource
  
  property :id, Serial
  property :message, String, :length => 8
end

{% endhighlight %}

then the following code will fail silently and not insert a row:

{% highlight ruby %}
    Message.create(:message => "This message is more than 8 characters long")
{% endhighlight %}

So, be sure to double check your :length attributes.