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

After much digging into the code, debugging, testing, trial and error, swear words, and feelings of despair, with another engineer's help I finally figured out where the problem was--the interprocess communication between parent and child Node.js processes. As the [Node.js documentation says](https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options): "Keep in mind that spawned Node.js child processes are independent of the parent with exception of the IPC communication channel that is established between the two. Each process has its own memory, with their own V8 instances." The solution we decided on was using a key/value object that stored a GUID for each request/response pair that our server created on a request, sending a message to the child process with that GUID included, sending the child's message back with the same GUID, then returning the correct response based on GUID in the key/value pair. An example of the problem and solution can be found [in this repo](https://github.com/headquarters/bugs/tree/master/node-ipc).