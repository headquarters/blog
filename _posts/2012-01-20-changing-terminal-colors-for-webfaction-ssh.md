---
layout: post
title: Changing terminal colors for Webfaction SSH sessions
date: '2012-01-20T11:08:00-05:00'
tags: []
tumblr_url: http://michaelehead.com/post/16173801624/changing-terminal-colors-for-webfaction-ssh
---
I was trying to figure out how to change the color of directory names in Terminal.app when I SSH into my Webfaction server. Fortunately it was as simple as copying `/etc/DIR_COLORS` to `~/.dir_colors`, then changing `DIR 01;34` to `DIR 01;37` in that file. I think the white color is much more readable in Mac OS X terminal compared to the blue.
