---
layout: post
title: Install Ruby Gems on Mac OS X without sudo
date: '2016-02-06T5:24:00-05:00'
tags: []
---
I have never had a default installation of Ruby gems on Mac OS X let me simply
install new gems without requiring `sudo`. If you would like to install Ruby gems
without requiring `sudo`, do the following:

1. Add `GEM_HOME` to your .bash_profile

    > For example, `nano ~/.bash_profile` and add `export GEM_HOME=/Users/Michael/.gem`
    > where the path is to your own Home folder
2. Add the gem executables to your system path

    > Also in .bash_profile, add `export PATH="$GEM_HOME/bin:$PATH"`

For some reason these simple steps don't show up in the top StackOverflow answers.
People often suggest using rvm to install a custom Ruby version that won't require using
`sudo` when installing gems or something like rbenv to create a Ruby environment for the
same benefit. If you simply want to use the default installed Ruby version on Mac OS X
(this works in El Capitan) without requiring `sudo`, this should do it.
