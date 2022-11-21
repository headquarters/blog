---
layout: post
title: Artificial delays in Mock Service Worker
date: '2022-11-21T03:02:00-05:00'
tags: [development]
cssClass: artificial-delays-in-msw
---

[Mock Service Worker](http://mswjs.io) (MSW) is a great library for mocking API calls in your front-end application. This works well both in the browser and in a test environment, such as Jest. 

MSW runs a Service Worker to intercept requests and provide responses immediately back to your API calls with `fetch`, `XHR`, and the like. This means your UI gets nearly-instant responses from your mock API in the browser. However, this can also lead a UI developer to forget that real network calls come with real latency. To ensure your UI works well with various loading states, waiting for network responses, avoids time outs, and so on, you can add a delay to each MSW response as the first parameter in the `res` function.

```
rest.get('/api/:id', (req, res, ctx) => {
  const { id } = req.params;
  const post = data.find(post => post.id.toString() === id);
  return res(ctx.delay(500), ctx.json(post));
})
```

This means each time that API should respond, it waits 500ms before "sending" back the response. With a lot of MSW handlers, this can become slow in your unit tests so it's a good idea to only add this delay in non-test environments. 

```
import { rest } from 'msw';
import data from './data.json';

const delay = process.env.NODE_ENV === "test" ? 0 : 500;

export const handlers = [
  rest.get('/api/:id', (req, res, ctx) => {
    const { id } = req.params;
    const post = data.find(post => post.id.toString() === id);
    return res(ctx.delay(delay), ctx.json(post));
  }),
];
```

With this approach, we can develop our UI in the browser and see our loading states while our automated unit tests can still run fast without pausing for MSW responses. 