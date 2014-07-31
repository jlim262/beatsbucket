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
    <script type="text/javascript" src="/js/mtube.js"></script>

    <title>BeatsBucket</title>
</head>
<body>


<div id="beatsbucket">



    <div class="contents-area">
        <div class="chart-area">
            <nav>
                <ul id="chart">
                    <li id="realtime">실시간</li>
                    <li id="top_album">앨범차트</li>
                    <li id="today_top_song">일간차트</li>
                    <li id="top_genres">장르차트(가요)</li>
                    <li id="new_song">최신곡</li>
                    <li id="new_album">최신앨범</li>
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
            <p><span class="add">Add</span> <span class="clear">Clear</span></p>
        </div>
        <div class="playlist">
            <p>Play List</p>
        </div>


    </div>

</div>


</body>
</html>