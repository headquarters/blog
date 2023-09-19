---
layout: post
title: Using an IP address locally with Node.js 17+
date: "2023-09-18 20:53:00 -04:00"
tags: [development]
cssClass: nodejs-dns
---

Try this out: you can access your SvelteKit app locally at `http://[::1]:5173`...crazy looking address, huh?

The following is information specific to a SvelteKit app running on macOS but should apply to any app that runs Node.js 17 or up for a server.

When running a SvelteKit app locally, it gives your app the default address of `localhost:5173`. Normally, this would mean you could access the site at `127.0.0.1:5173` as well, given that the loopback IP is normally mapped to localhost. On macOS, if you `cat /etc/hosts`, you'll see something like:

```
##
# Host Database
#
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##
127.0.0.1	localhost
255.255.255.255	broadcasthost
::1             localhost
```

This shows that 127.0.0.1 is mapped to localhost. So what's going? In Node.js 17, there was a [change to the order in which DNS lookup results were ordered](https://nodejs.org/en/blog/release/v17.0.0#other-notable-changes) so that instead of re-ordering results to put IPv4 first, it now uses the OS's results as-is. This means a Node.js 17+ server is binding to the IPv6 address instead of the IPv4, so you can access your site at the "weird" looking address of `http://[::1]:5173`.
