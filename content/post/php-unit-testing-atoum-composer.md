+++
author = ""
comments = true
date = "2012-05-18"
draft = false
image = ""
menu = ""
share = true
slug = "php-unit-testing-atoum-composer"
tags = ["unit test", "atoum", "composer"]
title = "Unit test with atoum installed with composer"
aliases = [
    "/2012/05/18/php-unit-testing-atoum-composer/"
]
+++

### Why to use composer when we can get a phar single file ?

Well, phar file is great, really great which works very good. But I think it's much easier to use [composer](http://getcomposer.org/) to keep my **packages updated and organized**. It's also very easy to create a new projet, we just need the `composer.json` ! If we only need [atoum](https://github.com/mageekguy/atoum), it's better to install the phar file with `wget http://downloads.atoum.org/nightly/mageekguy.atoum.phar` and keep it updated with `php -d phar.readonly=0 mageekguy.atoum.phar --update`.

But let's suppose that you have more than atoum to install!

#### Create the working directory and composer.json ([package](http://packagist.org/packages/mageekguy/atoum))
* $ `mkdir ~/test-project`
* $ `cd !!:1`
* $ `vi composer.json`

<pre><code class="json">{
    "require": {
        "mageekguy/atoum": "master-dev"
    },

    "config": {
        "bin-dir": "bin/"
    }
}
</code></pre>

* $ `curl -s http://getcomposer.org/installer | php`
* $ `php composer.phar install`

#### Create a simple class to test
* $ `mkdir classes`
* $ `vi classes/helloWorld.php`

<pre><code class="language-php">namespace project;
    
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
</code></pre>

#### Create helloWorld unit test class
* $ `mkdir -p tests/units`
* $ `vi !!:2/helloWorld.php`

<pre><code class="language-php"> namespace project\tests\units;
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
</code></pre>

#### Let's run the test!
* $ `./bin/atoum -d tests/units`

<pre><code language="bash">> PHP path: /opt/local/bin/php
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
</code></pre>

#### Files structure

<pre><code language="bash">.
├── bin
│   └── atoum -> ../vendor/mageekguy/atoum/bin/atoum
├── classes
│   └── helloWorld.php
├── composer.json
├── composer.lock
├── composer.phar
├── tests
│   └── units
│       └── testHelloWorld.php
└── vendor
    ├── autoload.php
    ├── composer
    │   ├── ClassLoader.php
    │   ├── autoload_classmap.php
    │   ├── autoload_namespaces.php
    │   └── installed.json
    └── mageekguy
        └── atoum
        ...
</code></pre>

As you can see atoum is now executable in this way. A [symbolic link](https://github.com/atoum/atoum/pull/53) is created after the installation in **bin** directory. It's actually [allowed by composer](https://getcomposer.org/doc/articles/vendor-binaries.md). And to keep all packages updated, just do `php composer.phar update` !

**Update**: [Simple TDD with atoum](/2012/09/17/simple-tdd-with-atoum/)
