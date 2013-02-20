---
layout: post
change_frequency: weekly
priority: 0.8
published: true
comments: true
date: 2013-02-09 22:18:06
title: Geotools a geo-related PHP 5.3 library
summary: For my own needs I made a geo-related library called Geotools. It's compatible PHP 5.3 and it's build atop Geocoder and Reactphp libraries. Geocoder because I like the project and I made a lot of PRs :) Reactphp because it's also a great library - you should give a look if you never hear about it.
category: php
tags: geotools geocoder reactphp
---

Well, [Geotools](https://github.com/toin0u/Geotools) is yet another project about geocoding tools, kit, library etc... Yes, but if you are a user of [Geocoder](http://geocoder-php.org/) you will appreciate it - I hope :)

I started this, first of all, for *my own needs* and then because I was thinking how I could implement an easy way to batch geocoding and reverse geocondig requests in [serie](/2013/01/14/geocoder-php-library-batch-requests/) and especially in [parallel](/2013/01/28/geocoder-asynchronous-batch-requests-via-reactphp/). Of course, I looked around to see if a geo-related PHP library could be found ([packagist for exemple](https://packagist.org/search/?q=geotools)) but not like I expected :/

So It was a good opportunity to develop Geotools library in php. But I think I will work on it to implement *usefull* features so your **ideas** and **PRs** are really welcome (you can read more about [how to contribute](https://github.com/toin0u/Geotools/blob/master/CONTRIBUTING.md)) !

Features
--------

* **Batch** geocode & reverse geocoding request(s) in **serie** / in **parallel** against one or a **set of providers**.
* Accept **almost** all kind of WGS84 [geographic coordinates](http://en.wikipedia.org/wiki/Geographic_coordinate_conversion) as coordinates.
* **Convert** and **format** decimal degrees coordinates to decimal minutes or degrees minutes seconds coordinates.
* **Convert** decimal degrees coordinates in the [Universal Transverse Mercator](http://en.wikipedia.org/wiki/Universal_Transverse_Mercator_coordinate_system) (UTM) projection.
* Compute the distance in **meter** (by default), **km**  or **mile** between two coordinates using **flat**, **haversine** or **vincenty** algorithms.
* Compute the **initial bearing** from the origin coordinate to the destination coordinate in degrees.
* Compute the **cardinal point** (direction) from the origin coordinate to the destination coordinate.
* Compute the **half-way point** (coordinate) between the origin and the destination coordinates.
* Compute the **destination point** (coordinate) with given bearing in degrees and a distance in meters.
* Encode a coordinate to a **geo hash** string and decode it to a coordinate, read more in [wikipedia](http://en.wikipedia.org/wiki/Geohash) and on [geohash.org](http://geohash.org/).
* A **command-line interface** (CLI) - thanks to the [Symfony Console Component](https://github.com/symfony/Console).
* ... more to come ...

[Please read more at the README](https://github.com/toin0u/Geotools/blob/master/README.md) and give a look at the [Changelog](https://github.com/toin0u/Geotools/blob/master/CHANGELOG.md) :)
