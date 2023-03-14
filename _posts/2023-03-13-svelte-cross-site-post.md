---
layout: post
title: Configuring Docker for serving a SvelteKit app
date: '2023-03-13T20:03:00-04:00'
tags: [development]
cssClass: sveltekit-docker
---

[SvelteKit](https://kit.svelte.dev) is a great web framework for building full stack apps using the underlying component model from Svelte. Recently, I had to debug an issue with a form action not working when submitting to the same page the form was served from. As an example:

```
<form action="/go/here" method="POST">
...
</form>
```

On submit, both with a normal form POST or using the `enhance` action for the form, would lead to the error "Cross-site POST form submissions are forbidden". This was only in our deployed environment and not locally. 

After some trial and error, searching online, and re-reading the docs on [environment variables for the Node.js adapter](https://kit.svelte.dev/docs/adapter-node#environment-variables) I realized I needed to set the ORIGIN when the node server is starting. Note: this is *not* set when doing the build itself. The "build" below refers to the "build" folder, not the "build" command in `npm run build`. 

Dockerfile snippet:

```
# build the app 
RUN npm run build 

# assumes the default SvelteKit host and port
ENV ORIGIN=http://localhost:3000 

# start the node.js app in build folder
CMD ["node", "build"] 
```

Now a form action will POST properly when deployed. 