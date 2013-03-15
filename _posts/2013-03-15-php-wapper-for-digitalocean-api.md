---
layout: post
change_frequency: weekly
priority: 0.8
published: true
comments: true
date: 2013-03-15 14:11:59
title: PHP wapper for DigitalOcean API
summary: If you use DigitalOcean, PHP and Composer - you should give a look to this little library that I just open-sourced. I made for my own need. Do not hesitate to PR, refactor, typo, CS ... :)
category: php
tags: api digitalocean
redirects:
- /DigitalOcean
---

[DigitalOcean](https://www.digitalocean.com) is built for Developers, helps to get things done faster and to deploy an SSD cloud server in less than 55 seconds with a dedicated IP and root access. [Read more](https://www.digitalocean.com/features).

2 PHP libraries exists which are [Dropper](https://github.com/StylusEater/Dropper) and [DigitalOcean-PHP-Class](https://github.com/tuefekci/DigitalOcean-PHP-Class) but they are not in packagist :S

For my **own needs** I made a library which can be installed via [Composer](https://getcomposer.org/). You can find it [here](https://packagist.org/packages/toin0u/digitalocean).

The first release, **0.1.0**, has only the basic implementation. I planned to implement a console so it will be easy to interact with DigitalOcean :)

If you need a wapper in other languages, please look [here](https://www.digitalocean.com/community/questions/community-built-tools) :)
