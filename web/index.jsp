<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <link rel="stylesheet" href="/css/style.css" type="text/css">
    <script src="http://code.jquery.com/jquery-1.8.3.js"></script>
    <link rel="stylesheet"
          href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css"/>
    <script src="http://code.jquery.com/ui/1.9.2/jquery-ui.js"></script>
    <!--script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js"></script-->
    <script src="http://www.google.com/jsapi" type="text/javascript"></script>
    <script type="text/javascript" src="/js/youtube.js"></script>
    <script type="text/javascript" src="/js/player.js"></script>
    <script type="text/javascript" src="/js/melon.js"></script>
    <script type="text/javascript" src="/js/beatsbucket.js"></script>

    <title>BeatsBucket</title>
</head>
<body>


<div id="beatsbucket">

    <div class="">

    </div>


    <div class="contents-area">
        <div class="chart-area">
            <nav>
                <ul class="chart">
                    <li class="realtime button">Realtime Top100</li>
                    <li class="today_top_song button">Today Top100</li>
                    <%--<li id="top_album">앨범차트</li>--%>
                    <li class="top_genres button">Genres Top100</li>
                    <%--<li id="new_song">최신곡</li>--%>
                    <%--<li id="new_album">최신앨범</li>--%>
                </ul>
            </nav>
        </div>

        <div class="search-result">
            <table></table>
        </div>

    </div>

    <div class="player-area">
        <div class="screen">
            <p>Screen</p>
            <div id="ytplayer"></div>
        </div>
        <div class="controls">
            <p>Controls</p>
            <p>
                <span class="prev buttons">Prev</span>
                <span class="play buttons">Play</span>
                <span class="stop buttons">Stop</span>
                <span class="next buttons">Next</span>
                <span class="repeat buttons">Repeat</span>
                <span class="shuffle buttons">Shuffle</span>
            </p>
            <p>
                <span class="add buttons">AddAll</span>
                <span class="clear buttons">Clear</span>
            </p>
        </div>
        <div class="playlist">

        </div>


    </div>

</div>


</body>
</html>