---
layout: post
title: Notes from Josh Clark's Designing Touch-Friendly Interfaces
date: '2014-03-14T15:00:00-05:00'
tags:
- design
- user experience
tumblr_url: http://michaelehead.com/post/79573955528/notes-from-josh-clarks-designing-touch-friendly
---
I attended a [Triangle UXPA](http://triuxpa.org/) meeting where we were able to watch the virtual seminar [Designing Touch-Friendly Interfaces by Josh Clark](http://www.uie.com/events/virtual_seminars/touch_friendly/). I'm sharing my notes here as a service to myself in the future and as a reminder to others out there about how to design touch-friendly interfaces. 

Some interesting statistics on how people hold their phones "on the street", from a field study by Steven Huber (n=~1300):

* One handed, using the thumb on that hand: ~49%
* Cradled in one hand, using pointer finger on the other: ~36%
* Two handed with both thumbs: ~15%  

So, thumb use accounts for about 64% of usage in this sample. This informs the heuristics below.

For apps:

* Primary controls on the bottom
* Right vs. left side less important than top or bottom
* Data changing buttons at the top ("out of harm's way")
* Content at top, controls on the bottom (similar to other devices, like a calculator)
* Stacking controls is a bad idea (causes mis-taps)

These guidelines reflect an iOS-bias. For Android devices, usually controls go on top because the physical device buttons are at the bottom. 

For websites, browser chrome gets in the way, so having a sticky navigation at top or bottom eats up content area. Therefore, a good way to avoid this is to put a Menu link in the header that links to navigation in the footer, but the navigation is at the bottom of the page, not the screen.

Tablets are almost more desktop-like. Controls at the top are better than the bottom. Bottom nav makes more sense if the whole canvas will change ("coverflow style"). Favor the sides and corners of the screen for controls, since sometimes we hold larger devices in both hands due to their weight. 

Dimensions for controls:

*~7mm is the contact point for thumb on a flat screen
*44px maps to ~7mm and works well across devices
*2.75em on a default font size of 16px is 44px
*7mm has a 1 in 100 error rate on taps, 9mm is 1 in 200 (based on Microsoft study)
*At least one dimension should be 44px; 29px minimum in other dimension
*At least 2mm between controls; less than that requires increasing size of controls

Clarity trumps density: you may have click or tap more, but the clarity of what's on the screen pays off. This is in contrast to previous fears on the web that too many clicks would increase bounce rate. 

General recommendations:

* Get rid of select menus; replace with other controls
* Get rid of extra fields (generally a good idea)
* Get rid of confirmation dialogs (use gestures to confirm less than desirable actions)
* Require less keyboard use
* Eliminate detail screens (providing more information upfront makes secondary detail screens less necessary...AccuWeather example)
* [Eliminate carousels](http://www.shouldiuseacarousel.com/) (seems everyone wants to do this)
* [Eliminate the long scroll](http://www.nngroup.com/articles/scrolling-and-attention/) (use off-canvas panels)

Great quotes (paraphrased): 

> "People come to your site/app for the content, not the navigation."  
> "Navigation is often a last resort if the (navigation in the) content fails us."
