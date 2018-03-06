(function () {
    var myMusic = (function () {

        var music = function () {
            //音频文件接口：用来监听音乐的播放
            window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

            //请求动画帧
            window.requestAnimationFrame = window.requestAnimationFrame ||
                                    window.webkitRequestAnimationFrame ||
                                window.mozRequestAnimationFrame ||
                                window.msRequestAnimationFrame;

            //音量控制
            var vol_btn = document.getElementById("vol-dot");
            var vol_box = document.getElementById("d_vol_box");
            var vol_size = document.getElementById("d_vol_size");
            var vol_con = document.getElementById("vol-con");

            //播放进度控制
            var prog_btn = document.getElementById("a_playProg");
            var prog_play = document.getElementById("play_prog");
            var prog_size = document.getElementById("d_playProgress");
            var prog_con = document.getElementById("d_playerBox");
            //播放控制
            var a_prev = document.getElementById("a_prev");
            var a_play = document.getElementById("a_play");
            var a_next = document.getElementById("a_next");
            var a_playState = document.getElementById("a_playState");
            var d_playTime = document.getElementById("d_playTime");
            var d_countTime = document.getElementById("d_countTime");
            var d_noVol = document.getElementById("d_volumeSpeaker");

            var s_list = document.getElementById("d_playlistViewCont");
            var $songs = s_list.getElementsByTagName("li");
            var lrc = data[0].lrc;
            var play = true;
            var $audio = new Audio();
            var n = 0;
            var m = 0;
            var arr = [];

            var jsons = {
                init: function () {      //初始化
                    s_list.innerHTML = jsons.templateLists(data);
                    jsons.playMusic();
                },
                playMusic: function () { //播放音乐
                    var _this = this;
                    //播放、暂停
                    a_play.onclick = function () {
                        if (play) {
                            if ($audio.src)
                                $audio.play();
                            else {
                                _this.playing(0);
                                play = true;
                                $(".d-m-row-item").eq(0).addClass("d-m-current-item");
                            }
                            this.classList.remove("pause-btn");
                            $("#main_middle").addClass("play");
                        }
                        else {
                            $audio.pause();
                            this.classList.add("pause-btn");
                            $("#main_middle").removeClass("play");
                        }
                        play = !play;
                        d_countTime.innerHTML = time($audio.duration);
                    };
                    //上一首
                    a_prev.onclick = function () {
                        $(".d-m-row-item").removeClass("d-m-current-item");
                        var state = $("#a_playState").attr("class");
                        switch (state) {
                            case "state-order":
                            case "state-only":
                                n--;
                                if (n < 0) n = data.length - 1;
                                _this.playing(n);
                                $(".d-m-row-item").eq(n).addClass("d-m-current-item");
                                break;
                            case "state-random":        //随机播放？？？
                                m--;
                                if (m < 0) m = data.length - 1;
                                _this.playing(arr[m]);
                                $(".d-m-row-item").eq(arr[m]).addClass("d-m-current-item");
                                break;
                        }
                    };
                    //下一首
                    a_next.onclick = function () {
                        $(".d-m-row-item").removeClass("d-m-current-item");
                        var state = $("#a_playState").attr("class");
                        switch (state) {
                            case "state-order":
                            case "state-only":
                                n++;
                                if (n > data.length - 1) n = 0;
                                _this.playing(n);
                                $(".d-m-row-item").eq(n).addClass("d-m-current-item");
                                break;
                            case "state-random":
                                n++;
                                if (n > data.length - 1) n = 0;
                                _this.playing(arr[n]);
                                $(".d-m-row-item").eq(arr[n]).addClass("d-m-current-item");
                                break;
                        }

                    };
                    //点击播放
                    _this.listsPlay();
                    //播放完自动跳转
                    $audio.addEventListener("ended", function () {
                        var state = $("#a_playState").attr("class");
                        switch (state) {
                            case "state-order":
                                n++;
                                if (n > data.length - 1) n = 0;
                                _this.playing(n);
                                break;
                            case "state-random":
                                n++;
                                if (n > data.length - 1) n = 0;
                                _this.playing(arr[n]);
                                break;
                            case "state-only":
                                _this.playing(n);
                                break;
                        }
                    }, false);
                    //当前播放时间
                    $audio.addEventListener("timeupdate", function () {
                        nowTime();
                    });

                    //播放进度条移动事件
                    prog_btn.onmousedown = function (e) {
                        var e = e || window.event;
                        var x = e.clientX - this.offsetLeft;
                        var proc = prog_con.offsetWidth;// - prog_btn.offsetWidth;
                        //alert(x + "/" + proc);
                        document.onmousemove = function (e) {
                            var w = e.clientX - x;
                            if (w <= 0)
                                w = 0;
                            if (w >= proc)
                                w = proc;
                            var proN = w / proc;
                            console.log(proN);
                            console.log(w);
                            console.log(proc);
                            console.log(w * (proc / prog_con.offsetWidth));
                            prog_play.style.width = proN * 100 + "%";
                            prog_btn.style.left = proN * 100 + "%";
                            $audio.currentTime = proN * $audio.duration;
                            //var proN = w / (vol_boxess.offsetWidth - vol_btn.offsetWidth);
                            nowTime();
                        }
                        document.onmouseup = function () {
                            document.onmousemove = null;
                            document.onmouseup = null;
                        }
                        return false;
                    }
                    //播放进度条阻止冒泡
                    prog_btn.onclick = function (e) {
                        e.stopPropagation();
                    }
                    //播放进度条点击事件
                    prog_con.onclick = function (e) {
                        var w = e.offsetX;
                        var proc = prog_con.offsetWidth;// - prog_btn.offsetWidth;
                        if (w <= 0)
                            w = 0;
                        if (w >= proc)
                            w = proc;
                        var proN = w / proc;
                        console.log(proN);
                        console.log(w);
                        console.log(proc);
                        console.log(w * (proc / prog_con.offsetWidth));
                        prog_play.style.width = proN * 100 + "%";
                        prog_btn.style.left = proN * 100 + "%";
                        $audio.currentTime = proN * $audio.duration;
                        nowTime();
                        return false;
                    }

                    //音量控制条移动事件
                    vol_btn.onmousedown = function (e) {
                        e.stopPropagation();

                        var e = e || window.event;
                        var x = e.clientX - this.offsetLeft;
                        var vol = vol_box.offsetWidth - vol_btn.offsetWidth;
                        document.onmousemove = function (e) {
                            var w = e.clientX - x;
                            if (w <= 0) {
                                w = 0;
                                $("#d_volumeSpeaker").addClass("volume-off");
                            }
                            if (w >= vol) {
                                w = vol;
                                $("#d_volumeSpeaker").removeClass("volume-off");
                            }
                            var proN = w / (vol);
                            vol_size.style.width = proN * 100 + "%";
                            vol_btn.style.left = proN * 100 + "%";
                            $audio.volume = proN;
                            if (proN > 0) {
                                $("#d_volumeSpeaker").removeClass("volume-off");
                            }
                            else {
                                $("#d_volumeSpeaker").addClass("volume-off");
                            }
                        }
                        document.onmouseup = function () {
                            document.onmousemove = null;
                            document.onmouseup = null;
                        }
                        if (vol_btn.style.left != "0%")
                            $("#d_volumeSpeaker").data("x", vol_btn.style.left);

                        return false;
                    }
                    //音量控制条阻止冒泡
                    vol_btn.onclick = function (e) {
                        e.stopPropagation();
                    }
                    //音量控制条点击事件
                    vol_con.onclick = function (e) {
                        var w = e.offsetX;
                        var vol = vol_box.offsetWidth - vol_btn.offsetWidth;
                        if (w <= 0) {
                            w = 0;
                            $("#d_volumeSpeaker").addClass("volume-off");
                        }
                        if (w >= vol) {
                            w = vol;
                            $("#d_volumeSpeaker").removeClass("volume-off");
                        }
                        var proN = w / (vol);
                        vol_size.style.width = proN * (vol / vol_box.offsetWidth) * 100 + "%";
                        vol_btn.style.left = proN * (vol / vol_box.offsetWidth) * 100 + "%";
                        $audio.volume = proN;
                        if (proN > 0) {
                            $("#d_volumeSpeaker").removeClass("volume-off");
                        }
                        else {
                            $("#d_volumeSpeaker").addClass("volume-off");
                        }
                        if (vol_btn.style.left != "0%")
                            $("#d_volumeSpeaker").data("x", vol_btn.style.left);
                        return false;
                    }

                    //存取音量初始值
                    $("#d_volumeSpeaker").data("x", vol_btn.style.left);

                    //静音按钮事件
                    $("#d_volumeSpeaker").click(function () {
                        var x = $(this).data("x");
                        if ($(this).hasClass("volume-off")) {
                            $(this).removeClass("volume-off");
                            vol_btn.style.left = x;
                            vol_size.style.width = x;
                            var vol = (x.split('%')[0]) / 100;
                            $audio.volume = vol;
                        }
                        else {
                            $(this).addClass("volume-off");
                            vol_btn.style.left = 0;
                            vol_size.style.width = 0;
                            $audio.volume = 0;
                        }
                    });

                    //播放顺序按钮事件
                    $("#a_playState").click(function () {
                        var c = $(this).attr("class");
                        switch (c) {
                            case "state-order":
                                $(this).removeClass("state-order").addClass("state-random").attr("title", "随机播放");
                                main(data.length);
                                console.log(arr);
                                m = n;
                                n = -1;  //待注释
                                //随机换正常后的顺序问题

                                break;
                            case "state-random":
                                if (n == -1)
                                    n = m;
                                else
                                    n = arr[n];
                                $(this).removeClass("state-random").addClass("state-only").attr("title", "单曲循环");
                                break;
                            case "state-only":
                                $(this).removeClass("state-only").addClass("state-order").attr("title", "顺序播放");
                                break;
                        }
                    });

                    //收藏按钮事件
                    $("#a_collect").click(function () {
                        $(this).toggleClass("ico-favar");
                        if ($(this).attr("title") == "收藏") {
                            $(this).attr("title", "取消收藏");
                        }
                        else {
                            $(this).attr("title", "收藏");
                        }
                    });

                    //设置时间
                    function nowTime() {
                        d_playTime.innerHTML = time($audio.currentTime);
                        var n = $audio.currentTime / $audio.duration;
                        prog_btn.style.left = n * 100 + "%";
                        prog_play.style.width = n * 100 + "%";
                    }

                    //设置随机播放
                    function main(n) {
                        //返回min到max的整数，包括min,max
                        arr = [];
                        function getRandomInt(min, max) {
                            return Math.floor(Math.random() * (max - min + 1) + min);
                        }
                        function initArray() {
                            for (var i = 0; i < n; i++) {
                                arr.push(i);
                            }
                        }

                        function shuffle() {
                            for (var i = n - 1; i > 0; i--) {
                                var j = getRandomInt(0, i);
                                var t = arr[i];
                                arr[i] = arr[j];
                                arr[j] = t;
                            }
                        }
                        initArray();
                        shuffle();
                    }


                    //歌词同步
                    //
                },
                //点击列表播放
                listsPlay: function () {
                    var _this = this;
                    var $songs = s_list.getElementsByClassName("d-m-row-item");
                    var songs = $(".d-m-row-item");
                    for (var i = 0; i < $songs.length; i++) {
                        (function (index) {

                            var time = null;

                            songs.eq(index).click(function (e) {
                                var obj = $(this);
                                // 取消上次延时未执行的方法
                                clearTimeout(time);
                                //执行延时
                                time = setTimeout(function () {
                                    //do function在此处写单击事件要执行的代码
                                    var s = !obj.find(".item-chk").prop("checked");
                                    obj.find(".item-chk").prop("checked",s);
                                }, 300);
                            });

                            songs.eq(index).dblclick(function () {
                                // 取消上次延时未执行的方法
                                clearTimeout(time);
                                //双击事件的执行代码
                                $(this).addClass("d-m-current-item");
                                songs.not(this).removeClass("d-m-current-item");
                                n = index;
                                _this.playing(n);
                                $("#main_middle").addClass("play");
                            });

                        })(i);
                    }
                },
                //播放总方法
                playing: function (n) {
                    $audio.src = data[n].src;
                    //$audio.src = data[n].src;
                    a_play.classList.remove("pause-btn");
                    play = false;
                    $("#a_musicTitle").text(data[n].name).attr({ "title": data[n].name, "href": "http://www.baidu.com" });
                    $("#a_singer").text(data[n].singer).attr({ "title": data[n].singer, "href": "http://www.baidu.com" });
                    var x = $("#d_volumeSpeaker").data("x");
                    var vol = (x.split('%')[0]) / 100;
                    $audio.volume = vol;
                    $audio.play();  //播放
                    this.load();    //加载 监听
                },
                //监听歌曲是否完成
                load: function () {
                    $audio.addEventListener("canplay", function () {
                        d_countTime.innerHTML = time($audio.duration);
                    }, false);
                },
                //清除样式

                //歌词同步

                //音乐搜索

                //点击搜索列表 播放歌曲+获取歌词：

                //音频节点分析,并创建canvas音频
                templateLists: function (data) {
                    var html = "";
                    for (var i = 0; i < data.length; i++) {
                        //html += "<li>" +
                        //        "<a href='javascript:void(0)'>" + data[i].name + "</a>" +
                        //        "</li>";

                        html += "<div class='d-m-row-item d-m-track-item'>" +
                                  "<div class='d-track-main'>" +
                                      "<div class='d-item-chks'>" +
                                          "<input type='checkbox' class='item-chk' />" +
                                      "</div>" +
                                      "<div class='d-item-id'>" +
                                          "<em>"+(i+1)+"</em>" +
                                      "</div>" +
                                      "<div class='d-row-item'>" +
                                          "<div class='d-row-item-col c1'><a title='" + data[i].name + "'>" + data[i].name + "</a></div>" +
                                          "<div class='d-row-item-co1 c2'><a title='" + data[i].singer + "'>" + data[i].singer + "</a></div>" +
                                          "<div class='d-row-item-co1 c3'><a title='" + data[i].album + "'>" + data[i].album + "</a></div>" +
                                      "</div>" +
                                      "<div class='d-item-control'>" +
                                          "<a class='fav-btn icon-track-fav' data-type='' data-event='collect' title='收藏'></a>" +
                                          "<a class='more-btn icon-track-more' title='更多'></a>" +
                                          "<a class='delete-btn icon-track-delete' title='删除'></a>" +
                                      "</div>" +
                                  "</div>" +
                                  "<div class='d-roam-wrap'>"+
                                      "<div class='d-roam-head'>"+
                                          "<a class='a-roam-open' data-event='roam'>漫游相似歌曲</a>"+
                                      "</div>"+
                                  "</div>" +
                              "</div>";


                    }
                    return html;
                }
            };

            //设置时间格式
            function time(cTime) {
                cTime = parseInt(cTime);
                var m = formatData(Math.floor(cTime % 3600 / 60));
                var s = formatData(Math.floor(cTime % 60));
                return m + ":" + s;
            }
            function formatData(num) {
                return num < 10 ? "0" + num : '' + num;
            }
            return jsons.init();

        }
        return music;


    })();
    window.myMusic = myMusic;       //返回接口调用
})();
