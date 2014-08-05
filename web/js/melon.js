
var melonService = function(beatsbucketPlayer_p) {
    var beatsbucketPlayer = beatsbucketPlayer_p;
    var melonUrl = "http://apis.skplanetx.com/melon";
    var imageUrl = "http://image.melon.com/cm/album/images";
    var appKey = "9ec9b7cf-811f-3c4e-8692-3282aa4f69d7";
    var defaultLoadCount = 100;
    var melonAPIVersion = 1;
    var currentChartType;
    var currentPage;
    var endPage;
    var searchedSongs = [];

    var addToPlaylist = function(idx) {

        var s = searchedSongs[idx];
        //playList.push(s);
        beatsbucketPlayer.addSongsToPlayList(s);
        var artist = '';
        $.each(s.artists.artist, function(j, item_j) {
            artist += item_j.artistName;
            artist += ' ';
        });
        $("#beatsbucket .player-area .playlist").append('<p class="title">' + s.songName + ' - ' +artist + "</p>");
    }

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

    this.getSearchedSongs = function() {
        return searchedSongs;
    }

    this.getRealtimeChart = function(chartType_p, page_p, count_p) {
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
                    searchedSongs = [];

                    $.each(response.melon.songs.song, function(i, songItem) {
                        searchedSongs.push(songItem);

                        var albumName = songItem.albumName;
                        var songName = songItem.songName;
                        var artist = '';
                        $.each(songItem.artists.artist, function(j, artistItem) {
                            artist += artistItem.artistName;
                            artist += ' ';
                        });

                        $("#beatsbucket .contents-area .search-result table")
                            .append($('<tr>')
                                .append($('<td>')

                                    .append($('<img>', {
                                        src: imageUrl + getImageSubUrl(songItem.albumId.toString()),
                                        width: 50,
                                        height: 50,
                                        alt: songName + ' ' + artist,
                                        title: songName//,
                                        //click: function() {
                                            //addytVideoId($(this).attr('alt'));
                                        //}
                                    }))

                                )
                                .append($('<td>').append(albumName))
                                .append($('<td>').append(songName))
                                .append($('<td>').append(artist))
                                .append($('<td>', {
                                    class: "addToPlayList",
                                    click: function() {
                                        addToPlaylist(i);
                                    }
                                }).append('+'))
                            )

                    });
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

}
