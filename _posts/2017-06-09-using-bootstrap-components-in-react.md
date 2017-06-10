---
layout: post
title: Using Twitter Bootstrap Components with React
date: '2017-06-09T10:50:00-05:00'
tags: []
---

[React](facebook.github.io/react/) continues to gain traction as a library for creating 
user interfaces for the web (and for other [platforms](https://facebook.github.io/react-native/)). 
React is great for building UI components at a lower level than what you might get from a framework. 
Nonetheless, many frameworks remain popular such as Twitter [Bootstrap](getbootstrap.com), which provides a lot more
ready-made components out of the box. 

Twitter Bootstrap's components that have interactivity (e.g. Dropdown, Modal, etc), utilize jQuery as the
JavaScript library for handling the state of these components and the event binding. What if you find
yourself wanting to mix Bootstrap and React? If you utilize React elsewhere but want to use a single Bootstrap 
component, it's not a great idea to include jQuery to make the Bootstrap component "functional". 

Some options exist, such as [React Bootstrap](https://react-bootstrap.github.io/) and [Reactstrap](https://reactstrap.github.io/). Unfortunately for React Bootstrap, it appears to still be using Bootstrap version 3, so if you want to use version 4 (even though it _is_ alpha) you're out of luck. Reactstrap is built with version 4 support, but still might be overkill for some particular cases. 

It's not too difficult to take a Bootstrap component and create a React-ready component from it. Here is an example
of the [Dropdown component on CodePen](https://codepen.io/michaelehead/pen/gRPqYQ):

<p data-height="265" data-theme-id="0" data-slug-hash="gRPqYQ" data-default-tab="js,result" data-user="michaelehead" data-embed-version="2" data-pen-title="React Bootstrap Dropdown" class="codepen">See the Pen <a href="https://codepen.io/michaelehead/pen/gRPqYQ/">React Bootstrap Dropdown</a> by Michael Head (<a href="https://codepen.io/michaelehead">@michaelehead</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

The process was to copy the markup from the [documentation](https://v4-alpha.getbootstrap.com/components/dropdowns/), 
use that as the JSX for the React component to render (which will require all the Bootstrap CSS to render properly),
then adding an event handler for the button to toggle the dropdown state. I watched the DOM for changes
in Chrome DevTools in order to see that the outermost DOM element receives the class "show" when toggled open and
the ARIA attributes update to reflect the open state. 

Word of caution: this method will only get you so far; the [JavaScript for the Bootstrap dropdown](https://github.com/twbs/bootstrap/blob/v4-dev/js/src/dropdown.js) component manages a lot more state 
and binds to more events so this may not be the best approach if you want a 100% compliant Bootstrap dropdown
using React for the JS behavior. Nonetheless, it gets you pretty far toward using React with Bootstrap
and avoiding the extra overhead of jQuery being included in your web application just for use with Bootstrap. 