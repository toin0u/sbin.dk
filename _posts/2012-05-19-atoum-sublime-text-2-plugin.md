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
6. Light report in a panel
7. Shortcut: `cmd+alt+s` on OSX or `ctrl+alt+a` on Linux and Windows: Test the current file
8. Shortcut: `cmd+alt+d` on OSX or `ctrl+alt+d` on Linux and Windows: Test files in the current directory

### Configuration
Once installed, browse the package and change `atoum.sublime-settings` with your parameters. But it's better to add your own config file, just open the command panel, write `Atoum: User File Settings` and paste the configuration below with your parameters. Remember to restart Sublime Text 2.

If you activate the **light report**, the test result will be shown in a **panel** not in a tab. This is very usefull when used with the shorcut to test quickly. It's close to the loop mode.
{% highlight json %}
{
    "php_command": "/opt/local/bin/php",
    "atoum_phar_file": "/usr/local/bin/mageekguy.atoum.phar",
    "use_light_report": true
}
{% endhighlight %}

### Screenshot
Result in a tab:
!['A simple Sublime Text 2 plugin for atoum, unit testing framework for php'](http://i.imgur.com/0dUgW.png)
Result in a panel:
!['A simple Sublime Text 2 plugin for atoum, unit testing framework for php'](http://i.imgur.com/0R2QD.png)

### Improvements
* `atoum.py` in general (especially errors handler).
* <del>Add light report mode</del>
* Better result color parsing (it's just the standard diff parser at the moment).
* Works on Mac OS X, not tested on Linux and Windows yet.
* <del>Possibility to bind shortcuts.</del>
* Reload user's configuration file without restart Sublime Text 2
* A new way to parse colors in light report mode
* ...

This plugin will be soon available via the [Package Control](http://wbond.net/sublime_packages/package_control). I sent the [pull request](https://github.com/wbond/package_control_channel/pull/321).

You can install it manualy by cloning the [repository](https://github.com/toin0u/Sublime-atoum) in `~/Library/Application Support/Sublime Text 2/Packages`.

Well, this plugin is far to be finished. So don't hesitate to **fork it** and send me your **pull requests** :)