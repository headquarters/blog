---
layout: post
title: Ember.js - 6 months in 
date: '2018-03-10T04:48:00-05:00'
tags: [javascript, development]
---

# My first six months with Ember.js  
After reading [this Ember.js six months in article](https://medium.com/@Realrobwebb/my-first-6-months-using-ember-a-retrospective-a5ecf3259b09), I realized it was time to publish my own 6-months-in report. I started with Ally Financial as a Senior Front-end Engineer in November 2017, so as of this writing it's been about 6 months. Since March, though, I've been a tech lead for a scrum product team, so I haven't been quite as hands-on in day-to-day development. I still do a good bit of new feature work, bug fixing, code review, and so on, though, so I haven't left development behind completely.

## Disclaimer
Before I go on, I must emphasize the following: _the work of all the Ember.js core team and the community of developers is amazing and I am in no way trying to disparage the work of those involved or belittle their effort. When it comes to technology, as with everything, there are trade-offs; they've chosen certain design decisions that, say, the React team has not. I fully respect these decisions, even if I don't always agree with them._

## Convention over configuration
Most of my professional front-end experience has invovled plain ol' JavaScript, jQuery, or React. I really grew to like the React mental model when I worked in it in previous jobs. This has been something that is very hard to get used to in the more MVC-esque approach that Ember takes. Obviously, it's not a fair comparison because React is "just" the view layer, whereas Ember is a framework for web applications. Nonetheless, I feel the whole ecosystem of React, Webpack, React Router, and Redux lends itself to building "ambitious" web applications just as easily as Ember lends itself to the same. It can be overwhelming connecting all the "plumbing" to fit these disparate libraries together, but that doesn't feel much more difficult than figuring out all the conventions that Ember follows. And Ember makes heavy use of conventions&mdash;one of its mottos is "convention over configuration" (influenced by Ruby on Rails). 

The build tool that Ember uses under the hood, [Broccoli](http://broccolijs.com/), has a pretty straightforward concept&mdash;it works with trees, as opposed to files. This seems very simple, but can lead to very strange issues when it comes to merging trees. Naming collisions cause very-hard-to-debug errors. For example, we realized one of our app files had the same name as a 3rd party dependency, so it was overriding the dependency. No compile or runtime errors. 

One category of conventions that is still somewhat confusing to me is add-ons vs. apps. The whole index.js vs. ember-cli-build.js file seems like an arbitrary distinction&mdash;each type of project has each of the files, but apps use one file (ember-cli-build.js) and add-ons use the other. Huh?

Also, add-ons require re-exporting files for use in the consuming app. That really threw me off in my work starting out with apps that had add-ons because the duplication seemed so unnatural. This isn't such a problem if you let ember-cli handle all the file manipulation for you, but that in and of itself takes somet time to master; to remind yourself "oh yeah, I can't delete anything on my own or else things get out of sync" or "I shouldn't create this file by hand because then it won't have a re-exported file created for it, unless I remember to do it manually". 

## Templating
Coming from React, templating and components in Ember is my biggest pain point. Having used ES6 modules in React and relying on JavaScript's import system, I was used to being very explicit about dependencies. With Handlebars templates, everything shares a global scope so anything is usable from anywhere. Also, Handlebars templates don't serve as UI components on their own&mdash;their behavior is encapsulated in a backing JS file. This was very strange coming from the single-file concept of JSX where behavior and template were contained in a single file. And this is coming from someone that had to unlearn the "separation of concerns" mantra when starting out in React; having learned it, I loved it, and it was hard to go back!

## jQuery
Ember still relies on jQuery under the hood for DOM manipulation, but that is going away soon. The problem with it at the moment is developers tend to rely too heavily on it, because it's there. At least in a fresh React app, it's not available, so you have to do things more "the React way". I think having jQuery around allows you to break out of Ember's component model too easily, so I'm glad it's going away in the future. 

## Always pros and cons
There are always pros and cons to every piece of technology and you ultimately have to pick the right tool for the job without being overly dogmatic about your decision. I think Ember is a great addition to the tools available to web developers these days. It's worth knowing about these pros and cons before diving into a new framework, so hopefully this helped give some insight into what a newbie Ember developer coming from a React world might expect. 



