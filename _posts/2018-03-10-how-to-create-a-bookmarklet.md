---
layout: post
title: How to Create a Bookmarklet 
date: '2018-03-10T04:48:00-05:00'
tags: [javascript, development]
---

JavaScript bookmarklets are snippets of code that can manipulate webpages. They're sometimes
useful for small automation tasks, such as filling out a form or clicking buttons. In
this post I'll walk through one way to create a bookmarklet. 

I used node version 8.1.2 and npm version 5.0.3 for the following steps. You can also 
do all this in a simple text editor, but the addition of a build step makes the workflow a bit faster. 
Without the build step, you have to escape the output and put it in an [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) 
yourself or use an [online bookmarklet generator](http://userjs.up.seesaa.net/js/bookmarklet.html)). 

In this example, we're going to create a bookmarklet that takes the page title and displays 
it at the top of the page. 

Start by creating a directory for the project, going into it, and initializing an NPM package:

{% highlight bash %}
$ mkdir show-title-bookmarklet
$ cd show-title-bookmarklet
$ npm init
{% endhighlight %}

When prompted for all the NPM init steps, just keep hitting enter (for the sake of the example). 

Next, we'll install the [bookmarklet](https://www.npmjs.com/package/bookmarklet) NPM 
package that can create our bookmarklet. Then, create a `src` directory to contain our source
file: 

{% highlight bash %}
$ npm install bookmarklet --save-dev
$ mkdir src
{% endhighlight %}

Now, edit the `package.json` file at the root of your project and add a "build" script
that invokes the bookmarklet on the file in "src/index.js" and outputs it to 
"dist/bookmarklet.js", like so:

{% highlight javascript %}
  "scripts": {
    "build": "bookmarklet src/index.js dist/bookmarklet.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
{% endhighlight %}

Let's create the file at src/index.js that will be our bookmarklet source:

{% highlight javascript %}
var existingContainer = document.querySelector('.title__bookmarklet');

if (existingContainer) { 
  existingContainer.remove();
}

var titleContainer = document.createElement('div');

titleContainer.className = 'title__bookmarklet';
titleContainer.style.textAlign = 'center';
titleContainer.style.fontSize = '16px';
titleContainer.style.fontFamily = 'Arial';
titleContainer.style.padding = '20px';
titleContainer.style.backgroundColor = 'lightyellow';
titleContainer.style.position = 'absolute';
titleContainer.style.left = 0;
titleContainer.style.top = 0;
titleContainer.style.width = '100vw';
titleContainer.style.zIndex = '99999';

titleContainer.textContent = document.title;

document.body.appendChild(titleContainer);
{% endhighlight %}

Back at the command line, run `npm run build` in order to create your bookmarklet.js
in the "dist" folder. The file will contain code in the following format:

{% highlight bash %}
javascript:(function(){/* your code here */})()
{% endhighlight %}

Copy the contents of dist/bookmarklet.js. In your browser (other than Edge :\),
add a new bookmark and paste the bookmarklet contents in the URL field and set
the page title to whatever you want. These steps are highlighted in the GIF below. 

<img src="/images/gifs/bookmarklet.gif" alt="Animation showing the steps in the preceding paragraph" />

And done! Congratulations, you made a bookmarklet with a build step. Now, if you want to edit
the source file you can run `npm run build` and regenerate it to have a completely new
version. The example we created here is available as a 
[GitHub repo](https://github.com/headquarters/show-title-bookmarklet), too. 