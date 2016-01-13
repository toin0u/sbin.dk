+++
author = ""
comments = true
date = "2013-02-09"
draft = false
image = ""
menu = ""
share = true
slug = "geotools-a-geo-related-php-53-library"
tags = ["geotools", "geocoder", "reactphp"]
title = "Geotools a geo-related PHP 5.3 library"
aliases = [
    "/2013/02/09/geotools-a-geo-related-php-53-library/"
]
+++

**Geotools** supports now **Redis**, **MongoDB** and **Memcached** as cache engine. [Read more in github](https://github.com/toin0u/Geotools)

--

Well, [Geotools](http://geotools-php.org/) is yet another project about geocoding tools, kit, library etc... Yes, but if you are a user of [Geocoder](http://geocoder-php.org/) you will appreciate it - I hope :)

I started this, first of all, for *my own needs* and then because I was thinking how I could implement an easy way to batch geocoding and reverse geocondig requests in [serie](/2013/01/14/geocoder-php-library-batch-requests/) and especially in [parallel](/2013/01/28/geocoder-asynchronous-batch-requests-via-reactphp/). Of course, I looked around to see if a geo-related PHP library could be found ([packagist for exemple](https://packagist.org/search/?q=geotools)) but not like I expected :/

So It was a good opportunity to develop Geotools library in php. But I think I will work on it to implement *usefull* features so your **ideas** and **PRs** are really welcome (you can read more about [how to contribute](https://github.com/toin0u/Geotools/blob/master/CONTRIBUTING.md)) !

Features
--------

* **Batch** geocode & reverse geocoding request(s) in **serie** / in **parallel** against one or a
**set of providers**.
* Compute geocode & reverse geocoding in the **command-line interface** (CLI) + dumpers and formatters.
* Accept **almost** all kind of WGS84
[geographic coordinates](http://en.wikipedia.org/wiki/Geographic_coordinate_conversion) as coordinates.
* Support **23 different ellipsoids** and it's easy to provide a new one if needed.
* **Convert** and **format** decimal degrees coordinates to decimal minutes or degrees minutes seconds coordinates.
* **Convert** decimal degrees coordinates in the
[Universal Transverse Mercator](http://en.wikipedia.org/wiki/Universal_Transverse_Mercator_coordinate_system)
(UTM) projection.
* Compute the distance in **meter** (by default), **km**  or **mile** between two coordinates using **flat**,
**haversine** or **vincenty** algorithms.
* Compute the initial and final **bearing** from the origin coordinate to the destination coordinate in degrees.
* Compute the initial and final **cardinal point** (direction) from the origin coordinate to the destination
coordinate, read more in [wikipedia](http://en.wikipedia.org/wiki/Cardinal_direction).
* Compute the **half-way point** (coordinate) between the origin and the destination coordinates.
* Compute the **destination point** (coordinate) with given bearing in degrees and a distance in meters.
* Encode a coordinate to a **geo hash** string and decode it to a coordinate, read more in
[wikipedia](http://en.wikipedia.org/wiki/Geohash) and on [geohash.org](http://geohash.org/).
* A **command-line interface** (CLI) for **Distance**, **Point**, **Geohash** and **Convert** classes.
* ... more to come ...

[Please read more at the README](https://github.com/toin0u/Geotools/blob/master/README.md) and give a look at the [Changelog](https://github.com/toin0u/Geotools/blob/master/CHANGELOG.md) :)
