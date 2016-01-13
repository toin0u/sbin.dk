+++
author = ""
comments = true
date = "2013-01-28"
draft = false
image = ""
menu = ""
share = true
slug = "geocoder-asynchronous-batch-requests-via-reactphp"
tags = ["geocoder", "reactphp"]
title = "Geocoder asynchronous batch requests via Reactphp"
aliases = [
    "/2013/01/28/geocoder-asynchronous-batch-requests-via-reactphp/"
]
+++

As said we will use [Reactphp](http://reactphp.org/) especially the [Async](https://github.com/reactphp/async) module. We will take the exemple from the post [Geocoder php library simple batch requests](/2013/01/14/geocoder-php-library-batch-requests/) and adapt it to make it asynchronous. The implementation will be very simple, it's just to show how to use [React](https://github.com/reactphp) with [Geocoder](http://geocoder-php.org/) in a very **basic** way. <!--more-->

We will use [composer](http://getcomposer.org/) of course.

The **composer.json** file:

<pre><code language="json">{
    "require": {
        "willdurand/geocoder": "*",
        "react/react": "0.2.*",
        "react/async": "dev-master"
    }
}
</code></pre>

And run these two commands to install it:

<pre><code language="bash">$ wget http://getcomposer.org/composer.phar
$ php composer.phar install
</code></pre>

Create a php file, replace `API_KEY` by yours and execute it:

<pre><code class="language-php">namespace toin0u;

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
use React\Async\Util as ReactAsync;

$geocoder = new Geocoder();
$adapter  = new CurlHttpAdapter();

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
    $tasks[$provider->getName()] = function ($callback) use ($geocoder, $provider) {
        try {
            $callback($geocoder->using($provider->getName())->geocode('10 rue Gambetta, Paris, France'));
        } catch (\Exception $e) {
            $callback(array());
        }
    };
}

$callback = function (array $providerResults) {
    $dumper = new WktDumper();
    foreach ($providerResults as $providerName => $providerResult) {
        if ($providerResult) {
            printf("%s: %s\n", $providerName, $dumper->dump($providerResult));
        } else {
            printf("%s: no result\n", $providerName);
        }
    }
};

ReactAsync::parallel($tasks, $callback);
</code></pre>

You should get sommething like:

<pre><code>oio_rest: no result
google_maps: POINT(2.307266 48.823405)
bing_maps: POINT(2.307266 48.823405)
openstreetmaps: POINT(2.398914 48.865393)
cloudmade: POINT(2.534410 48.828790)
map_quest: POINT(2.398502 48.865096)
yahoo: POINT(2.389020 48.863281)
yandex: POINT(2.225684 48.874010)
geocoder_ca: no result
geocoder_us: no result
</code></pre>

**NB**: if a provider throws an exception, we'll catch it and override with an empty array. In that way, we don't need to catch exceptions in `parallel` method, `$errback` is so `null`.

As **expected** we get results faster, around **30-40%** :) Why not to use it ?
