---
layout: post
title: Integer to Float coercion in PHP
date: '2014-07-10T14:20:56-05:00'
tags: []
tumblr_url: http://michaelehead.com/post/91372285858/integer-to-float-coercion-in-php
---
I take for granted the coercing from integer to float in PHP when I work in that language. When I finally dove into Ruby to use it on a project recently, I discovered it does not do this coercing for you. Nor does Python.

![Python vs. Ruby vs. PHP float coercion code examples](/images/posts/php-ruby-python-floats.png)

This can be tricky to grasp at first–we learn for many years in math classes how to divide something like 100/33 into 3 and some remainder after the decimal. In math classrooms, there is no discussion of number "types" when doing this type of arithmetic. So, while Ruby and Python are very internally consistent with regard to their loose type systems (i.e. dividing integers gives an integer result), PHP's coercing makes a bit more sense based on non-programming mathematics experience. 
