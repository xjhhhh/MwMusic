$(function () {
    //次导航悬浮事件
    $(".header-a-navigation2").hover(function () {
        $(this).toggleClass("li_hover");
    });

    //次导航点击事件
    $("#a_click_A").click(function () {
        $("#front-iframe").attr("src", "front_recommend.html");
    });
    $("#a_click_B").click(function () {
        $("#front-iframe").attr("src", "front_leaderboard.html");
    });
    $("#a_click_C").click(function () {
        $("#front-iframe").attr("src", "front_playlist.html");
    });
    $("#a_click_D").click(function () {
        $("#front-iframe").attr("src", "front_singer.html");
    });
    $("#a_click_E").click(function () {
        $("#front-iframe").attr("src", "front_albums.html");
    });
});

//框架自适应高度
function iframeAutoHeight() {
    var iframe = document.getElementById("front-iframe");
    if (navigator.userAgent.indexOf("MSIE") > 0 || navigator.userAgent.indexOf("rv:11") > 0 || navigator.userAgent.indexOf("Firefox") > 0) {
        iframe.height = iframe.contentWindow.document.body.scrollHeight;
    } else {
        iframe.height = iframe.contentWindow.document.documentElement.scrollHeight;
    }
};