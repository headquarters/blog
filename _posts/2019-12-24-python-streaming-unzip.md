---
layout: post
title: Unzipping a large gzip file in Python
date: '2019-12-27 22:11:00 -05:00'
tags: [javascript, development]
cssClass: python-streaming-unzip
---

# The Project
I worked on a project recently that required ingesting a large flat file that my team received as a gzipped file. The gzipped file was 3GB in size and uncompressed it was about 55GB. It had around 200 million rows in it. The ingest process involved taking that file and getting the data into an Aurora RDS MySQL database. 

I inherited the project from a previous team that had implemented a way of ingesting the file via the Python library Pandas. Pandas can "stream" unzip and decompress a file, grabbing lines of a few chunks at a time (say 10000 lines), and inserting it into a database. I was pretty impressed, given the gzipped file size. Inserting all those records via Pandas took between 4-5 hours. 

# The Environment
The gzipped file sat in an S3 bucket that a Python script would read from. The Python script ran in an AWS Step Function that spun up a container via Fargate. The container was maxed out in its resources in ECS with a soft limit of RAM around 30GB and a max disk space of 14GB. So, unzipping this file into memory or onto disk was not an option and the Pandas process worked really well to avoid exhausting memory or disk space. 

# Performance
After doing some performance analysis I found that using the native MySQL `LOAD DATA LOCAL INFILE`, and more specifically its AWS-specific cousin `LOAD DATA FROM S3`, would be a lot faster than the Pandas process. In fact, it shaved off around 2.5 hours. However, MySQL only supports loading uncompressed files via the `LOAD` command. 

We updated the ingest process to use `LOAD DATA FROM S3` and saw a performance uptick, but we then had to manually uncompress the file before uploading it to its original S3 bucket. This took a long time&mdash;uploading a 55GB file via `aws s3 cp` would take about an hour from our local machines on our office network. This wasn't a great compromise because we introduced a manual step that was time consuming and prone to failing (if a computer went to sleep while uploading, for example). 

I started testing out whether we could download the gzipped file to our Fargate container and unzip it there before loading to MySQL. Unfortunately, I ran into memory constraints and disk space constraints in Fargate. At that point we could have scrapped that infrastructure and gone with something else like EC2, but the existing infrastructure was very appealing and it seemed possible to do this without exhausting the container's memory or disk space. Pandas got away with it, right?

# The Solution
After several rounds of searching online, reading through various StackOverflow answers, and lots of trial and error I finally found a solution. Python could open the gzipped file without reading its entire contents to memory or saving it to disk and boto3 could [upload it back to S3 as a file object](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html#S3.Client.upload_fileobj). Then, since the file is back in S3 as a decompressed file as if we'd uploaded it ourselves, we can continue to use `LOAD DATA FROM S3` as normal. Voila! Problem solved with [two lines of Python code](https://github.com/headquarters/python-streaming-unzip/blob/master/src/main.py#L22-L23)

To showcase the power of this method for decompressing a large file without exhausting memory or disk space, I put together a repository that demonstrates the various scenarios I tried: [https://github.com/headquarters/python-streaming-unzip](https://github.com/headquarters/python-streaming-unzip). Here you can play around with a Docker container that can execute a Python script that attempts to decompress a gzipped file into memory, onto disk, or via the streaming method. You'll have to provide your own large compressed file in S3, though. 




