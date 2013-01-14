[![project status](http://stillmaintained.com/toin0u/sbin.dk.png)](http://stillmaintained.com/toin0u/sbin.dk)

Requirements
------------
1. [Jekyll](https://github.com/mojombo/jekyll/wiki/Install)
    * RDiscount
    * Pygments
2. [Rake](http://rake.rubyforge.org/)
3. [NodeJS](http://www.nodejs.org/#download)
    * [LESS](http://lesscss.org/)


Why to fork?
------------
* Easy to customize, only `_config.yml`
* Very simple layout, easy to adapt ;)
* [Generate sitemap.xml which is customizable in each post](http://www.kinnetica.com)
* [Compress CSS files](https://gist.github.com/2391969)
* [Head.js](http://headjs.com) to load javscript files
* Show the last tweet
* Build with Microformats
* Possible to show posts' summary in front page
* Disqus in posts and track comments with Google Analytics
* Title, summary, category and tags update meta tags
* Rakefile to automate tasks


Installation
------------
1. Fork this `https://github.com/toin0u/sbin.dk`
2. Clone it
3. Add a `deploy` remote to you VPS for instance ([deployment](https://github.com/mojombo/jekyll/wiki/Deployment))


Configuration
-------------
1. Change `_config.yml` with your parameters
2. Change line 58 in `Rakefile` if you don't use [Sublime Text 2](http://www.sublimetext.com/), I use [this](http://www.sublimetext.com/docs/2/osx_command_line.html).


Usage
-----
1. See available commands / tasks, `rake -T` or just `rake`
2. Make a new post, `rake post "Hello world!"`
    * change `change_frequency` and `priority` (optional)
    * change the title (optional)
    * add the summary (optional)
    * add **one** `category` (optional)
    * add `tags` separated by a space (optional)
3. Launch local server, `rake server`
4. Browse your blog at `http://localhost:4000/`


Release
-------
Let's push changes to your repository **and** your VPS.

1. `git commit -a -m "Added: my first post"`
2. `rake release`