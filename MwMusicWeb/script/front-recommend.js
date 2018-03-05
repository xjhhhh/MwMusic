var id;
$(function () {
    //加载轮播图片
    $.ajax({
        url: "../front_Page/ashx/front_setImg.ashx",
        type: "get",
        success: function (data) {
            $("#link_img").html("<img class='img' style='width:100%;height:300px;margin:0;padding:0;' src='" + data + "' />");
        }
    });
    //加载控制轮播图片的圆点链接事件
    $.ajax({
        url: "../front_Page/ashx/front_ChangeImg.ashx",
        type: "get",
        success: function (length) {
            var html = "<a class='a_click_style a_round' id='0' href='javascript:;'>";
            for (var i = 1; i < parseInt(length) ; i++) {
                html += "<a class='a_round' id='" + i + "' href='javascript:;'></a>";
            }
            $(".dots").html(html);
            //圆点链接点击切换图片事件
            $(".a_round").click(function () {
                clearInterval(id);
                var $this = $(this);
                if ($this.hasClass("a_click_style"))
                    return;
                var index = $this.attr("id");
                $.ajax({
                    url: "../front_Page/ashx/front_setImg.ashx",
                    type: "get",
                    data: { Index: index },
                    success: function (data) {
                        $(".img").attr("src", data);
                        $(".dots a[class='a_click_style a_round']").removeClass("a_click_style");
                        $(".dots a[class='a_click_style']").removeClass("a_click_style");
                        $(".dots a[class='']").addClass("a_round");
                        $this.removeClass("a_round");
                        $this.addClass("a_click_style");
                        id = setInterval("test()", 5000);
                    }
                });
            });
            //圆点链接悬浮事件
            $(".a_round").hover(function () {
                if ($(this).hasClass("a_click_style")) {
                    $(this).removeClass("a_hover_style");
                    return;
                }
                $(this).toggleClass("a_hover_style");
            });
        }
    });

    //切换上一张图片按钮悬浮事件
    $("#img-prev").hover(function () {
        $("#img-prev").attr("src", "../images/prev_b.png");
    }, function () {
        $("#img-prev").attr("src", "../images/prev_w.png");
    });
    //切换下一张图片按钮悬浮事件
    $("#img-next").hover(function () {
        $("#img-next").attr("src", "../images/next_b.png");
    }, function () {
        $("#img-next").attr("src", "../images/next_w.png");
    });

    //切换上一张图片按钮点击事件
    $("#img-prev").click(function () {
        clearInterval(id);
        prevImg();
        id = setInterval("test()", 5000);
    });
    //切换下一张图片按钮点击事件
    $("#img-next").click(function () {
        clearInterval(id);
        nextImg();
        id = setInterval("test()", 5000);
    });




});

function prevImg() {
    var img = $(".img").attr("src");
    $.ajax({
        url: "../front_Page/ashx/front_ChangeImg.ashx",
        type: "get",
        data: { img: img, Id: "0" },
        success: function (data) {
            var arr = data.split(",");
            $(".img").attr("src", arr[0]);
            $(".dots a[class='a_click_style a_round']").removeClass("a_click_style");
            $(".dots a[class='a_click_style']").removeClass("a_click_style");
            $(".dots a[class='']").addClass("a_round");
            $("#" + arr[1] + "").removeClass("a_round");
            $("#" + arr[1] + "").addClass("a_click_style");
        }
    });
}

function nextImg() {
    var img = $(".img").attr("src");
    $.ajax({
        url: "../front_Page/ashx/front_ChangeImg.ashx",
        type: "get",
        data: { img: img, Id: "1" },
        success: function (data) {
            var arr = data.split(",");
            $(".img").attr("src", arr[0]);
            $(".dots a[class='a_click_style a_round']").removeClass("a_click_style");
            $(".dots a[class='a_click_style']").removeClass("a_click_style");
            $(".dots a[class='']").addClass("a_round");
            $("#" + arr[1] + "").removeClass("a_round");
            $("#" + arr[1] + "").addClass("a_click_style");
        }
    });
}
function test() {
    $(".img").fadeOut(200, nextImg).fadeIn(100);
}
//setTimeout(test, 5000);
id = window.setInterval("test()", 5000);