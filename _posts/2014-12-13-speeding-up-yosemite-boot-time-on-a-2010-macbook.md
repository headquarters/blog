---
layout: post
title: Speeding up Yosemite boot time on a 2010 MacBook Pro
date: '2014-12-13T15:10:26-05:00'
tags: []
tumblr_url: http://michaelehead.com/post/105110966428/speeding-up-yosemite-boot-time-on-a-2010-macbook
---
I have a mid-2010 MacBook Pro with a dual core i7, 8GB of RAM, and a solid state drive (SSD). In its heyday, with Snow Leopard, it was pretty damn fast. In 2014, this once-majestic laptop has finally succumbed to [Wirth's law](http://en.wikipedia.org/wiki/Wirth%27s_law). 

Mavericks ran on it well enough, but there were definitely visual glitches and problems here and there, so I decided to give Yosemite a chance. I did a clean install of Yosemite and found that things weren't as bad as I had expected. However, the first time I restarted the computer, the boot time was 1 minute and 15 seconds from chime sound to log in screen. On an SSD with an i7 processor, that was unacceptable. 
Doing some research online, I found some recommendations for ways to possibly improve the performance. So, I tried two of these:

[Resetting the SMC](http://support.apple.com/en-us/HT201295)  
[Resetting the PRAM](http://support.apple.com/kb/PH18761)

Following those two steps, the boot time dropped from 1:15 to 15 seconds. So, resetting the SMC and the PRAM reduced the boot time in Yosemite by a full minute. Thank goodness.

So far, I think I'll stick with Yosemite. Fixing the boot time issue helped sway me a bit, but it's really disappointing that users, in 2014, have to resort to such "technical" things to fix performance with a clean install of an operating system. 
