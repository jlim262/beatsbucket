
var player = function(youtubeService_p) {
    var youtubeService = youtubeService_p;
    var songList = []; //new playList();
    var shuffledSongList = [];//new Arrays();
    var currentPlayIndex = 0;
    var repeat = ["NONE", "ONE", "ALL"];
    var currentRepeatIndex = 0;
    var shuffle = false;

    this.isStopped = function() {
        return youtubeService.bStopped;
    }

    this.getRepeatState = function() {
        return repeat[currentRepeatIndex];
    }

    this.isShuffled = function() {
        return shuffle;
    }

    this.increasePlayIndex = function() {
        if (currentPlayIndex < songList.length-1)
            currentPlayIndex++;
    }

    this.decreasePlayIndex = function() {
        if (currentPlayIndex > 1)
            currentPlayIndex--;
        else
            currentPlayIndex = 0;
    }

    this.play = function() {
        if (currentPlayIndex < songList.length) {
            //this.stop();
            this.clear();
            youtubeService.bStopped = false;

            var song;
            if(shuffle)
                song = shuffledSongList[currentPlayIndex];
            else
                song = songList[currentPlayIndex];

            var songName = song.songName;
            var artist = '';
            $.each(song.artists.artist, function(j, artistItem) {
                artist += artistItem.artistName;
                artist += ' ';
            });

            youtubeService.playVideo(songName + ' ' + artist);


            $("#beatsbucket .player-area .playlist p:nth-child(" + (currentPlayIndex+1) + ")").css("color", "red");

        } else {
            if(this.getRepeatState() == "ALL" && songList.length > 0) {
                currentPlayIndex = 0;
                this.play();

            } else {
                alert("no songs in the list");
            }


        }
    };

    this.clear = function() {
        youtubeService.clearVideo();
    }

    this.stop = function() {
        youtubeService.bStopped = true;
        youtubeService.stopVideo()
        $("#beatsbucket .player-area .playlist p:nth-child(" + (currentPlayIndex+1) + ")").css("color", "black");
    }

    this.pause = function() {

    }

    this.resume = function() {

    }

    this.next = function() {
        this.stop();
        if(this.getRepeatState() != "ONE")
            this.increasePlayIndex();
        this.play();
    }

    this.prev = function() {
        this.stop();
        if(this.getRepeatState() != "ONE")
            this.decreasePlayIndex();
        this.play();
    }

    this.repeat = function() {
        currentRepeatIndex++;
        currentRepeatIndex %= repeat.length;
    }

    this.shuffle = function() {
        shuffle = ~shuffle;
        shuffledSongList = [];
        if(shuffle) {
            var len = songList.length;
            for (var i = 0; i < len; i++) {
                shuffledSongList.push(songList[i]);
            }
            for (var i = 0; i < len; i++) {
                var rand = Math.floor(Math.random() * len);
                var temp = shuffledSongList[i];
                shuffledSongList[i] = shuffledSongList[rand];
                shuffledSongList[rand] = temp;
            }

            $("#beatsbucket .player-area .playlist .title").remove();
            $.each(shuffledSongList, function(i, songItem) {
                
                var artist = '';
                $.each(songItem.artists.artist, function(j, artistItem) {
                    artist += artistItem.artistName;
                    artist += ' ';
                });
                $("#beatsbucket .player-area .playlist").append('<p class="title">' + songItem.songName + ' - ' + artist + "</p>");
            });
        } else {
            
            
            var len = songList.length;
            for (var i = 0; i < len; i++) {
                shuffledSongList.push(songList[i]);
            }
            $("#beatsbucket .player-area .playlist .title").remove();
            $.each(songList, function(i, songItem) {

                var artist = '';
                $.each(songItem.artists.artist, function(j, artistItem) {
                    artist += artistItem.artistName;
                    artist += ' ';
                });
                $("#beatsbucket .player-area .playlist").append('<p class="title">' + songItem.songName + ' - ' + artist + "</p>");
            });
        }
    }

    this.addSongsToPlayList = function(song_p) {
        if(song_p instanceof Array)
            songList.concat(song_p);
        else
            songList.push(song_p);


        shuffledSongList.push(songList.length-1);

    }

    this.removeSongsFromPlayList = function() {

    }

    this.clearPlayList = function() {
        songList = [];
        shuffledSongList = [];
        currentPlayIndex = 0;
        this.stop();
    }

}
