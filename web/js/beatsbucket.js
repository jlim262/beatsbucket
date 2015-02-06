
var youtubeService = new youtubeService();
youtubeService.init();

function onYouTubeIframeAPIReady() {
    youtubeService.onReady();
}

//function onPlayerStateChange(event) {
//    youtubeService.
//}

var beatsbucketPlayer = new player(youtubeService);
var melonService = new melonService(beatsbucketPlayer);



$(function() {
    var currentChartType;
    var defaultLoadCount = 100;

    //$("#beatsbucket .player-area .playlist").mousedown(function(e) {

        //alert(e.which);
    //});

    $("#beatsbucket .player-area .player_controls .btn_play").click(function() {
        if (beatsbucketPlayer) {
            beatsbucketPlayer.play();
        } else {
            alert("no ytvideo");
        }
    });

    $("#beatsbucket .player-area .player_controls .btn_stop").click(function() {
        beatsbucketPlayer.stop();
    });

    $("#beatsbucket .player-area .player_controls .btn_prev").click(function() {
        beatsbucketPlayer.prev();
    });
    $("#beatsbucket .player-area .player_controls .btn_next").click(function() {
        beatsbucketPlayer.next();
    });

    $("#beatsbucket .player-area .player_controls .btn_repeat").click(function() {
        beatsbucketPlayer.repeat();
        if(beatsbucketPlayer.getRepeatState() == "NONE") {
            $("#beatsbucket .player-area .player_controls .btn_repeat").css('color', 'gray');
            $("#beatsbucket .player-area .player_controls .btn_repeat").hover(function() {
                $(this).css('color', 'darkgray')
            }, function() {
                $(this).css('color', 'gray')
            });
        } else if(beatsbucketPlayer.getRepeatState() == "ONE") {
            $("#beatsbucket .player-area .player_controls .btn_repeat").css('color', 'blue');
            $("#beatsbucket .player-area .player_controls .btn_repeat").hover(function() {
                $(this).css('color', 'darkgray')
            }, function() {
                $(this).css('color', 'blue')
            });
        } else if(beatsbucketPlayer.getRepeatState() == "ALL") {
            $("#beatsbucket .player-area .player_controls .btn_repeat").css('color', 'red');
            $("#beatsbucket .player-area .player_controls .btn_repeat").hover(function() {
                $(this).css('color', 'darkgray')
            }, function() {
                $(this).css('color', 'red')
            });
        }
    });
    $("#beatsbucket .player-area .player_controls .btn_shuffle").click(function() {
        beatsbucketPlayer.shuffle();
        if(beatsbucketPlayer.isShuffled()) {
            $("#beatsbucket .player-area .player_controls .btn_shuffle").css('color', 'red');
            $("#beatsbucket .player-area .player_controls .btn_shuffle").hover(function() {
                $(this).css('color', 'darkgray')
            }, function() {
                $(this).css('color', 'red')
            });
        } else {
            $("#beatsbucket .player-area .player_controls .btn_shuffle").css('color', 'gray');
            $("#beatsbucket .player-area .player_controls .btn_shuffle").hover(function() {
                $(this).css('color', 'darkgray')
            }, function() {
                $(this).css('color', 'gray')
            });
        }
    });

    $("#beatsbucket .player-area .playlist_controls .btn_add").click(function() {

        //playList = searchedSongs.slice(0);
        var songs = melonService.getSearchedSongs();//searchedSongs.slice(0);


        $.each(songs, function(i, songItem) {
            beatsbucketPlayer.addSongsToPlayList(songItem);
            var artist = '';
            $.each(songItem.artists.artist, function(j, artistItem) {
                artist += artistItem.artistName;
                artist += ' ';
            });
            $("#beatsbucket .player-area .playlist").append($('<p>', {
                class:"title",
                click:function(){
                    beatsbucketPlayer.setCurrentPlayIndex(i);
                    beatsbucketPlayer.play();
                }
            }).append(songItem.songName + ' - ' + artist));
        });

    });

    $("#beatsbucket .player-area .playlist_controls .btn_clear").click(function() {
        $("#beatsbucket .player-area .playlist .title").remove();
        beatsbucketPlayer.clearPlayList();
    });

    $("#beatsbucket .player-area .playlist p").click(function() {
//        var str = $(this).text();
        alert("aa");
    });

    $("#beatsbucket .contents-area .chart-area .realtime").click(function() {
        currentChartType = 'realtime';
        melonService.getRealtimeChart(currentChartType, 1, defaultLoadCount);
    });

    $("#top_album").click(function() {
        currentChartType = 'topAlbum';
        melonService.getRealtimeChart(currentChartType, 1, defaultLoadCount);
    });

    $("#beatsbucket .contents-area .chart-area .today_top_song").click(function() {
        currentChartType = 'todayTopSong';
        melonService.getRealtimeChart(currentChartType, 1, defaultLoadCount);
    });

    $("#beatsbucket .contents-area .chart-area .top_genres").click(function() {
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