---
layout: post
change_frequency: weekly
priority: 0.8
published: true
comments: true
date: 2013-09-23 20:12:39
title: Use Geocoder with Bernard
summary: Geocoding is a slow process, you know that, and to avoid it we can either batch requests or use a cache layer (if possible). But what to do if you need to geocode or reverse geocode and persist results ? Would you let your users wait ? Bernard to the rescue !
category: php
tags: geocoder bernard queue
---

![Bernard](http://i.imgur.com/QV6OWkU.png)

Let's [geocode](http://geocoder-php.org) an **IPv4**, a real **address** and **foobar** via the `ChainProvider` with
`FreeGeoIpProvider` and `GoogleMapsProvider` with the `CurlHttpAdapter` using the `GeoJsonDumper` dumper.

Then we need to make the [Bernard](http://bernardphp.com/) `Client` with the `PredisDriver` because we will use Redis
as a persistent engine. Our geocoding **messages** are quite simple objects so we will use the `NaiveSerializer`.
Then configurations change if it's a **producer** or a **consumer**. We will look closer later.

### Let's get started

Ensure Redis is listening on `127.0.0.1:6379`.

### Installation

Let's install needed dependencies:
{% highlight json %}
{
    "require": {
        "willdurand/geocoder" : "~2.2",
        "predis/predis"       : "~0.8",
        "bernard/bernard"     : "~0.10"
    }
}
{% endhighlight %}


### The Producer

The **producer** will **produce** a `DefaultMessage` which will be serialized by our `NaiveSerializer`. We need to
provide a **name** and an associative **array** as parameter.

{% highlight php %}
<?php

require 'vendor/autoload.php';

use Predis\Client;
use Bernard\Driver\PredisDriver;
use Bernard\Message;
use Bernard\Middleware\MiddlewareBuilder;
use Bernard\Producer;
use Bernard\QueueFactory\PersistentFactory;
use Bernard\Serializer\NaiveSerializer;

$client = new Client(null, array(
    'prefix' => 'bernard:',
));
$queues   = new PersistentFactory(new PredisDriver($client), new NaiveSerializer);
$producer = new Producer($queues, new MiddlewareBuilder);

$producer->produce(new Message\DefaultMessage('Geocode', array(
    'address' => '88.188.221.14',
)));
$producer->produce(new Message\DefaultMessage('Geocode', array(
    'address' => '10 rue Gambetta, Paris, France',
)));
$producer->produce(new Message\DefaultMessage('Geocode', array(
    'address' => 'foobar',
)));
{% endhighlight %}

Let's name this file `producer.php` and execute it only once. We will set 3 messages in the queue named **geocode**.

### The Consumer

The **consumer** is a long running process which will poll the `Queue` for new messages and route them using
`SimpleRouter` to the right `Receiver`. We will also add the middleware `ErrorLogMiddleware` by the `ErrorLogFactory`
to handle errors. In our example the consumer will only run 5 seconds.

{% highlight php %}
<?php

require 'vendor/autoload.php';

use Predis\Client;
use Bernard\Driver\PredisDriver;
use Bernard\Consumer;
use Bernard\Message\DefaultMessage;
use Bernard\Middleware;
use Bernard\QueueFactory\PersistentFactory;
use Bernard\Router\SimpleRouter;
use Bernard\Serializer\NaiveSerializer;

$client = new Client(null, array(
    'prefix' => 'bernard:',
));
$queues = new PersistentFactory(new PredisDriver($client), new NaiveSerializer);

$middleware = new Middleware\MiddlewareBuilder;
$middleware->push(new Middleware\ErrorLogFactory);

$receiver = new SimpleRouter;
$receiver->add('Geocode', new GeocodeReceiver);

$consumer = new Consumer($receiver, $middleware);
$consumer->consume($queues->create('geocode'), array(
    'max-runtime' => 5,
));

// The receiver class is in the consumer file just to make the example simple
class GeocodeReceiver
{
    public function geocode(DefaultMessage $message)
    {
        $geocoder = new \Geocoder\Geocoder;
        $adapter  = new \Geocoder\HttpAdapter\CurlHttpAdapter;
        $dumper   = new \Geocoder\Dumper\GeoJsonDumper;
        $chain    = new \Geocoder\Provider\ChainProvider(array(
            new \Geocoder\Provider\FreeGeoIpProvider($adapter),
            new \Geocoder\Provider\GoogleMapsProvider($adapter, 'fr_FR', 'France', true),
        ));
        $geocoder->registerProvider($chain);

        try {
            $geocoded = $geocoder->geocode($message->address);
            echo sprintf("%s\n\n", $dumper->dump($geocoded));
            // you can persist here for example ...
        } catch (Exception $e) {
            throw $e;
        }
    }
}
{% endhighlight %}

Name this file `consumer.php` and execute it. After 5 seconds, you will be get an output like this:

{% highlight text %}
{"type":"Feature","geometry":{"type":"Point","coordinates":[2.35,48.86]},"properties":{"zipcode":"","city":"","region":"","regionCode":"","country":"France","countryCode":"FR"}}

{"type":"Feature","geometry":{"type":"Point","coordinates":[2.3072665,48.8234065]},"properties":{"streetNumber":"10","streetName":"Rue Gambetta","zipcode":"92240","city":"Paris","cityDistrict":"14E Arrondissement","county":"Hauts-De-Seine","countyCode":"92","region":"\u00cele-De-France","regionCode":"IDF","country":"France","countryCode":"FR"},"bounds":{"south":48.8234065,"west":2.3072665,"north":48.8234065,"east":2.3072665}}

[Bernard] Received exception "Geocoder\Exception\ChainNoResultException" with "No provider could provide the address "foobar"" while processing "Geocode".
{% endhighlight %}

### What just happened ?

1. Our producer produced 3 messages immediatly to the queue. It can be compared as 3 http requests.
2. Our consumer consumed the queue and routed each message to the right receiver with its argument:
    1. The **IPv4** is geocoded by the `FreeGeoIpProvider` provider.
    2. The **address** is geocoded by the `GoogleMapsProvider` because the `FreeGeoIpProvider` does not support street
    addresses.
    3. The **foobar** address which is obviously a wrong address cannot be geocoded so the `ChainProvider` throws a
    `ChainNoResultException` which is catched by Bernard's middleware called `ErrorLogMiddleware`.

But the most important is those messages are processed **asynchronously**. And of course we need to avoid outputs
because you need to see a receiver like a **MVC controller**.

### What now ?

Read the [doc](http://bernardphp.com/en/latest/docs/index.html) and test it :) -
[Bernard](https://github.com/bernardphp) has [Silex](https://github.com/bernardphp/silex)
and [Laravel](https://github.com/bernardphp/laravel) frameworks integration and is under heavy development !

And follow [@henrikbjorn](https://twitter.com/henrikbjorn) or [@bernardphp](https://twitter.com/bernardphp) to get
updated :)
