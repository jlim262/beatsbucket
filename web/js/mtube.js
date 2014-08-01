var melonUrl = "http://apis.skplanetx.com/melon";
var imageUrl = "http://image.melon.com/cm/album/images";
var appKey = "9ec9b7cf-811f-3c4e-8692-3282aa4f69d7";
var defaultLoadCount = 100;
var melonAPIVersion = 1;
var currentChartType;
var currentPage;
var endPage;

var ytIndex = 0;
var ytPlayList = new Array();
var searchedSongs = new Array();
var playList = new Array();

var currentPlayingIndex = 0;
var stopPlayer = true;

//
//$(window).scroll(
//		function(e) {
//			d_height = $(document).height(); // 다큐멘트 크기
//			w_height = $(window).height(); // 브라우저 크기
//			s_height = d_height - w_height;
//			d_top = $(document).scrollTop(); // 다큐멘트 최상위 좌표
//			if ((s_height - d_top) < 1) {
//				if (currentPage < endPage)
//					getRealtimeChart(currentChartType, currentPage + 1,
//							defaultLoadCount);
//			}
//		});

var getImageSubUrl = function(albumId) {
    var len = albumId.length;
    if (len < 5 || len >= 8)
        return;
    var subUrl = (len > 5 ? albumId.substring(0, len - 5) : '') + '/'
        + albumId.substring(len - 5, len - 3) + '/'
        + albumId.substring(len - 3, len) + '/' + albumId + '.jpg';
    for ( var i = 0; i < (8 - len); i++)
        subUrl = '0' + subUrl;
    return ('/' + subUrl);
};

var addytVideoId = function(query_p) {
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
            ytPlayList && ytPlayList.push(id);
        },
        erroe : function() {
            alert('f');
        }
    });
};

var getytVideoId = function(query_p, callback) {
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
            if (callback)
                callback(id);
            else
                return id;
        },
        erroe : function() {
            alert('f');
        }
    });
};

var stopVideo = function() {
    ytplayer.stopVideo();
};

var clearVideo = function() {
    ytplayer && ytplayer.clearVideo();
};

var loadVideoById = function(query_p) {
    ytplayer && ytplayer.loadVideoById(query_p);
};

var playVideo = function() {
    if (currentPlayingIndex < playList.length) {

        stopVideo();
        clearVideo();
        stopPlayer = false;

        var song = playList[currentPlayingIndex];
        var songName = song.songName;
        var artist = '';
        $.each(song.artists.artist, function(j, item_j) {
            artist += item_j.artistName;
            artist += ' ';
        });

        getytVideoId(songName + ' ' + artist, loadVideoById);

    } else {
        stopPlayer = true;
        alert("no songs in the list");
    }
}



