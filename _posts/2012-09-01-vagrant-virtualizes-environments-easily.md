---
layout: post
change_frequency: weekly
priority: 0.8
published: true
comments: true
date: 2012-09-01 12:43:39
title: Vagrant virtualizes environments easily !
summary: How to keep development, staging, and production environments as similar as possible ? Virtualization is a good solution, and Vagrant will help us to do that. It's powerfull, lightweight, reproducible and portable ! Moreover it's easy to create and to setup. Interested ?
category: Virtualization
tags: Vagrant Ruby VirtualBox
---

Image you are working on 3 different projects:

* Project A: PHP 5.3, NginX, MySQL...
* Project B: Ruby, Rails, MangoDB...
* Project C: PHP 5.4, Apache2, PostgreSQL...

The problem is obvious. Imagine now that the production server is Ubuntu 12.04 and you're working on Mac OS X or windows. How to solve these problems ? Vagrant will help us to install the Ubuntu 12.04 Box and to make 3 development environments with its dependencies via provisioning scripts !

### Dependencies
* [VirtualBox](https://www.virtualbox.org) - Vagrant uses Oracle's VirtualBox.
* [Ruby](http://www.ruby-lang.org) - Vagrant uses Ruby!
* [RVM](https://rvm.io) - A good [RVM manager](http://unfiniti.com/software/mac/jewelrybox) for Mac OS >= 10.6.x

### Installation
Vagrant's [packages](http://downloads.vagrantup.com) are prefered but it's possible to install with [Ruby Gem](http://rubygems.org).
{% highlight bash %}
$ gem install vagrant
{% endhighlight %}

### Configuration
On Windows and Mac OS X, the vagrant command should automatically be placed on your PATH like `PATH=$PATH:/Applications/VirtualBox.app/Contents/MacOS/`. On other systems, you must add `/opt/vagrant/bin to your PATH.

### Vagrant in action !
Let's create our first vrtualized development envionment for the project A which is based on Ubuntu 12.04 LTS (Precise Pangolin).

* `mkdir -p ~/Vagrant/ProjectA && cd !!:2`
* `vagrant box add precise32 http://files.vagrantup.com/precise32.box` - download Ubuntu 12.04 Box.
* `vagrant init precise32` - create a file named `Vagrantfile` which will let us to [setup the envionment](http://vagrantup.com/v1/docs/vagrantfile.html).
* `vagrant up` - mount the instance.
* `vagrant ssh` - connect to the instance.

That's it ! [Want to test other base boxes ?](http://www.vagrantbox.es) All base boxes has the following base requirements:

* VirtualBox Guest Additions for shared folders, port forwarding, etc...
* SSH with key-based auto. support for the vagrant user.
* Ruby and RubyGems to install Chef and Puppet.
* Chef and Puppet for provisioning support.

### Usefull comands

* `vagrant` - list all commands.
* `vagrant status` - status of your VM.
* `vagrant box add|list|remove|package` - all about your boxes.
* `vagrant destroy|up` - delete all traces of the VM off the disk.
* `vagrant suspend|resume` - graceful shutdown of your VM.
* `vagrant halt|up` - save the current running state of your VM and then stop it.
* `vagrant reload` - graceful shutdown and reload your VM.
* `vagrant provision` - reload provisioner.
* `vagrant package` - make a package of your VM.

### Provisioning 
Not very usefull to have a blank virtual machine. [Provisioners](http://vagrantup.com/v1/docs/provisioners.html) allow you to easily setup your virtual machine with everything it needs to run your software. Vagrant supports [Chef](http://www.opscode.com/chef), [Puppet](http://puppetlabs.com/puppet) and Shell. It's so possible to make our projects A, B and C easily ! I'll make a post about provisioning with puppet later. Hope you'll use vagrant for your next project !