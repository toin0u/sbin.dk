/*
    Load scripts in parallel but execute in order
    @link http://headjs.com
*/

head.js(
    //{ plugins: "/static/js/plugins.js" },
    { scripts: "/static/js/scripts.js" },
    { twitter: "/static/js/twitter.js" },
    function() {
        head.js(
            // { feed: "http://twitter.com/statuses/user_timeline/toin0u.json?callback=lastTweet&count=5" },
            { feed: "https://api.twitter.com/1/statuses/user_timeline/toin0u.json?callback=lastTweet&count=5" },
            function() {

            }
        );
    }
);

//head.js("//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
//window.jQuery || head.js("/static/js/libs/jquery-1.7.1.min.js");

head.ready(function() {
    //
});