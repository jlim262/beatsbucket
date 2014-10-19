
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
        $("#beatsbucket .player-area .playlist").append('<p class="title">' + s.songName + ' - ' +artist + "</p`>");
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

     var searchAlbum = function(keyword_p, page_p, count_p) {

        var subUrl = "/albums?";

        $.ajax({
            url : melonUrl + subUrl,
            dataType : "json",
            data : {
                version : melonAPIVersion,
                page : page_p,
                count : count_p,
                searchKeyword : keyword_p,
                appKey : appKey
            },
            success : function(response) {
                $.each(response.melon.albums.album, function(i, albumItem) {
                    alert(albumItem.albumName);
                });

            }
        });
    }

    this.getMelonDjMain = function() {

        var subUrl = "/melondj?";

        $.ajax({
            url : melonUrl + subUrl,
            dataType : "json",
            data : {
                version : melonAPIVersion,
                appKey : appKey
            },
            success : function(response) {
                $.each(response.melon.categories.category, function(i, categoryItem) {
                    categoryItem.categoryId;
                    categoryItem.categoryName;

                });

            }
        });
    }

    this.getMelonDjCategoryInfo = function(categoryId_p, page_p, count_p) {

        var subUrl = "/" + categoryId + "?";

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
                $.each(response.melon.subCategories.subCategory, function(i, subCategoryItem) {
                    subCategoryItem.offeringId;
                    subCategoryItem.categoryId;
                    subCategoryItem.offeringTitle;

                    if (subCategoryItem.secondCategoryUse == "true") {
                        $.each(response.melon.secondCategories.secondCategory, function(i, secondCategoryItem) {
                            secondCategoryItem.categoryId;
                            secondCategoryItem.categoryName;
                        });
                    }

                });

            }
        });
    }

    this.getMelonDjchart = function(categoryId_p, offeringId_p, page_p, count_p) {

        var subUrl = "/melondj/categories/" + categoryId_p + "/offerings/" + offeringId_p + "?";

        $.ajax({
            url : melonUrl + subUrl,
            dataType : "json",
            data : {
                page : page_p,
                count : count_p,
                version : melonAPIVersion,
                appKey : appKey
            },
            success : function(response) {
                $.each(response.melon.songs.song, function(i, songItem) {

                });

            }
        });
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

                    //$("#searchResultTmpl").tmpl(response.melon.songs).appendTo("#test_area");
                    var movies = [
                        { Name: "The Red Violin", ReleaseYear: "1998", Director: "François Girard" },
                        { Name: "Eyes Wide Shut", ReleaseYear: "1999", Director: "Stanley Kubrick" },
                        { Name: "The Inheritance", ReleaseYear: "1976", Director: "Mauro Bolognini" }
                    ];
                    //$("#searchResultTmpl").tmpl(movies).appendTo("#test_area");
                    $.template(
                        "detailTemplate",
                        "<tr>" +
                            "<td colspan='2'>${songName}</td>" +
                            "<td>Released: ${ReleaseYear}</td>" +
                            "<td>Director: ${Director}</td>" +
                            "</tr>"
                    );
                    $.template(
                        "searchedSong",
                        "<tr>" +
                            "<td>${albumName}</td>" +
//                                "<tr class='songTitle'>${albumName}</tr>" +
//                                "<tr class='songName'>${songName}</tr>" +
                            "<td>${songName}</td>" +
                            "<td class='addToPlayList'><span class='plusButton'>+</span></td>" +
                        "</tr>"
                    );
                    $.tmpl( "searchedSong", response.melon.songs.song ).appendTo( "#test_area" );

                    $.each(response.melon.songs.song, function(i, songItem) {
                        searchedSongs.push(songItem);

                        var albumName = songItem.albumName;
                        var songName = songItem.songName;
                        var artist = '';
                        $.each(songItem.artists.artist, function(j, artistItem) {
                            artist += artistItem.artistName;
                            artist += ' ';
                        });

                        //var songJson = JSON.stringify(songItem);
                        //$("#searchResultTmpl").tmpl(songItem).appendTo("#test_area");

                        //var searchFunction = this.searchAlbum;
                        /*$("#beatsbucket .contents-area .search-result table")
                            .append($('<tr>')
                                .append($('<td>')

                                    .append($('<img>', {
                                        src: imageUrl + getImageSubUrl(songItem.albumId.toString()),
                                        width: 50,
                                        height: 50,
                                        alt: songName + ' ' + artist,
                                        title: songName,
                                        click: function() {

                                            //searchFunction(albumName, 1, 1);

                                            searchAlbum(albumName, 1, 1);
                                            //addytVideoId($(this).attr('alt'));
                                        }
                                    }))

                                )
                                .append($('<td>')
                                    .append($('<tr class="songTitle">').append(albumName))
                                    .append($('<tr class="songName">').append(songName + ' - ' + artist))
                                )

                                .append($('<td>', {
                                    class: "addToPlayList",
                                    click: function() {
                                        addToPlaylist(i);
                                    }
                                }).append($('<span class="plusButton">').append('+'))
                                )
                            )*/

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
