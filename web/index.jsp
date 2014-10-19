<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <link rel="stylesheet" href="/css/style.css" type="text/css">
    <script src="http://code.jquery.com/jquery-1.8.3.js"></script>
    <script type="text/javascript" src="http://www.json.org/json2.js"></script>
    <link rel="stylesheet"
          href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css"/>
    <script src="http://code.jquery.com/ui/1.9.2/jquery-ui.js"></script>
    <script type="text/javascript" src="/lib/jquery.tmpl.min.js"></script>
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

    <div class="player-area">
        <div class="screen">
            <div id="ytplayer"></div>
        </div>
        <div class="player_controls">
            <table>
                <td class="btn_prev buttons">Prev</td>
                <td class="btn_play buttons">Play</td>
                <td class="btn_stop buttons">Stop</td>
                <td class="btn_next buttons">Next</td>
                <td class="btn_repeat buttons">Repeat</td>
                <td class="btn_shuffle buttons">Shuffle</td>
            </table>
        </div>
        <div class="playlist"></div>
        <div class="playlist_controls">
            <table>
                <td class="btn_add buttons">Add All</td>
                <td class="btn_clear buttons">Clear</td>
            </table>
        </div>
    </div>

    <div class="contents-area">
        <div class="header-area">
            <span>BeatsBucket</span>
        </div>
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
        <div class="body-area">
            <table>
                <td class="side-menu-area"></td>
                <td>
                    <div class="search-result">
                        <table></table>
                    </div>

                    <div class="songItem">
                        <table>
                            <div id="test_area"></div>
                            <script id="searchResultTmpl" type="text/x-jquery-tmpl">





                            </script>
                        </table>
                    </div>

                </td>
            </table>
            <%--<div class="side-menu-area"></div>--%>
            <%--<div class="search-result">--%>
                <%--<table></table>--%>
            <%--</div>--%>
        </div>


        <div class="footer-area">
            <span>BeatsBucket for simple and free music service</span>
        </div>

    </div>



</div>


</body>
</html>