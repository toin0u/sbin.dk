---
layout: post
change_frequency: weekly
priority: 0.8
published: true
comments: true
date: 2012-05-19 20:51:54
title: A simple Sublime Text 2 plugin for atoum
summary: I was looking for an atoum plugin for Sublime Text 2 and I couldn't find one. So I decided to make a simple one even I not a python develop. I figured out something that work but I need your pull requests to improve it.
category: Python
tags: ['unit-testing', 'atoum', 'sublime text 2']
---

[Atoum](https://github.com/mageekguy/atoum) is a great unit testing framework for php and [Sublime Text 2](http://www.sublimetext.com/) a must have text editor. I was looking for a plugin which can execute tests without leaving the editor like the existing [vim-plugin](http://www.sublimetext.com/). I couldn't find one.

I decided so to make one and learn how to make a plugin in Sublime Text 2. It was less complicated than I though even if it should be written in python. I started to look at the Sublime Text 2 [Documentation](http://www.sublimetext.com/docs/2/index.html), its [API Reference](http://www.sublimetext.com/docs/2/api_reference.html), how to submit a [package](http://wbond.net/sublime_packages/package_control/package_developers) and the [python standard library](http://docs.python.org/library/).

This atoum plugin has so far the features below:

### Features
1. Test a single php file (via the context menu and the command palette).
2. Test all php files in a directory (via the sidebar, via the context menu and the command palette).
3. Result will show up in a other tab in read-only.
4. Result should be parsed with colors.
5. Possibility to install the plugin via the [Package Control](http://wbond.net/sublime_packages/package_control).

### Configuration
Once installed, browse the package and change `atoum.sublime-settings` with your parameters.
{% highlight json %}
{
    "php_command": "/opt/local/bin/php",
    "atoum_phar_file": "/usr/local/bin/mageekguy.atoum.phar"
}
{% endhighlight %}

### Screenshot
!['A simple Sublime Text 2 plugin for atoum, unit testing framework for php'](http://i.imgur.com/0dUgW.png)

### Improvements
* `atoum.py` in general (especially errors handler).
* Better result color parsing (it's just the standard diff parser at the moment).
* Works on Mac OS X, not tested on Linux and Windows yet.
* Possibility to bind shortcuts.
* ...

This plugin will be soon available via the [Package Control](http://wbond.net/sublime_packages/package_control). I sent the [pull request](https://github.com/wbond/package_control_channel/pull/321).

You can install it manualy by cloning the [repository](https://github.com/toin0u/Sublime-atoum) in `~/Library/Application Support/Sublime Text 2/Packages`.

Well, this plugin is far to be finished. So don't hesitate to **fork it** and send me your **pull requests** :)