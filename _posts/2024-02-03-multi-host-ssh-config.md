---
layout: post
title: An example multi-host SSH config
date: "2023-09-18 20:53:00 -04:00"
tags: [development]
cssClass: nodejs-dns
---

Sometimes I need to open one or more SSH tunnels to remote hosts. I used to do this with aliases in my zsh profile, so I could call something like `sshhostname` and it would automatically run the ssh tunneling command. I've since adopted an SSH config as it made it a lot easier to maintain and had a nice benefit of making the tunnels easier to find for closing later.

Below is an example multi-host SSH config. It shows how to set up SSH tunneling for two hosts (hostname1 and hostname2). Since hostname3 does not have other directives set for it, it will set up an interactive session.

```
# ~/.ssh/config

Host hostname1 hostname2 hostname3
  HostName 10.10.10.100

# Create a tunnel (ports below) without opening a session the current shell
Host hostname1 hostname2
  ForkAfterAuthentication yes
  SessionType none

Host hostname1
  LocalForward 4555 10.10.10.100:4555

Host hostname2
  LocalForward 5432 10.10.10.100:5432

Host *
  AddKeysToAgent yes
  UseKeychain yes
  ForwardAgent no # do not need to send local keys to remote machine
  ServerAliveInterval 300
  TCPKeepAlive no
  IdentityFtle ~/.ssh/id_ed25519
```

This config is used by referencing the hostname on the command line, e.g. `ssh hostname1`

I found that one of my favorite things about using the SSH config with hostnames is that active tunnels show up in the process list with their names such as "ssh hostname1". This makes it a little easier to kill those sessions on command, such as to re-use a port.

```
# ~/.zshrc

alias killssh="pgrep -f \"ssh [hostname1|hostname2|hostname3]\" | xargs kill"
```

With this alias, calling `killssh` will only the active SSH sessions for your hosts, not all active SSH processes. This is especially useful to prevent accidentally killing the SSH session opened by Rancher Desktop for Docker. If you run `ps aux | grep ssh` with Rancher Desktop running, you'll see it has an active SSH session running to a socket:

```
ps aux | grep ssh
<username>          21571   0.0  0.0 33896736    828   ??  S     8:42PM   0:00.00 ssh -F /dev/null -o <truncated> 56843 127.0.0.1 -- sshfs ":/Applications/Rancher Desktop.app/Contents/Resources/resources" "/Applications/Rancher Desktop.app/Contents/Resources/resources" -o slave -o allow_other
```

So, if you run in an environment where you use Rancher Desktop for Docker containers and have to support a few SSH tunnels locally, hopefully this will help you as well.
