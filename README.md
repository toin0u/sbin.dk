Requirements
------------
1. [Jekyll](https://github.com/mojombo/jekyll/wiki/Install)
    * RDiscount
    * Pygments
2. [Rake](http://rake.rubyforge.org/)
3. [NodeJS](http://www.nodejs.org/#download)
    * [LESS](http://lesscss.org/)


Installation
------------
1. Fork this `https://github.com/toin0u/sbin.dk`
2. Clone it
3. Add a `deploy` remote to you VPS for instance


Configuration
-------------
1. Change `_config.yml` with parameters
2. Change line 57 in `Rakefile` if you don't use [Sublime Text 2](http://www.sublimetext.com/)


Usage
-----
1. See available commands, `rake -T`
2. Make a new post, `rake post "Hello world!"`
    * change `change_frequency` and `priority` if needed
    * add **one** `category` if needed
    * add `tags` separated by a space if needed
3. Launch local server, `rake server`
4. Browse your blog at `http://localhost:4000/`


Release
-------
Let's push changes to your repository **and** your VPS.

1. `git add .`
2. `git commit -m "Added: my first post"`
3. `rake release`