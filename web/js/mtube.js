var melonUrl = "http://apis.skplanetx.com/melon";
var imageUrl = "http://image.melon.com/cm/album/images";
var appKey = "9ec9b7cf-811f-3c4e-8692-3282aa4f69d7";
var defaultLoadCount = 20;
var melonAPIVersion = 1;
var currentChartType;
var currentPage;
var endPage;

var ytIndex = 0;
var ytPlayList = new Array();
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
				
				$.each(response.melon.songs.song, function(i, item) {
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
					
					$("#beatsbucket .contents-area .search-result")
						.append($('<h3>')
							.append(songName + ' - ' + artist)
						)
						.append($('<div>')
							.append($('<p>')
								.append($('<img>', {
									src: imageUrl + getImageSubUrl(item.albumId.toString()),
									alt: songName + ' ' + artist,
									title: songName,
									click: function() {
										addytVideoId($(this).attr('alt'));
									}
								}))
							)
						);
					
					
					
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

$(function() {

    $("#beatsbucket .player-area .controls p .add").click(function() {
        var playlist = ['abc', 'def', 'ghi', 'jkl', 'mno'];

        $.each(playlist, function(i, item) {
            $("#beatsbucket .player-area .playlist").append('<p class="title">' + item + "</p>");
        });

        $("#beatsbucket .contents-area .search-result > div > p > img").each(function(i, v) {
            addytVideoId($(this).attr('alt'));
        });

    });

    $("#beatsbucket .player-area .controls p .clear").click(function() {


        $("#beatsbucket .player-area .playlist .title").remove();


    });



	$( "#accordion" ).accordion({
        heightStyle: "content"
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

	$("#playVideo").click(function() {
		if (ytplayer) {
			// ytIndex = ytplayer.getPlaylistIndex() + 1;
			// ytplayer.cuePlaylist(ytPlayList);
			ytplayer.loadPlaylist(ytPlayList);
		} else {
			alert("no ytvideo");
		}
	});
	$("#stopVideo").click(function() {
		ytplayer && ytplayer.stopVideo();
	});
	$("#prevVideo").click(function() {
		ytplayer && ytplayer.previousVideo();
	});
	$("#nextVideo").click(function() {
		if (ytplayer) {
			ytIndex = ytplayer.getPlaylistIndex() + 1;
			if (ytPlayList.length == ytIndex) {
				ytplayer.nextVideo();
			} else if (ytPlayList.length > ytIndex) {
				ytplayer.stopVideo();
				//ytplayer.clearVideo();
				ytplayer.loadPlaylist(ytPlayList, ytIndex);
			}
		}
	});
	
	$("#search_btn").click(function() {
		ytPlayList && ytPlayList.push(getytVideoId($("#search_input_box").val()));
		
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
          videoId: '',
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
//        if (event.data == YT.PlayerState.PLAYING && !done) {
//          setTimeout(stopVideo, 6000);
//          done = true;
//        }
        if (ytplayer) {
    		switch (newState) {
    		case -1:// unstarted
    			break;
    		case 0: // ended
    			ytIndex = ytplayer.getPlaylistIndex() + 1;
    			if (ytPlayList.length > ytIndex) {
    				ytplayer.stopVideo();
    				ytplayer.clearVideo();
    				// ytplayer.cuePlaylist(ytPlayList);
    				// setTimeout(ytplayer.loadPlaylist(ytPlayList, ytIndex), 10);
    				// // ms
    				ytplayer.loadPlaylist(ytPlayList, ytIndex);
    			}
    			// alert('end');
    			break;
    		case 1: // playing
    			break;
    		case 2: // paused
    			break;
    		case 3: // buffering
    			break;
    		case 5: // cued
    			// ytplayer.playVideoAt(ytIndex);
    			break;
    		default:
    			break;
    		}
    	}
      }
      function stopVideo() {
        ytplayer.stopVideo();
      }

/*
google.load("swfobject", "2.1");
function onYouTubePlayerReady(playerid) {
	var ytplayer = document.getElementById('ytPlayer');
	ytplayer.addEventListener("onStateChange", "onPlayerStateChange");
	ytplayer.addEventListener("onError", "onPlayerError");
	ytplayer.setPlaybackQuality("small");
};

function onPlayerStateChange(newState) {
	if (ytplayer) {
		switch (newState) {
		case -1:// unstarted
			break;
		case 0: // ended
			ytIndex = ytplayer.getPlaylistIndex() + 1;
			if (ytPlayList.length > ytIndex) {
				ytplayer.stopVideo();
				ytplayer.clearVideo();
				// ytplayer.cuePlaylist(ytPlayList);
				// setTimeout(ytplayer.loadPlaylist(ytPlayList, ytIndex), 10);
				// // ms
				ytplayer.loadPlaylist(ytPlayList, ytIndex);
			}
			// alert('end');
			break;
		case 1: // playing
			break;
		case 2: // paused
			break;
		case 3: // buffering
			break;
		case 5: // cued
			// ytplayer.playVideoAt(ytIndex);
			break;
		default:
			break;
		}
	}
}

function onPlayerError(errorCode) {
	alert("An error occured of type:" + errorCode);
}

// The "main method" of this sample. Called when someone clicks "Run".
function loadPlayer() {
	// The video to load
	var videoID = "GK3eTcsU-aw";
	// Lets Flash from another domain call JavaScript
	var params = {
		allowScriptAccess : "always"
	};
	// The element id of the Flash embed
	var atts = {
		id : "ytPlayer"
	};
	// All of the magic handled by SWFObject
	// (http://code.google.com/p/swfobject/)
	swfobject.embedSWF("http://www.youtube.com/apiplayer?" +
            "version=3&enablejsapi=1&playerapiid=player1", 
            "ytapiplayer", "480", "295", "9", null, null, params, atts);
}
function _run() {
	loadPlayer();
}
google.setOnLoadCallback(_run);
*/

