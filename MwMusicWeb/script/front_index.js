$(function () {

    //母版页导航标签点击样式事件
    $(".li-navigation").click(function () {
        if ($(this).hasClass("li_click")) {
            return;
        }
        else {
            $(".li-navigation[class~=li_click]").removeClass("li_click");
            if ($(this).hasClass("li_hover"))
                $(this).removeClass("li_hover");
            $(this).addClass("li_click");
        }
    });
    //母版页导航标签悬停样式事件
    $(".li-navigation").hover(function () {
        if ($(this).hasClass("li_click")) {
            return;
        }
        $(this).toggleClass("li_hover");
    })

    //文本框搜索图标点击事件
    $("#ico-find").click(function () {
        alert("11");
    });

    //登录窗体
    $("#aLogin").click(function () {
        $.ajax({
            url: "../front_Page/ashx/front_login.ashx",
            type: "get",
            success: function (data) {
                if (data == "none") {   //未登录
                    $("#openModal").css("display", "block");
                    $("#divRegister").css("display", "none");
                    $("#divFindPwd").css("display", "none");
                    $("#divLogin").css("display", "block");
                    var height = $("body").height();
                    $("#openModal").css("height", height + "px");
                }
                else {
                    return;
                }
            }
        });
    });
    //免费注册
    $("#aRegister").click(function () {
        $("#divLogin").css("display", "none");
        $("#divFindPwd").css("display", "none");
        $("#divRegister").css("display", "block");
    });
    //忘记密码
    $("#aFindPwd").click(function () {
        $("#divLogin").css("display", "none");
        $("#divRegister").css("display", "none");
        $("#divFindPwd").css("display", "block");
    });
    //关闭登录/注册/找回密码
    $(".aClose").click(function () {
        $("#openModal").css("display", "none");
        $("#divLogin").css("display", "none");
        $("#divRegister").css("display", "none");
        $("#divFindPwd").css("display", "none");
    });
    //返回登录
    $(".aRlogin").click(function () {
        $("#divRegister").css("display", "none");
        $("#divFindPwd").css("display", "none");
        $("#divLogin").css("display", "block");
    })



})

//框架自适应高度
function iframeAutoHeight() {
    var iframe = document.getElementById("iframe-Main");
    if (navigator.userAgent.indexOf("MSIE") > 0 || navigator.userAgent.indexOf("rv:11") > 0 || navigator.userAgent.indexOf("Firefox") > 0) {
        iframe.height = iframe.contentWindow.document.body.scrollHeight;
    } else {
        iframe.height = iframe.contentWindow.document.documentElement.scrollHeight;
    }
};