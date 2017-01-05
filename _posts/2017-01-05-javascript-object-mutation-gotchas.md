---
layout: post
title: JavaScript Object Mutation Gotchas
date: '2017-01-05T6:40:00-05:00'
tags: []
---
In entry level computer science courses, one of the topics you discuss in learning a new programming language is "pass by value" and "pass by reference". 
I'm going to discuss these concepts in relation to some JavaScript object mutation "gotchas" that can creep up. 

If you open up the console tab of your browser's dev tools you can paste in the following example. 
You'll see that primitive types in JavaScript are "passed" by value in assignments. 

{% highlight js %}
var firstNumber = 3;
var secondNumber = firstNumber; // value of 3 is "copied" to secondNumber
secondNumber = 10; // overriding the value of secondNumber has no effect on firstNumber
console.log(firstNumber); // 3
console.log(secondNumber); // 10
{% endhighlight %}

However, this is not what happens with objects and their properties. Here's another example:

{% highlight js %}
var firstBook = { title: 'The green book' };
var secondBook = firstBook; // this still references firstBook
secondBook.title = 'The blue book';
console.log(firstBook.title); // 'The blue book'
{% endhighlight %}

<a href="http://stackoverflow.com/a/3638034/360509">This StackOverflow answer</a> calls this "call-by-sharing". 
Changing the internals of an object mutates the original object. 

Now, where in modern JavaScript usage might this bite a developer? 
For me, it's often been in mocha tests when I mutate an object's properties between tests. 
I have a <a href="https://github.com/headquarters/react-es6-template/blob/object-mutation-example/test/components/Panel.js">sample test displaying this problem on GitHub</a>. 

Two of my preferred solutions for this, depending on your development environment (browser or server), are to use Object.assign or the ES6 spread operator:

{% highlight js %}
var firstBook = { title: 'The green book' };
var secondBook = Object.assign({}, firstBook);
secondBook.title = 'The blue book';
console.log(firstBook.title); // 'The green book' is unchanged
{% endhighlight %}

{% highlight js %}
// ES6 spread operator doesn't work in most browsers yet as of 2017-01-05,
// have to test this in the Node REPL
var firstBook = { title: 'The green book' };
var secondBook = { ...firstBook, title: 'The green book' }; // The title property will overwrite the property brought in from via the spread operator
console.log(firstBook.title); // 'The green book' is unchanged
{% endhighlight %}

So, be mindful of the sort-of-pass-by-reference treatment of objects in JavaScript to avoid object mutation gotchas. 