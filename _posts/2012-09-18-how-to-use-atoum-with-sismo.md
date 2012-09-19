---
layout: post
change_frequency: weekly
priority: 0.8
published: true
comments: true
date: 2012-09-18 15:20:22
title: How to use atoum with Sismo ?
summary: I'd like to share a way to use atoum with Sismo - Your Continuous Testing Server - provided by Fabien Potencier, the creator of the Symfony framework.
category: php
tags: ['atoum', 'unit testing', 'sismo']
---

[Sismo](http://sismo.sensiolabs.org/) is not a Continuous Integration Servers (like [Jenkins](http://jenkins-ci.org/) for instance). Sismo gets your code, runs your tests and sends you notifications.

> "Sismo has been optimized to run locally on your computer for your Git projects. Even if it can test remote repositories, Sismo is better used as a local post-commit hook. Whenever you commit changes locally, Sismo runs the tests and give you immediate feedback before you actually push your modifications to the remote repository. So, Sismo is a nice complement to your Continuous Integration Server." - sismo.sensiolabs.org

### I like it because:
* it's simple to install: only one file, `sismo.php`
* it shows build history by projects in the web interface
* it can track multiple branches
* it can build remote repositories
* it's simple to config: ~/.sismo/config.php` (by default)
* Git projects build are in `~/.sismo/data/...` (by default)
{% highlight bash %}
.sismo
├── config.php
└── data
    └── build
    │   └── ...
    └── sismo.db
{% endhighlight %}
* its web interface is great to get an overview of your repositories

### Your project unit tested with [atoum](https://github.com/mageekguy/atoum) versioned with git
For this exemple, I'll use the same project "[Unit test with atoum installed with composer](/2012/05/18/php-unit-testing-atoum-composer/)" which is located in `~/test-project` with this files structure:
{% highlight bash %}
.
├── .git
│   └── ...
├── .gitignore
├── .gitmodules
├── bin
│   └── atoum -> ../vendor/mageekguy/atoum/bin/atoum
├── classes
│   └── helloWorld.php
├── composer.json
├── composer.lock
├── composer.phar
├── tests
│   └── units
│       └── testHelloWorld.php
└── vendor
    ├── autoload.php
    ├── composer
    │   └── ...
    └── mageekguy
        └── atoum
        ...
{% endhighlight %}

#### .gitignore
It's very important to **not** ignore `vendor/`, at least `vendor/mageekguy`, because `bin/atoum` is a symbolic link to `vendor/mageekguy/atoum/bin/atoum`.
{% highlight vim %}
composer.lock
composer.phar
{% endhighlight %}

#### .gitmodules
Dependencies installed with composer are Git projects. It means that you need to map these dependencies / modules in `.gitmodules` file. We only have atoum here so let's map it. Create this file if you don't have it.
{% highlight vim %}
[submodule "vendor/mageekguy/atoum"]
    path = vendor/mageekguy/atoum
    url = git://github.com/mageekguy/atoum.git
{% endhighlight %}

### Let's install Sismo
Install `sismo.php` wherever in your web directory - for instance `/var/www`.
{% highlight bash %}
$ mkdir -p /var/www/sismo
$ wget -P !!:2 http://sismo.sensiolabs.org/get/sismo.php
{% endhighlight %}

### Let's configure this project in Sismo
We need to configure this project (title, slug and path - change the user name), select a branch (master) and the command (atoum of course) to launch afterwards. It also possible to set a notification, let's say we use Growl. Edit `~/.sismo/config.php`:
{% highlight php %}
<?php

$projects = array();

$notifier = new Sismo\Notifier\GrowlNotifier('pa$$word');

$helloWorldProject = new Sismo\Project('Hello World');
$helloWorldProject->setRepository('/home/antoine/test-project');
$helloWorldProject->setBranch('master');
$helloWorldProject->setCommand('./bin/atoum -d ./tests');
$helloWorldProject->setSlug('hello-world-local');
$helloWorldProject->addNotifier($notifier);
$projects[] = $helloWorldProject;

return $projects;
{% endhighlight %}

### Let's run Sismo when you commit some changes
Create `~/test-project/.git/hooks/post-commit` and add:
{% highlight vim %}
#!/bin/sh

php /var/www/sismo/sismo.php --quiet build hello-world-local `git log -1 HEAD --pretty="%H"` &
{% endhighlight %}
{% highlight bash %}
$ chmod a+x ~/test-project/.git/hooks/post-commit
{% endhighlight %}

### Let's build !
{% highlight bash %}
$ php /var/www/sismo/sismo.php build --verbose
{% endhighlight %}
Success:
!['Sismo and atoum - success build in CLI'](http://i.imgur.com/ATlrz.png)

If his build fails, Sismo will send notifications. Use the output command to see the latest build output of a project (slug):
{% highlight bash %}
$ php /var/www/sismo/sismo.php output hello-world-local
{% endhighlight %}
!['Sismo and atoum - output of the last build in CLI'](http://i.imgur.com/ZBnEx.png)

### Web interface
For exemple: `http://127.0.0.1/sismo/sismo.php`
!['Sismo and atoum - web interface with the output of the last build'](http://i.imgur.com/1ki0Y.png)

### Troubleshooting
If you get "Hmmm, looks like something went wrong - an error occured" like this screenshot:
!['Sismo and atoum - Hmmm, looks like something went wrong - an error occured'](http://i.imgur.com/PTLwt.png)
Please check the right of your webserver for `~/.sismo/data/sismo.db` which should be writable.

If your web server runs under a different user than the one you use on the CLI, you will need to set some environment variables in your apache virtual host configuration:
{% highlight apache %}
SetEnv SISMO_DATA_PATH "/path/to/sismo/data"
SetEnv SISMO_CONFIG_PATH "/path/to/sismo/config"
{% endhighlight %}

### Conclusion
As you can see [Sismo](https://github.com/fabpot/Sismo) works like a charm with [atoum](https://github.com/mageekguy/atoum) ! There is no more excuse to not use [atoum](https://github.com/mageekguy/atoum/wiki/Ressources-et-tutoriaux) if you are a Sismo user ;) Thanks to Fabien Potentier ([@fabpot](https://twitter.com/fabpot)) and Frédéric Hardy ([@mageekguy](https://twitter.com/mageekguy)) for their tools & frameworks !