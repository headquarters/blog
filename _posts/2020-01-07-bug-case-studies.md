---
layout: post
title: Bug case studies
date: '2020-01-08T10:55:00-05:00'
tags: [development]
cssClass: bug-case-studies
---

# Bug Case Studies

Occasionally bugs come across that are so insidious and hard to find that you spend hours or days trying to replicate them or fix them. This is a collection of case studies around bugs I've fixed in my career that were so hard to figure out to either replicate or fix at the time that they've stuck with me since. 

## Session leaking in Node.js processes

We had just launched a new home page built in React.js with a Node.js API backend that was intended to replace a legacy Ext.js application front-end talking to an old web framework built on TCL running on AOLServer (yeah, seriously). After launching, some users started mentioning they were seeing data that didn't belong with their account, such as "Welcome, Mary" on the home page when they were not Mary. It didn't happen very often and it was impossible to replicate locally. However, it definitely sounded like session data was leaking between users and we had to figure out how to fix it.

The first step in fixing the issue was recreating the bug--it was impossible to do so with a local version of the site running. So, I wrote a script in Node.js that would do a tiny load test against our development environment with different test user accounts. It would randomly pick an account, do some screen scraping for CSRF tokens and such, log into that account, and then inspect the resulting home page text results to determine if the resulting HTML had the expected user's name. This was able to replicate the problem fairly reliably--it was an issue that only crept up given a large enough number of different requests and sessions. 

The project for the new home page consisted of two node.js applications, one was the "parent" application that contained the backend API running in one node.js process that would spawn a child node.js process to create the front-end that would talk to that backend. Requests would hit the front-end, session state would be called from the API, and then the front-end application would server-render a page built with React.js. 

After much digging into the code, debugging, testing, trial and error, swear words, and feelings of despair, with another engineer's help I finally figured out where the problem was--the interprocess communication between parent and child Node.js processes. As the [Node.js documentation says](https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options): "Keep in mind that spawned Node.js child processes are independent of the parent with exception of the IPC communication channel that is established between the two. Each process has its own memory, with their own V8 instances." 

The solution we decided on was using a key/value object that stored a GUID for each request/response pair that our server created on a request, sending a message to the child process with that GUID included, sending the child's message back with the same GUID, then returning the correct response based on GUID in the key/value pair. An example of the problem and solution can be found [in this repo](https://github.com/headquarters/bugs/tree/master/node-ipc).

## CDN caching a missing file

I was part of a team that was responsible for building a single page application (SPA) in Ember.js. We had just deployed a new version of our application recently and after a few days started receiving some complaints from users that they were experiencing problems with the application. Our customer support folks were telling users to do the "normal" troubleshooting things--clear your browser's cache, try a different browser, and so on. Nothing seemed to work. 

Across several teams, folks were checking server logs and all kinds of metrics to try to determine the cause. We flushed Akamai's (our CDN) cache at least once, if not more times. Finally, we had an inkling there was some sort of caching problem going on beyond the CDN so we deployed a new version of the application. Our Ember application used fingerprinting for individual files so that a hash was created when the file changed. We introduced some meaningless change in order to force the hash to change for each file and thus force new files to be pulled down from the origin server and the CDN to the browser. 

This fixed it, but we weren't quite sure why. I dug into some Splunk logs and finally found a smoking gun: a permission denied error on a JavaScript file that our app needed to run. That explained why the app would fail, but not why the caching seemed to be stuck pulling the wrong thing. Checking the next layer up, I found in our Apache configuration that we set `ErrorDocument 404 http://example.com/#/404` for catching 404 files (the external URL pointed at our own site). This meant that Apache was supposed to respond to requests where a file was not found by returning our site with the "/#/404" appended to the URL. Our SPA used hash routing at the time, so the "/#/404" part of the URL was intended to be picked up by the front-end routing and pull up the correct 404 view. 

The problem with this configuration was that when [ErrorDocument](https://httpd.apache.org/docs/2.4/mod/core.html#errordocument) was pointing at an external URL (one starting with HTTP), it would actually return a *302* status code, not the original HTTP error status code. As the docs state:

```
Note that when you specify an ErrorDocument that points to a remote URL (ie. anything with a method such as http in front of it), Apache HTTP Server will send a redirect to the client to tell it where to find the document, even if the document ends up being on the same server. This has several implications, the most important being that the client will not receive the original error status code, but instead will receive a redirect status code. 
```

Here's an [example of the network tab when this happens](/images/screenshots/bugs/missing-file-network.jpg). 

Moving one layer higher up our stack, I found that our Akamai configuration was set to cache 302 redirects for quite a while. [Akamai caches 302s by default if they contain a cache-control header](https://learn.akamai.com/en-us/webhelp/ion/oca/GUID-68D6DFBF-3D2A-4B2E-B2D8-C334507D186E.html#GUID-68D6DFBF-3D2A-4B2E-B2D8-C334507D186E__GUID-641CE60B-4CE4-492E-950D-29A18E807F92) and we hadn't modified that setting. 

To summarize, we had the following multi-layer failure:
- Failed to read file on disk (permission denied)
- Apache treats a permission denied failure as a 404
- ErrorDocument with an external URL masks the 404 with a 302
- Akamai caches a 302 by default 
- Users kept getting a 302 redirect for a JS file that really returned an HTML file that wouldn't parse, breaking the entire single page app

Crazy! I've recreated the majority of this scenario [in this repo](https://github.com/headquarters/bugs/tree/master/missing-file-caching). I couldn't emulate a CDN in the repo, but the file that fails to load does have a month-long cache on it which illustrates the issue with a cached 302. 