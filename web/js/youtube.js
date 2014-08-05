
var youtubeService = function() {
    var ytplayer;
    this.bStopped = false;

    this.init = function() {
        var tag = document.createElement('script');
        tag.src = "//www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    };

    this.onReady = function() {
        ytplayer = new YT.Player('ytplayer', {
            height: '240',
            width: '320',
            videoId: 'Wa5B22KAkEk',
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    };

    function onPlayerReady(event) {
        event.target.setPlaybackQuality("small");
        event.target.setVolume(50);
    };

    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.ENDED && !stopPlayer) {
            currentPlayingIndex++;
            setTimeout(playVideo, 500);
        }
    };

    var getytVideoId = function(query_p, callback_p) {
        $.ajax({
            type : "GET",
            url : "http://gdata.youtube.com/feeds/api/videos?",
            dataType : "jsonp",
            data : {
                q : query_p,
                alt : 'json',
                'start-index' : 1,
                'max-result' : 1,
                v : 2
            },
            success : function(response) {
                var id = response.feed.entry[0].media$group.yt$videoid.$t;
                if (callback_p)
                    callback_p(id);
                else
                    return id;
            },
            erroe : function() {
                alert("Can't retrieve video id from youtube.");
            }
        });
    };

    var loadVideoById = function(query_p) {
        ytplayer && ytplayer.loadVideoById(query_p);
    };

    this.stopVideo = function() {
        ytplayer.stopVideo();
    };

    this.clearVideo = function() {
        ytplayer && ytplayer.clearVideo();
    };

    this.playVideo = function(query_p) {
        getytVideoId(query_p, loadVideoById);
    };
};
