---
layout: post
change_frequency: weekly
priority: 0.8
published: true
comments: true
date: 2012-05-13 00:00:00
title: Hello world!
summary: 
category: diverse
tags: 
---

I took time this week-end to set up [Jekyll][] to blog like an hacker :) I tried [Octopress][] on [Heroku][]. It works good but it's "less" flexible than the original one. It was a good way to use [Ruby][] again.

It's a very simple template but I will improved and work on it when I'll get time. I think it's good enough for the moment anyway. This blog will be especially a developer blog with a lot of codes hopefully. Don't hesitate to send me pull requests (PR) to correct and/or to improve posts. They are of course welcome.

{% highlight php %}
<?php
    echo "Hello world!";
{% endhighlight %}

You can find the entire source code of [sbin.dk][] in [Github][]. A lot of improvements will come later like [Twitter][] feed, better standards with [Media Queries][], [Microdata][], [WAI-ARIA][] and [CORS]... Maybe a bit with the responsive design too. And... I'm very excited to blog again!

[Jekyll]: http://jekyllrb.com/
[Octopress]: http://octopress.org/
[Heroku]: http://www.heroku.com/
[Ruby]: http://www.ruby-lang.org/
[sbin.dk]: {{ site.url }}
[Github]: {{ site.githubsource }}
[Twitter]: {{ site.twitter }}
[Media Queries]: http://www.w3.org/TR/css3-mediaqueries/
[Microdata]: http://www.w3.org/TR/html5/microdata.html
[WAI-ARIA]: http://www.w3.org/WAI/intro/aria.php
[CORS]: http://www.w3.org/TR/cors/