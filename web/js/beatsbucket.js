
var youtubeService = new youtubeService();
youtubeService.init();

function onYouTubeIframeAPIReady() {
    youtubeService.onReady();
}

var beatsbucketPlayer = new player(youtubeService);
var melonService = new melonService(beatsbucketPlayer);



$(function() {
    var currentChartType;
    var defaultLoadCount = 100;

    $("#beatsbucket .player-area .controls p .play").click(function() {
        if (beatsbucketPlayer) {
            beatsbucketPlayer.play();
        } else {
            alert("no ytvideo");
        }
    });

    $("#beatsbucket .player-area .controls p .stop").click(function() {
        beatsbucketPlayer.stop();
    });

    $("#beatsbucket .player-area .controls p .prev").click(function() {
        beatsbucketPlayer.prev();
    });
    $("#beatsbucket .player-area .controls p .next").click(function() {
        beatsbucketPlayer.next();
    });

    $("#beatsbucket .player-area .controls p .add").click(function() {

        //playList = searchedSongs.slice(0);
        var songs = melonService.getSearchedSongs();//searchedSongs.slice(0);
        beatsbucketPlayer.addSongsToPlayList(songs);

        $.each(songs, function(i, songItem) {
            var artist = '';
            $.each(songItem.artists.artist, function(j, artistItem) {
                artist += artistItem.artistName;
                artist += ' ';
            });
            $("#beatsbucket .player-area .playlist").append('<p class="title">' + songItem.songName + ' - ' + artist + "</p>");
        });

    });

    $("#beatsbucket .player-area .controls p .clear").click(function() {
        $("#beatsbucket .player-area .playlist .title").remove();
    });

    $("#beatsbucket .player-area .controls .playlist p").click(function() {
        if (ytplayer) {
            ytplayer.loadPlaylist(ytPlayList);
        } else {
            alert("no ytvideo");
        }
    });

    $("#beatsbucket .contents-area .chart-area #realtime").click(function() {
        currentChartType = 'realtime';
        melonService.getRealtimeChart(currentChartType, 1, defaultLoadCount);
    });

    $("#top_album").click(function() {
        currentChartType = 'topAlbum';
        melonService.getRealtimeChart(currentChartType, 1, defaultLoadCount);
    });

    $("#today_top_song").click(function() {
        currentChartType = 'todayTopSong';
        melonService.getRealtimeChart(currentChartType, 1, defaultLoadCount);
    });

    $("#top_genres").click(function() {
        currentChartType = 'topGenres';
        melonService.getRealtimeChart(currentChartType, 1, defaultLoadCount);
    });

    $("#new_song").click(function() {
        currentChartType = 'newSong';
        melonService.getRealtimeChart(currentChartType, 1, defaultLoadCount);
    });

    $("#new_album").click(function() {
        currentChartType = 'newAlbum';
        melonService.getRealtimeChart(currentChartType, 1, defaultLoadCount);
    });
});

$("#album_image").css({
    border: '2px solid black'
})



