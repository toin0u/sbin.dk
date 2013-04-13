---
layout: post
change_frequency: weekly
priority: 0.8
published: true
comments: true
date: 2013-04-13 17:10:57
title: Trustpilot wrapper php library
summary: Trustpilot is an open, community-based platform for sharing real reviews of shopping experiences online. They provide an JSON feed to customize and to integrate into your site without using their TrustBox which use an iframe...
category: php
tags: feed trustpilot
redirects:
- Trustpilot
---

Do you know [Trustpilot](http://www.trustpilot.com/) ? It's a growing company which won the [Danish Startup Awards 2013](http://tnw-startup-awards-europe.pressdoc.com/36026-tnw-danish-startup-awards-here-are-the-winners).

This PHP5+ library is a **wrapper** which helps you to interact with the [Trustpilot Developer Feed](http://trustpilot.github.io/developers/).

The point of this library is:

* to avoid TrustBox which is not good for you **SEO**
* to provide a **fluent API** (avoid stdClass)
* to implement an easy **cache** layer

Basically, [Trustpilot](http://www.trustpilot.com/) **updates** review feeds about every **5 hours** (information sent by their support) and **hosts** them at [Amazon S3](http://aws.amazon.com/). There is no limit in downloading them but it's of course better to make a cache for user experience.

I use it to make a **backend overview of all our sites** because [Trustpilot](http://www.trustpilot.com/)'s backend doesn't have that possibility. And it looks like that an (RESTful?) API is **not planned** according to their support. So at the moment, it's not possible to fetch **statistics** and the feed provides only the last **10** reviews...

[You can read more about this library on github](https://github.com/toin0u/Trustpilot).
