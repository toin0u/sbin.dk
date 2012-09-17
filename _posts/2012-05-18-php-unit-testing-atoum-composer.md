---
layout: post
change_frequency: weekly
priority: 0.8
published: true
comments: true
date: 2012-05-18 00:56:53
title: Unit test with atoum installed with composer
summary: I'm used to use atoum to test my PHP classes because I think it's more intuitive than PHPUnits. I just found out that it was possible to install it with composer. Let's see how to do that.
category: PHP
tags: unit-testing atoum composer
---

### Why to use composer when we can get a phar single file ?

Well, phar file is great, really great which works very good. But I think it's much easier to use [composer](http://getcomposer.org/) to keep my **packages updated and organized**. It's also very easy to create a new projet, we just need the `composer.json` ! If we only need [atoum](https://github.com/mageekguy/atoum), it's better to install the phar file with `wget http://downloads.atoum.org/nightly/mageekguy.atoum.phar` and keep it updated with `php -d phar.readonly=0 mageekguy.atoum.phar --update`.

But let's suppose that you have more than atoum to install!

#### Create the working directory and composer.json ([package](http://packagist.org/packages/mageekguy/atoum))
* $ `mkdir ~/test-project`
* $ `cd !!:1`
* $ `vi composer.json`
{% highlight json %}
{
    "require": {
        "mageekguy/atoum": "master-dev"
    },

    "config": {
        "bin-dir": "bin/"
    }
}
{% endhighlight %}
* $ `curl -s http://getcomposer.org/installer | php`
* $ `php composer.phar install`

#### Create a simple class to test
* $ `mkdir classes`
* $ `vi classes/helloWorld.php`
{% highlight php %}
<?php
    namespace project;
    
    class helloWorld
    {
        private $name;

        public function __construct($name = null) {
            $this->name = $name;
        }

        public function getName($name = null) {
            return null === $name ? $this->name : (string)$name;
        }
    }
{% endhighlight %}

#### Create helloWorld unit test class
* $ `mkdir -p tests/units`
* $ `vi !!:2/helloWorld.php`
{% highlight php %}
<?php
    namespace project\tests\units;
    use 
        mageekguy\atoum,
        project
    ;

    require_once __DIR__ . '/../../classes/helloWorld.php';

    class helloWorld extends atoum\test
    {
        const NAME = 'Hello world!';

        public function testGetName() {
            $helloWorld = new project\helloWorld();
            $this
                ->assert('With empty constructor getName returns null')
                    ->variable($helloWorld->getName())->isNull()
                ->assert('With empty constructor getName returns the string sent in parameter')
                    ->string($helloWorld->getName(self::NAME))->isEqualTo(self::NAME)
            ;
            $helloWorld = new project\helloWorld(self::NAME);
            $this
                ->assert('With a string in constructor getName returns its string')
                    ->string($helloWorld->getName())->isEqualTo(self::NAME)
                ->assert('With a string in constructor getName returns its string')
                    ->string($helloWorld->getName(self::NAME))->isEqualTo(self::NAME)
            ;
        }
    }
{% endhighlight %}

#### Let's run the test!
* $ `./bin/atoum -d tests/units`
{% highlight bash %}
> PHP path: /opt/local/bin/php
> PHP version:
=> PHP 5.3.12 (cli) (built: May 11 2012 21:44:07)
=> Copyright (c) 1997-2012 The PHP Group
=> Zend Engine v2.3.0, Copyright (c) 1998-2012 Zend Technologies
=>     with Xdebug v2.1.4, Copyright (c) 2002-2012, by Derick Rethans
> project\tests\units\helloWorld...
[S___________________________________________________________][1/1]
=> Test duration: 0.03 second.
=> Memory usage: 0.25 Mb.
> Total test duration: 0.03 second.
> Total test memory usage: 0.25 Mb.
> Code coverage value: 100.00%
> Running duration: 0.17 second.
Success (1 test, 1/1 method, 7 assertions, 0 error, 0 exception) !
{% endhighlight %}

#### Files structure
{% highlight bash %}
.
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
    │   ├── ClassLoader.php
    │   ├── autoload_classmap.php
    │   ├── autoload_namespaces.php
    │   └── installed.json
    └── mageekguy
        └── atoum
        ...
{% endhighlight %}

As you can see atoum is now executable in this way. A [symbolic link](https://github.com/mageekguy/atoum/pull/53) is created after the installation in **bin** directory. It's actually [allowed by composer](http://getcomposer.org/doc/articles/vendor-bins.md). And to keep all packages updated, just do `php composer.phar update` !

**Update**: [Simple TDD with atoum](/2012/09/17/simple-tdd-with-atoum/)