---
layout: post
title: Example of UI pagination for viewing S3 objects
date: "2023-03-13 20:03:00 -04:00"
tags: [development]
cssClass: sveltekit-s3
---

TLDR: <br />
Demo of the S3 pagination UI: [https://coruscating-manatee-4afd46.netlify.app](https://coruscating-manatee-4afd46.netlify.app) <br />
Source code: [https://github.com/headquarters/s3-viewer](https://github.com/headquarters/s3-viewer)

Traversing S3 buckets to list objects in a bucket can sometimes be confusing because S3 stores objects, not files and folders. It uses prefixes to fake a directory structure. This fake directory structure is what shows up in its own console UI.

Another potentially confusing matter in building a UI to traverse S3 objects is the use of the word "pagination" in the client docs. If you're used to paginating meaning a REST API returns results and a client app shows results with previous/next buttons, then this not the pagination you're looking for. The [boto3 docs discuss paginators](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/paginators.html), for example, but in this case the pagination is meant to go through "pages" of your bucket's objects all in one process. Say you have 10K objects and set your limit to 1000 per page, you can loop over the paginator 10 times to eventually fetch all the results. Now your server would be holding on to 10K objects, ready to send them...to the client? Given very few UIs would ever display 10K results in a single UI page, this is unrealistic for pagination with a standard client-server architecture.

A better approach is to work with the prefix and a "continuation token" to pick back up your querying where you leave off in between requests. This is the approach I took to build something akin to the console UI for paginating through an S3 bucket. I used SvelteKit to build the UI and a single API endpoint for fetching object lists with the AWS S3 client library. Going "into" a folder alters the prefix that is used, while moving back and forth between a list "inside" a folder utilizes the continuation token to pick up where you leave off in between requests. No "paginator" required or necessary.
