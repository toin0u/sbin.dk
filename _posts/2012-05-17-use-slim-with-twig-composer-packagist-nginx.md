---
layout: post
change_frequency: weekly
priority: 0.8
published: true
comments: true
date: 2012-05-17 14:28:21
title: Use Slim with Twig via Composer and Packagist on NginX
summary: I enjoy to test PHP frameworks and I was looking for a light PHP framwork to prototype and develop a small project. Let's see how easy is to start with those tools.
category: PHP
tags: slim twig composer packagist nginx
---

I enjoy to test PHP framework and I was looking for a light PHP framwork to prototype and develop a small project. I will write a little post to show how easy is to start with these tools. But first let's present them.

* [Slim Framework](http://www.slimframework.com/) is a micro PHP framework which is everything you need and nothing you don't.
* [Twig](http://twig.sensiolabs.org/) is an easy and powerfull template engine used in [Symfony2](http://symfony.com/).
* [Composer](http://getcomposer.org/) is the best dependency manager for PHP.
* [Packagist](http://packagist.org/) aggregates PHP packages installable with Composer.

#### Make the working directory in /var/www/ and install packages with composer.
* % `mkdir /var/www/slim`
* % `cd !!:1`
* % `vi composer.json`
{% highlight json %}
{
    "require": {
        "twig/twig": "1.8.*",
        "twig/extensions": "dev-master",
        "slim/slim": "1.6.*",
        "slim/extras": "1.0.*"
    }
}
{% endhighlight %}
* % `curl -s http://getcomposer.org/installer | php`
* % `php composer.phar install`

#### Let's create index.php and template files.
* % `mkdir -p app/templates`
* % `vi app/index.php
{% highlight php %}
<?php
    require '../vendor/autoload.php';
    
    $app = new Slim(array(
        'templates.path' => __DIR__.'/templates/',
    ));
    
    require '../vendor/slim/extras/Views/TwigView.php';
    TwigView::$twigExtensions = array('Twig_Extensions_Slim',);
    
    $app->view('TwigView');
    
    $app->get('/', function() use ($app) {
        $app->render('index.twig.html', array(
            'foo' => 'bar',
        ));
    });
    
    $app->get('/hello/:name', function($name) use ($app) {
        $app->render('hello.twig.html', array(
            'name' => $name,
        ));
    });
    
    $app->run();
{% endhighlight %}
* % `echo "` \{\{ foo }} `" > app/templates/index.twig.html`
* % `echo "` Hello \{\{ name }}! `" > app/templates/hello.twig.html`

#### Add 127.0.0.1 slim.dev in your /etc/hosts.
* % `echo "127.0.0.1 slim.dev" | sudo tee -a /etc/hosts`

#### Configure NginX.
{% highlight nginx %}
    server_name slim.dev;
    root /var/www/slim/app;
    location / {
        index index.php index.html;
        try_files $uri $uri/ /index.php?$request_uri;
    }
{% endhighlight %}

Restart NginX and browse `http://slim.dev/` and `http://slim.dev/hello/world`. It's a very **simple** exemple but usefull to get started. Don't hesitate to dig the [Slim framework's documentation](http://www.slimframework.com/documentation/stable) to learn more. If you have any questions or improvements please comment and/or pull request.