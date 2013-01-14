---
layout: post
change_frequency: weekly
priority: 0.8
published: true
comments: true
date: 2013-01-14 13:24:17
title: Geocoder PHP library simple batch requests
summary: If you need a geocoder library in PHP, you should really give a try to William Durand's library - The almost missing Geocoder PHP 5.3 library ! It's a quick post which will show you how to run a query againts a list of given providers.
category: php
tags: php geocoder
---

This demo will run the `CurlHttpAdapter` against `10 providers` which can geocode this address `10 rue Gambetta, Paris, France`. We will then transform, if available, result objects in standard format via the `WktDumper`.

Let's install [Geocoder](http://geocoder-php.org/) through [Composer](http://getcomposer.org/). To do so, just create a **composer.json** file for your project.

{% highlight json %}
{
    "require": {
        "willdurand/geocoder": "*"
    }
}
{% endhighlight %}

And run these two commands to install it:

{% highlight bash %}
$ wget http://getcomposer.org/composer.phar
$ php composer.phar install
{% endhighlight %}

Create a php file, replace `API_KEY` by yours and execute it:

{% highlight php %}
<?php

namespace toin0u;

require 'vendor/autoload.php';

use Geocoder\Geocoder;
use Geocoder\HttpAdapter\CurlHttpAdapter;
use Geocoder\Provider\OIORestProvider;
use Geocoder\Provider\GoogleMapsProvider;
use Geocoder\Provider\BingMapsProvider;
use Geocoder\Provider\OpenStreetMapsProvider;
use Geocoder\Provider\CloudMadeProvider;
use Geocoder\Provider\MapQuestProvider;
use Geocoder\Provider\YahooProvider;
use Geocoder\Provider\YandexProvider;
use Geocoder\Provider\GeocoderCaProvider;
use Geocoder\Provider\GeocoderUsProvider;
use Geocoder\Dumper\WktDumper;

$geocoder = new Geocoder();
$adapter = new CurlHttpAdapter();

$providers = array(
    new OIORestProvider($adapter),
    new GoogleMapsProvider($adapter),
    new BingMapsProvider($adapter, 'API_KEY'),
    new OpenStreetMapsProvider($adapter),
    new CloudMadeProvider($adapter, 'API_KEY'),
    new MapQuestProvider($adapter),
    new YahooProvider($adapter, 'API_KEY'),
    new YandexProvider($adapter),
    new GeocoderCaProvider($adapter),
    new GeocoderUsProvider($adapter),
);

$geocoder->registerProviders($providers);
foreach ($geocoder->getProviders() as $provider) {
    $geocode = $geocoder->using($provider->getName());
    try {
        $providerResults[$provider->getName()] = $geocode->geocode('10 rue Gambetta, Paris, France');
    } catch (\Exception $e) {
        $providerResults[$provider->getName()] = array();
    }
}

$dumper = new WktDumper();
foreach ($providerResults as $providerName => $providerResult) {
    if ($providerResult) {
        printf("%s: %s\n", $providerName, $dumper->dump($providerResult));
    } else {
        printf("%s: no result\n", $providerName);
    }
}
{% endhighlight %}

You should get sommething like:

{% highlight bash %}
oio_rest: no result
google_maps: POINT(2.307266 48.823405)
bing_maps: POINT(2.307266 48.823405)
openstreetmaps: POINT(2.400725 48.867465)
cloudmade: POINT(2.534410 48.828790)
map_quest: POINT(2.398502 48.865096)
yahoo: POINT(2.389020 48.863281)
yandex: POINT(2.225684 48.874010)
geocoder_ca: no result
geocoder_us: no result
{% endhighlight %}

As I said, it's very simple.

Please do not use this piece of code in production... You will rather use `ChainProvider` which is a special provider that takes a list of providers and iterates over this list to get information. It returns the first result object and stops.

The aim was to show how easy is to use the Geocoder API. Thanks to [William](http://williamdurand.fr/) who made geocoding manipulations easy in PHP !