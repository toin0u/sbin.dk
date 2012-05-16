/*
    Diverse scripts
*/

// track disqus comments via google analytics
function disqus_config() {
    this.callbacks.onNewComment = [function() {
        _gaq.push(['_trackEvent', 'Comment']);
    }];
}


