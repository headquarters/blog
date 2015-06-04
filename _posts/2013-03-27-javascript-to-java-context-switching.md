---
layout: post
title: JavaScript to Java Context Switching
date: '2013-03-27T10:02:06-05:00'
tags: []
tumblr_url: http://michaelehead.com/post/46420068477/javascript-to-java-context-switching
---
Splitting my time between JavaScript and Java, occasionally my brain doesn't switch contexts quickly enough for me to remember what is possible or not possible in one language.

Recently, I was trying to split a string into two separate array values in a JSP, for displaying them separately through JSTL. I commented out

{% highlight java %}
String someVar = "";
{% endhighlight %}

and added

{% highlight java %}
Array someVarArray = new Array(2);
{% endhighlight %}

and Eclipse seemed to be fine with it. So, I went on to write more code utilizing my new array, and refreshed the page...everything worked fine. But, the page markup was not changing to reflect the JSP changes. It was heavily cached for some reason. So, I restarted the server, and reloaded the page, and got the following error:

java.lang.ClassNotFoundException: org.apache.someclass.etc

After finally getting over my JavaScript tunnel vision, I realized I needed a type for the array:

{% highlight java %}
String[] someVarArray = new String[2];
{% endhighlight %}

This is difficult to track down because my IDE effectively told me there was a ClassNotFoundException, which every StackOverflow post points to being an issue with class paths or output folders for a project; none of them point to actual code problems. Also, the compiler did not catch this as a problem, either. Where is your strong type handling now, Java?

After spending so much time tracking down this problem, I'm starting to understand the allure of using a single language on the client as on the server (e.g. NodeJS). Not having to switch contexts would have prevented this problem in the first place. Or maybe one day I'll be a better Java developer that won't make these kinds of mistakes (ha!).