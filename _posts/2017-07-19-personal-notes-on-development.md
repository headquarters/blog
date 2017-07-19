---
layout: post
title: Some Personal Notes on Development 
date: '2017-07-19T3:15:00-05:00'
tags: [ux, design]
---

After posting [some personal notes on UX design](/2017/07/16/personal-notes-on-ux-design.html), I figured why not publish all the notes
I keep for development, too? Below are random snippets of code I've found useful, CLI commands, and other tidbits that I 
always find myself coming back to for reference. 

---

{% highlight bash %}
# Kill a process by name (only verified on macOS)
# Example: `sudo pkill node`
sudo pkill $PROCESSNAME
{% endhighlight %}

{% highlight bash %}
# SSH config with multiple hostnames and a domain controller prefix for username, ~/.ssh/config
# This allows you to do something like `ssh name1` and it will expand to include the username and proper key 
# It's counterintuitive, but the generic settings (Host *) go at the bottom of the file
Host name1 name2 name3 
  HostName %h.domain.tld
  # Rarely needed, more likely your username does not have a prefix
  User "controller\username"

# Override specific properties of the "*" Host setting
Host name4
  HostName differentdomain.tld
  IdentityFile ~/.ssh/private_key2

Host *
  IdentityFile ~/.ssh/private_key
  ForwardAgent yes
  # These two are macOS specific
  AddKeysToAgent yes
  UseKeychain yes  
{% endhighlight %}

{% highlight bash %}
# Snippets from .bash_profile 
# Edit the profile itself
alias showprofile="cat ~/.bash_profile"
alias editprofile="nano ~/.bash_profile"
alias loadprofile="source ~/.bash_profile"

# macOS flushdns
alias flushdns="sudo killall -HUP mDNSResponder"

# Spin up simple Python server in current directory (wherever the command is run)
alias pythonserver="python -m SimpleHTTPServer 8000"

# Node.js ENV shortcuts
alias setprod="export NODE_ENV=production"
alias setdev="unset NODE_ENV"
alias checkenv="echo \$NODE_ENV"

# macOS IPv6 toggling
alias disableipv6="networksetup -setv6off Wi-Fi"
alias enableipv6="networksetup -setv6automatic Wi-Fi"

# macOS copy IP addresses to clipboard
alias getethernetip="ipconfig getifaddr en0 | pbcopy"
alias getwirelessip="ipconfig getifaddr en1 | pbcopy"

# Configure git CLI (requires .git-prompt shell file)
source ~/.git-prompt.sh
PS1='[\u@\h \W$(__git_ps1 " (%s)")]\$ '

# Make nano the default editor because who wants to deal with vi when doing git commit? ;)
export EDITOR=nano

# Load SSH identities since macOS forgets on reboot
eval `ssh-agent -s`
ssh-add -A > /dev/null 2>&1
{% endhighlight %}

{% highlight bash %}
# Symlink a folder; notice there are no trailing slashes (only verified on macOS)
ln -sFv /path/to/original-folder /path/to/folder-symlink
{% endhighlight %}

{% highlight bash %}
# Tail multiple logs at the same time
tail -f /var/log/name*.log
{% endhighlight %}

{% highlight bash %}
# Delete files older than 5 days
find ./* -mtime +5 -exec rm {} \;
{% endhighlight %}

{% highlight bash %}
# Find processes listening on $PORT
lsof -n -i:$PORT | grep LISTEN
{% endhighlight %}

{% highlight bash %}
# git commands
git diff branch1..branch2 -- filename

git cherry-pick <commit hash>
{% endhighlight %}

{% highlight bash %}
# Show disk space used with human readable file format
df -h

# Find the top 10 largest directories in /path
du -Sh /path | sort -rh | head -10
{% endhighlight %}