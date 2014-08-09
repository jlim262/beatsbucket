
var player = function(youtubeService_p) {
    var youtubeService = youtubeService_p;
    var songList = []; //new playList();
    var playOrderList = [];//new Arrays();
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

            var song= songList[playOrderList[currentPlayIndex]];

            var songName = song.songName;
            var artist = '';
            $.each(song.artists.artist, function(j, artistItem) {
                artist += artistItem.artistName;
                artist += ' ';
            });

            youtubeService.playVideo(songName + ' ' + artist);

            $("#beatsbucket .player-area .playlist p:nth-child(" + (playOrderList[currentPlayIndex]+1) + ")").css("color", "red");

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
        $("#beatsbucket .player-area .playlist p:nth-child(" + (playOrderList[currentPlayIndex]+1) + ")").css("color", "black");
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
        
        var len = songList.length;
        if(shuffle) {
            playOrderList = [];
            for (var i = 0; i < len; i++) {
                playOrderList.push(i);
            }
            for (var i = 0; i < len; i++) {
                var rand = Math.floor(Math.random() * len);
                var temp = playOrderList[i];
                playOrderList[i] = playOrderList[rand];
                playOrderList[rand] = temp;
            }
            for (var i = 0; i < len; i++) {
                if(playOrderList[i] == currentPlayIndex) {
                    var temp = playOrderList[0];
                    playOrderList[0] = playOrderList[i];
                    playOrderList[i] = temp;
                    break;
                }
            }
            currentPlayIndex = 0;
        } else {
            currentPlayIndex = playOrderList[currentPlayIndex];
            playOrderList = [];
            for (var i = 0; i < len; i++) {
                playOrderList.push(i);
            }
        }
    }

    this.addSongsToPlayList = function(song_p) {
        if(song_p instanceof Array)
            songList.concat(song_p);
        else
            songList.push(song_p);


        // TODO should consider shuffle case
        playOrderList.push(songList.length-1);

    }

    this.removeSongsFromPlayList = function() {

    }

    this.clearPlayList = function() {
        songList = [];
        playOrderList = [];
        currentPlayIndex = 0;
        this.stop();
    }

}
