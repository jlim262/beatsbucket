
var player = function(youtubeService_p) {
    var youtubeService = youtubeService_p;
    var songList = []; //new playList();
    var playOrderList = [];//new Arrays();
    var currentPlayIndex = 0;
    var repeat = ["NONE", "ONE", "ALL"];
    var shuffle = false;

    this.isStopped = function() {
        return youtubeService.bStopped;
    }

    this.increasePlayIndex = function() {
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

            var song = songList[currentPlayIndex];
            var songName = song.songName;
            var artist = '';
            $.each(song.artists.artist, function(j, artistItem) {
                artist += artistItem.artistName;
                artist += ' ';
            });

            youtubeService.playVideo(songName + ' ' + artist);


            $("#beatsbucket .player-area .playlist p:nth-child(" + (currentPlayIndex+1) + ")").css("color", "green");

        } else {
            alert("no songs in the list");
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
        this.increasePlayIndex();
        this.play();
    }

    this.prev = function() {
        this.stop();
        this.decreasePlayIndex();
        this.play();
    }

    this.repeat = function() {

    }

    this.shuffle = function() {

    }

    this.addSongsToPlayList = function(song_p) {
        if(song_p instanceof Array)
            songList.concat(song_p);
        else
            songList.push(song_p);
    }

    this.removeSongsFromPlayList = function() {

    }

    this.clearPlayList = function() {
        songList = [];
        currentPlayIndex = 0;
        this.stop();
    }

}
