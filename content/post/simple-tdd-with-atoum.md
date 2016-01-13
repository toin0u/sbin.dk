+++
author = ""
comments = true
date = "2012-09-10"
draft = false
image = ""
menu = ""
share = true
slug = "simple-tdd-with-atoum"
tags = ["ruby", "atoum", "tdd", "unit test"]
title = "Simple TDD with atoum"
aliases = [
    "/2012/09/18/simple-tdd-with-atoum/"
]
+++

I will use [atoum](https://github.com/mageekguy/atoum) because I wrote about it some times ago, [Unit test with atoum installed with composer](/2012/05/18/php-unit-testing-atoum-composer/). This post will present a ruby script which is compatible with folder and files structures. It's a very simple script so it will be easy to adapt to PHPUnit if you need. <!--more-->

The [loop mode in atoum](https://github.com/mageekguy/atoum/wiki/Le-mode-%22loop%22) is usefull but we need to press enter in the terminal all the time to run tests. It works of course very well but I think it's better to **monitor classes** and **execute appropriate tests automatically**.

### Install Watchr and create tdd.rb file

<pre><code language="bash">$ gem install watchr
$ cd ~/test-project
$ vi tdd.rb
</code></pre>

### Structure

<pre><code language="bash">.
├── bin
│   └── atoum -> ../vendor/mageekguy/atoum/bin/atoum
├── classes
│   └── helloWorld.php
├── composer.json
├── composer.lock
├── composer.phar
├── tdd.rb
├── tests
│   └── units
│       └── testHelloWorld.php
└── vendor
    ...
</code></pre>

### tdd.rb file

<pre><code language="language-ruby">def clear_console
  puts "\e[H\e[2J"
end

def run_test(file)
    clear_console

    unless File.exist?(file)
        puts "#{file} does not exist"
        return
    end
 
    puts "Running: #{file}\n\n"
    result = `php bin/atoum -ulr -f #{file}`
    puts result
end

watch("classes/(.*).php") do |match|
    run_test %{tests/units/#{match[1]}.php}
end

watch("tests/units/(.*).php") do |match|
    run_test match[0]
end

clear_console
puts "Simple TDD with atoum !\n\n"
</code></pre>

### Execute tdd.rb

<pre><code language="bash">$ watchr ./tdd.rb
</code></pre>

### Edit classes/helloWorld.php or tests/units/testHelloWorld.php

### Screenshots
Ready:
!['TDD with atoum - monitor classes'](http://i.imgur.com/b4864.png)
Success:
!['TDD with atoum - sucess in terminal'](http://i.imgur.com/6mg4y.png)
Failure:
!['TDD with atoum - sucess in terminal'](http://i.imgur.com/3YNhw.png)

### Improvements
* More flexible script (classes folder and tests folder)
* Notification via Growl, Inotify, Dbus ...
* ...
* Try [testy](https://github.com/hpbuniat/testy) which is very complete

As you can see it's a *very* simple way to work in TDD. Simple but work really good :)
