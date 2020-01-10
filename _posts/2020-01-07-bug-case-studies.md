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

## CNAME failing to resolve inside AWS VPC

My team had inherited a project that was setup inside of AWS with most of the infrastructure already in place. When a pull request was created in GitHub, it would automatically stand up a new version of the environment with URL in the form of 
`http://<branch name>.pr.domain.io` that could be used to test a feature before merging the code into master. The stack for an environment consisted of the following:
- an S3 bucket that would hold the front-end static assets for an Angular single page application, named the same as the URL: `<branch name>.pr.domain.io`
- a set of Lambda functions that served as the API
- API Gateway resources for the dynamically created URL

After a pull request was merged into master, the master branch would build and deploy to `https://dev.domain.io`. When we completed a sprint, we'd manually deploy to "higher" level environments such as UAT or Production. The UAT environment had a URL of `https://uat.domain.io` and production's URL was `https://domain.io` without a prefix.

One of the project's features involved taking screenshots of the site itself to use as images in a PowerPoint presentation. You might be asking, "Why??", to which I'd be happy to respond outside of this blog post... This process involved a Lambda function
using headless Chrome to visit the front-end of the site to take screenshots. For example, in the dev environment a Lambda function would attempt to hit the front-end of `https://dev.domain.io/some-page`, take a screenshot, and then use that image in a process that created a PowerPoint presentation file and emailed it to the user that had kicked off the process. 

This whole process of standing up a stack and creating a PowerPoint presentation worked well in all environments, _except_ the pull request (PR) environment. For some reason, PowerPoint slides came back with missing screenshots in that environment. After enabling a ton of logging in the headless Chrome process we found that requests to our dynamically-created URLs returned an error of `net::ERR_NAME_NOT_RESOLVED`. This seemed to be related to DNS name resolution. 

I found one solution that involved changing the endpoint our application code used for PR branches to `http://<branch name>.pr.domain.io.s3-website-us-east-1.amazonaws.com/`. This seemed to circumvent the DNS resolution issue and worked, but wasn't a satifsying solution. 

Looking into Route53 settings, I found that our "stable" environment names were all Type A records with an ALIAS to Cloudfront. These S3 buckets never changed names, just contents of them changed, so a stable Cloudfront name could be used to reference them. 
The PR Route53 record, though, was a Type NS with individual entries for each PR environment that had a CNAME referencing the S3 bucket. As a shot in the dark, I modified our Cloudformation template to generate an A record instead of a CNAME for our PR environments and...
it worked! To this day, I'm still not clear why this made a difference (if you happen to know, please reach out!), but it fixed the issue. I was then able to revert the application code back to using the "normal" PR environment URL: `http://<branch name>.pr.domain.io`. 

Below is the Cloudformation template snippet before making the change:
```
  resourceRoute53RecordSetNoCloudFront:
    Condition: conditionIsBranchBuild
    Type: "AWS::Route53::RecordSet"
    Properties:
      ResourceRecords:
        - !GetAtt [resourceS3WebsiteBucket, WebsiteURL]
      Type: CNAME
      TTL: 300
      HostedZoneName: !Sub "${paramEnvironment}.domain.io."
      Name: !Sub "${paramBranch}.pr.domain.io"
```

Replacing the `ResourceRecords` property with `AliasTarget` and `Type: A` below changed the record type:
```
  resourceRoute53RecordSetNoCloudFront:
    Condition: conditionIsBranchBuild
    Type: "AWS::Route53::RecordSet"
    Properties:
      AliasTarget:
        DNSName: s3-website-us-east-1.amazonaws.com
        HostedZoneId: Z3AQBSTGFYJSTF
      Type: A
      HostedZoneName: !Sub "${paramEnvironment}.domain.io."
      Name: !Sub "${paramBranch}.pr.domain.io"
```

I don't have a repo for recreating this issue because it involves a ton of infrastructure to recreate, but the template snippet above is all that had to be changed to switch a Route53 record from a CNAME to an A with an Alias in our stack. 