var getRealtimeChart = function(chartType_p, page_p, count_p) {
    currentPage = page_p;
    var subUrl;

    switch (chartType_p) {
        case 'realtime':
            subUrl = '/charts/realtime?';
            break;
        case 'topAlbum':
            subUrl = '/charts/topalbums?';
            break;
        case 'todayTopSong':
            subUrl = '/charts/todaytopsongs?';
            break;
        case 'topGenres':
            subUrl = '/charts/topgenres?';
            break;
        case 'newSong':
            subUrl = '/newreleases/songs?';
            break;
        case 'newAlbum':
            subUrl = '/newreleases/albums?';
            break;
        default:
            return;
    }

    //testFunc();
    $.ajax({
        url : melonUrl + subUrl,
        dataType : "json",
        data : {
            version : melonAPIVersion,
            page : page_p,
            count : count_p,
            appKey : appKey
        },
        success : function(response) {
            endPage = response.melon.totalPages;
            if ([ 'realtime', 'todayTopSong', 'topGenres', 'newSong' ]
                .indexOf(chartType_p) > -1) {

                $("#beatsbucket .contents-area .search-result table").empty();

                $.each(response.melon.songs.song, function(i, item) {
                    searchedSongs.push(item);

                    var albumName = item.albumName;
                    var songName = item.songName;
                    var artist = '';
                    $.each(item.artists.artist, function(j, item_j) {
                        artist += item_j.artistName;
                        artist += ' ';
                    });

//					$("div#queue_list_wrapper ul#queue")
//						.append($('<li>', {'class': 'item','id': item.albumId})
//							.append($('<span>', {'class': 'inner'})
//								.append($('<a>')
//									.append($('<span>', {'class': 'title'})
//										.append($('<span>')
//											.append(songName)
//										)
//									)
//								)
//								.append($('<span>'))
//								.append($('<img>', {'class':'favicon'}))
//								.append($('<ul>', {'class': 'sub'})
//									.append($('<li>')
//										.append($('<a>')
//											.append(artist)
//										)
//									)
//								)
//							)
//							.append($('<a>', 
//									{
//										'class': 'checkbox', 
//										'id': artist + songName, 
//										click: function() {
//											addytVideoId($(this).attr('id'));
//										}
//									}
//								)
//							)
//						);

                    $("#beatsbucket .contents-area .search-result table")
                        .append($('<tr>')
                            .append($('<td>')

                                .append($('<img>', {
                                    src: imageUrl + getImageSubUrl(item.albumId.toString()),
                                    width: 50,
                                    height: 50,
                                    alt: songName + ' ' + artist,
                                    title: songName,
                                    click: function() {
                                        addytVideoId($(this).attr('alt'));
                                    }
                                }))

                            )
                            .append($('<td>').append(albumName))
                            .append($('<td>').append(songName))
                            .append($('<td>').append(artist))
                            .append($('<td>', {
                                class: "addToPlayList",
                                click: function() {
                                    addToPlaylist(i);
//                                    stopVideo();
//                                    clearVideo();
//                                    getytVideoId(songName + ' ' + artist, loadVideoById);


                                }
                            }).append('+'))
                        )




                    //var test = $('ul#queue');
                    //$("#test_ul").append("<li>hi</li>");
//					$("div#queue_list_wrapper ul").append("<li>hi</li>");		  

//									$('<img>', {
//						src: imageUrl + getImageSubUrl(item.albumId.toString()),
//						alt: altstr,
//						title: songName,
//						click: function() {
//							addytVideoId($(this).attr('alt'));
//						}
//					})
//					);
                });
                //$("div#result_content").accordion({heightStyle: "content"});
                //$("div#queue_list_wrapper ul#queue li.item:last-child").append($("li.info"));
            } else if ([ 'topAlbum', 'newAlbum' ].indexOf(chartType_p) > -1) {
                $.each(response.melon.albums.album, function(i, item) {
                    $("#result_content").append(
                        '<img src="' + imageUrl
                            + getImageSubUrl(item.albumId.toString())
                            + '">');
                });
            }

        }
    });
};

var addToPlaylist = function(idx) {

    var s = searchedSongs[idx];
    playList.push(s);
    var artist = '';
    $.each(s.artists.artist, function(j, item_j) {
        artist += item_j.artistName;
        artist += ' ';
    });
    $("#beatsbucket .player-area .playlist").append('<p class="title">' + s.songName + ' - ' +artist + "</p>");
}

