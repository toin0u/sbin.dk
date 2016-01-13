+++
author = ""
comments = true
date = "2012-09-06"
draft = false
image = ""
menu = ""
share = true
slug = "flow3-php-framework-on-nginx"
tags = ["flow3", "typo3", "nginx"]
title = "FLOW3 PHP framework on Nginx"
aliases = [
    "/2012/09/06/flow3-php-framework-on-nginx/"
]
+++

[FLOW3](http://flow3.typo3.org/) is a PHP framework which was mainly created to develop [TYPO3 Phoenix](http://phoenix.typo3.org/). This work on Linux, Mac OSX and Windows (but not on XP because of the symbolic links in Ressources) with Apache 2 as a recommended HTTP servers and it requires PHP 5.3.2 or higher. <!--more-->

FLOW3 v1.1.0 is good framework, I will compare it to Symfony2 because as a modern framework they share a lot [features](http://flow3.typo3.org/about/features.html) like MVC, DI, HTTP fundation, DDD ([Domain-Driven Design](http://net.tutsplus.com/tutorials/domain-driven-design/)), Templating, Security, Command Line... But FLOW3 is the only AOP ([Aspect-Oriented Programming](http://net.tutsplus.com/tutorials/php/aspect-oriented-programming-in-php)) framework for PHP. Let's look how to install FLOW3 on NginX in your MAC OS X / Linux.

### First [download](http://flow3.typo3.org/download.html) and unpack it in your htdocs directory
{% highlight bash %}
$ cd /var/www
$ wget http://downloads.sourceforge.net/project/flow3/FLOW3/1.1.0/FLOW3-1.1.0.tar.gz -O-| tar xz
$ cd FLOW3-1.1.0
{% endhighlight %}

#### On Mac OSX:

<pre><code language="bash">$ ./flow3 core:setfilepermissions username _www _www
$ sudo dscl . -append /Groups/_www GroupMembership username
</code></pre>

#### On Linux:

<pre><code language="bash">$ ./flow3 core:setfilepermissions username www-data www-data
$ sudo usermod -a -G www-data username 
</code></pre>

### Add flow3.dev in you /etc/hosts

<pre><code language="bash">$ echo "127.0.0.1 flow3.dev" | sudo tee -a /etc/hosts
</code></pre>

### Configure NginX
This configuration is inspired from this [issue ticket](http://forge.typo3.org/issues/8923).

<pre><code language="nginx">server {
    listen          80;
    server_name     flow3.dev;
    root            /var/www/FLOW3-1.1.0/Web;
    autoindex       off;

    access_log      /var/log/nginx/access.log;
    error_log       /var/log/nginx/error.log;
    
    index           index.php index.html;

    location ~ "^/_Resources/Persistent/" {
        access_log off;
        log_not_found off;
        expires max;

        rewrite "(.{40})/.+\.(.+)" /_Resources/Persistent/$1.$2 break;
        rewrite "([a-z0-9]+/(.+/)?[a-f0-9]{40})/.+\.(.+)" /_Resources/Persistent/$1.$2 break;
    }   

    location ~ "^/_Resources/" {
        access_log off;
        log_not_found off;
        expires max;
        break;
    }   

    location / {
        rewrite ".*" /index.php last;
    }
   
    location = /index.php {
        try_files                   $uri $uri/ =404;
        fastcgi_index               index.php;
        fastcgi_split_path_info     ^(.+\.php)(.*)$;
        fastcgi_pass                unix:/var/run/php-fpm.sock;
        fastcgi_param               SCRIPT_FILENAME     $document_root$fastcgi_script_name;
        fastcgi_param               FLOW3_CONTEXT       Development;
        fastcgi_param               FLOW3_REWRITEURLS   0;
        fastcgi_intercept_errors    on; 
        include                     fastcgi_params;
    }

    location ~ /\. { 
        access_log      off;
        log_not_found   off; 
        deny            all;
    }

    location = /404.html {
        access_log  off;
        root        /opt/local/share/nginx/html;
    }
}
</code></pre>

Note that `FLOW3_CONTEXT` should be `Production` and `FLOW3_REWRITEURLS` to `1` in the production envionment.

Finally, restart NginX and open `http://flow3.dev/` in your favorit browser !

Thanks to [Robert](https://twitter.com/robertlemke) and [Chritian](https://twitter.com/daskitsunet) for your presentation. I don't know if I will switch to FLOW3 but [I will dig further](http://flow3.typo3.org/documentation/guide.html) :)
