+++
author = ""
comments = true
date = "2016-02-09T21:17:30+01:00"
draft = false
image = ""
menu = ""
share = true
slug = "microservices-with-gizmo"
tags = ["microservice", "gizmo", "golang", "geocoder"]
title = "Microservices with Gizmo"
+++

I was pretty excited when I saw that the [New York Times Tech](https://github.com/NYTimes) team
[open-sourced](http://open.blogs.nytimes.com/2015/12/17/introducing-gizmo/) their Microservice Toolkit
named [Gizmo](https://github.com/nytimes/gizmo). Its goal is to make microservice creation very simple
by giving us flexible packages ready to be used. Let's make a simple geocoder microservice
with Gizmo. <!--more-->

![Gizmo](https://i.imgur.com/qDyGTh3.png)

### Why Gizmo?

Gizmo is not the only microservice toolkit out there in golang. The most known might be
[Go Kit](http://gokit.io/) made by [Peter Bourgon](http://peter.bourgon.org/) - I advice you watch its
talk at [dotGo 2015](http://www.thedotpost.com/2015/11/peter-bourgon-a-case-for-microservices)
if you haven't already! I've played a bit with Go Kit but the pragmatism of Gizmo by solving
[Go Kit's non-goals](https://github.com/go-kit/kit#non-goals) made me love it :) You'll see by yourself
how Gizmo will make your life simple!

Our geocoder microservice will only solve one problem which is to geocode a given address via a simple
GET request using Google Maps. Of course, we could make this without using any toolkit but with Gizmo
you'll get:

* standardized configuration and logging
* health check endpoints with configurable strategies
* configuration for managing pprof endpoints and log levels
* structured logging containing basic request information
* useful metrics for endpoints
* graceful shutdowns
* basic interfaces to define our expectations and vocabulary

### Concept
To create our service, we will need 3 files as you can bee below:
```
.
├── config.json
├── main.go
└── service
    └── service.go
```

* The `config.json` will have server's and service's configurations. We will use Gizmo's `config` package
which is very handy to unmarshal the JSON into the service's Config struct using composition.
* The `service.go` will have 2 structs `Config` and `GeocoderService`. It will implement 3 methods and will
be able to be registered to the server:
    * `Prefix() string`
    * `Middleware(http.Handler) http.Handler`
    * `Endpoints() map[string]map[string]http.HandlerFunc`
* The `main.go` will load `config.json`, instantiate our geocoder service, register it and finally start
the server from the `server` package.

### Geocoder microservice

You can specify the server type which is not mandatory if you want to use the `SimpleServer`. The way to
check if the service is healthy will also use the simple strategy which will give us the possibility to
choose the path. The log level for logrus can be "debug",
"warn" or "fatal". If not set it will be the "info" level.
We have 3 optional parameters which are the port number, the log of the service and the access log to the
service. If the port is not specified it will be chosen randomly. If logs are not defined stdout will be used.
`UseSsl`, `Locale` and `Region` are related to the service itself and will be used to configure the service
while creating it.

<pre><code language="json">{
    "ServerType": "simple",
    "HealthCheckType": "simple",
    "HealthCheckPath": "/health.txt",
    "LogLevel": "debug",
    "EnablePProf": true,

    "HTTPPort": 8081,
    "Log": "/tmp/geocoder-service/app.log",
    "HTTPAccessLog": "/tmp/geocoder-service/access.log",

    "UseSsl": true,
    "Locale": "fr-FR",
    "Region": "France"
}
</code></pre>

Our service package is able to create the `GeocoderService` which has the `geocoder.Google` from my simple
`github.com/toin0u/geocoder-go` package. It will be instantiated using the configurations loaded from the
`config.json`. The `Prefix() string` method is very useful. It "mounts" the service's endpoints to `/geocoder`
(don't forget the slash!). The `Middleware(h http.Handler) http.Handler` does nothing in our case because
our simple geocoder service will output the longitude/latitude. It could be used to gzip the response, auth,
log, metrics whatever. The `Endpoints() map[string]map[string]http.HandlerFunc` presents the available
endpoints of the service and methods which are associated to a handler. We have a simple endpoint
`/google/{address}` which only allow `GET` requests.
It will be handled by `geocode(w http.ResponseWriter, r *http.Request)` which will retrieve the `address`
value from the endpoint using `github.com/gorilla/mux`, format it to an `geocoder.Address` struct,
geocode it and then output it. Note that we don't handle geocoding error and we just output a string for
the sake of simplicity.

<pre><code language="go">package service

import (
	"fmt"
	"net/http"

	"github.com/NYTimes/gizmo/config"
	"github.com/gorilla/mux"
	"github.com/toin0u/geocoder-go"
)

type Config struct {
	*config.Server

	useSsl         bool
	locale, region string
}

type GeocoderService struct {
	g geocoder.Google
}

func NewGeocoderService(cfg *Config) *GeocoderService {
	return &GeocoderService{
		geocoder.Google{
			UseSsl: cfg.useSsl,
			Locale: cfg.locale,
			Region: cfg.region,
		},
	}
}

func (g *GeocoderService) Prefix() string {
	return "/geocoder"
}

func (g *GeocoderService) Middleware(h http.Handler) http.Handler {
	return h
}

func (g *GeocoderService) Endpoints() map[string]map[string]http.HandlerFunc {
	return map[string]map[string]http.HandlerFunc{
		"/google/{address}": map[string]http.HandlerFunc{
			"GET": g.geocode,
		},
	}
}

func (g *GeocoderService) geocode(w http.ResponseWriter, r *http.Request) {
	address := mux.Vars(r)["address"]
	coordinate, _ := g.g.Geocode(geocoder.Address{address})
	fmt.Fprintf(w, "Lat: %f, Lng: %f", coordinate.Lat, coordinate.Lng)
}
</code></pre>

The main package reads the configuration file using Gizmo's `Config` package's `LoadJSONFile` method (it has other
nice methods to get configurations from the environment for example).
Basically, we create the server which will be the `SimpleServer`, register it and run it! That's all :)

<pre><code language="golang">package main

import (
	"github.com/toin0u/gizmo/service"

	"github.com/NYTimes/gizmo/config"
	"github.com/NYTimes/gizmo/server"
)

func main() {
	var cfg *service.Config
	config.LoadJSONFile("./config.json", &cfg)

	server.Init("geocoder-service", cfg.Server)

	err := server.Register(service.NewGeocoderService(cfg))
	if err != nil {
		server.Log.Fatal("Unable to register the service: ", err)
	}

	err = server.Run()
	if err != nil {
		server.Log.Fatal("Server encountered a fatal error: ", err)
	}
}
</code></pre>

Finally let's run the service!

<pre><code language="bash">$ go run main.go
</code></pre>

It's now running on port `8081`. Let's make a request.

<pre><code language="bash">$ curl http://localhost:8081/geocoder/google/paris
</code></pre>

You'll get `Lat: 48.856614, Lng: 2.352222` as you've been expecting! Want to check if the service if healthy?

<pre><code language="bash">$ curl http://localhost:8081/health.txt
</code></pre>

You'll get something like `ok-geocoder-service--e5ae04a3-91a5-4b96-4b38-242df49554f1` if the service in
available. Want to profile the service? Open your browser and open those URLs!

* http://localhost:8081/debug/pprof/
* http://localhost:8081/debug/pprof/block
* http://localhost:8081/debug/pprof/goroutine
* http://localhost:8081/debug/pprof/goroutine?debug=1
* http://localhost:8081/debug/pprof/goroutine?debug=2
* http://localhost:8081/debug/pprof/heap
* http://localhost:8081/debug/pprof/threadcreate

### Why is Gizmo awesome?

With only 3 files (it could be only one if the service is very simple and if you want to rely on the default
configuration file `/opt/nyt/etc/conf.json`) and a few lines of codes - we could make a fully working microservice!
It has log, health check, profiling, server, config... We only need to focus on the microservice itself.
It's really nice.

Gizmo offers much more to offer like the RPC server, Pub/Sub, more complex service interface etc... It also has
very nice [examples](https://github.com/NYTimes/gizmo/tree/master/examples) which inspired this blog post.
[JP Robinson](http://jprbnsn.com/), principal engineer at the New York Times, also started to write very complete
wiki posts! The first one is about a
[JSONService using MySQL](https://github.com/NYTimes/gizmo/wiki/HOW-TO-GIZMO:-create-a-JSONService-using-MySQL)
explained step-by-step!

Obviously our geocoder service is very basic and it has room for improvements but I hope it showed you how easy
and fast you will be able to create your own microservices :) Don't hesitate to join the
[Gopher Slack community](https://blog.gopheracademy.com/gophers-slack-community/) under the **#gizmo** channel if you
like it!