$(function() {
    $("#beatsbucket .player-area .controls p .play").click(function() {
        if (ytplayer) {
            playVideo();
        } else {
            alert("no ytvideo");
        }
    });

    $("#beatsbucket .player-area .controls p .stop").click(function() {
        stopPlayer = true;
        stopVideo();
    });

    $("#beatsbucket .player-area .controls p .prev").click(function() {
        //ytplayer && ytplayer.previousVideo();
        currentPlayingIndex--;
        playVideo();
    });
    $("#beatsbucket .player-area .controls p .next").click(function() {
        currentPlayingIndex++;
        playVideo();
    });

    $("#beatsbucket .player-area .controls p .add").click(function() {

        playList = searchedSongs.slice(0);

        $.each(playList, function(i, s) {
            var artist = '';
            $.each(s.artists.artist, function(j, item_j) {
                artist += item_j.artistName;
                artist += ' ';
            });
            $("#beatsbucket .player-area .playlist").append('<p class="title">' + s.songName + ' - ' + artist + "</p>");
        });

    });

    $("#beatsbucket .player-area .controls p .clear").click(function() {


        $("#beatsbucket .player-area .playlist .title").remove();


    });

    $("#beatsbucket .player-area .controls .playlist p").click(function() {
        if (ytplayer) {
            // ytIndex = ytplayer.getPlaylistIndex() + 1;
            // ytplayer.cuePlaylist(ytPlayList);
            ytplayer.loadPlaylist(ytPlayList);
        } else {
            alert("no ytvideo");
        }
    });

    $("#beatsbucket .contents-area .chart-area #realtime").click(function() {
        currentChartType = 'realtime';
        //$("#result_content ul#queue :not(li.info) :not(a.more)").empty();
        getRealtimeChart(currentChartType, 1, defaultLoadCount);

    });
    $("li.info").click(function() {
        if (currentPage < endPage)
            getRealtimeChart(currentChartType, currentPage + 1,	defaultLoadCount);
    });

    $("#selectAll").click(function() {
        $("div#result_content > div > p > img").each(function(i, v) {
            addytVideoId($(this).attr('alt'));
        });

    });

    $("#top_album").click(function() {
        currentChartType = 'topAlbum';
//		$("#queue_list_wrapper").empty();
        getRealtimeChart(currentChartType, 1, defaultLoadCount);
    });
    $("#today_top_song").click(function() {
        currentChartType = 'todayTopSong';
//		$("#queue_list_wrapper").empty();
        getRealtimeChart(currentChartType, 1, defaultLoadCount);
    });
    $("#top_genres").click(function() {
        currentChartType = 'topGenres';
//		$("#queue_list_wrapper").empty();
        getRealtimeChart(currentChartType, 1, defaultLoadCount);
    });
    $("#new_song").click(function() {
        currentChartType = 'newSong';
//		$("#queue_list_wrapper").empty();
        getRealtimeChart(currentChartType, 1, defaultLoadCount);
    });
    $("#new_album").click(function() {
        currentChartType = 'newAlbum';
//		$("#queue_list_wrapper").empty();
        getRealtimeChart(currentChartType, 1, defaultLoadCount);
    });



    $("#search_btn").click(function() {
        ytPlayList && ytPlayList.push(getytVideoId($("#search_input_box").val(), false));

    });


});

$("#album_image").css({
    border: '2px solid black'
})

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "//www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var ytplayer;
function onYouTubeIframeAPIReady() {
    ytplayer = new YT.Player('ytplayer', {
        height: '240',
        width: '320',
        videoId: 'Wa5B22KAkEk',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    //event.target.playVideo();
    event.target.setPlaybackQuality("small");
    event.target.setVolume(50);
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED && !stopPlayer) {
        currentPlayingIndex++;
        setTimeout(playVideo, 500);
//          done = true;

    }
    if (ytplayer) {

//    		switch (newState) {
//    		case -1:// unstarted
//    			break;
//    		case 0: // ended
//    			ytIndex = ytplayer.getPlaylistIndex() + 1;
//    			if (ytPlayList.length > ytIndex) {
//    				ytplayer.stopVideo();
//    				ytplayer.clearVideo();
//    				// ytplayer.cuePlaylist(ytPlayList);
//    				// setTimeout(ytplayer.loadPlaylist(ytPlayList, ytIndex), 10);
//    				// // ms
//    				ytplayer.loadPlaylist(ytPlayList, ytIndex);
//    			}
//    			// alert('end');
//    			break;
//    		case 1: // playing
//    			break;
//    		case 2: // paused
//    			break;
//    		case 3: // buffering
//    			break;
//    		case 5: // cued
//    			// ytplayer.playVideoAt(ytIndex);
//    			break;
//    		default:
//    			break;
//    		}
    }
}
