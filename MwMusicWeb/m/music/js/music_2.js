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
            var $audio = $("audio");
            var playBtn = $("play");
            var search = $("search");
            var prev = $("prev");
            var next = $("next");
            var slists = $("s-lists");
            var $songs = slists.getElementsByTagName("li");
            var mark = true;
            var n = 0;

            //快进
            var wp_processBar = $("wp_processBar");
            var wp_processBtn = $("wp_processBtn");
            var wp_playTime = $("wp_playTime");
            var wp_process = $("wp_process");
            var totalTime = $("totalTime");
            var txt = data[0].lrc;//保存歌词
            var lrcCon = $("lrcCon");

            //音量控制
            var vol_btn = $("vol-btn");
            var vol_bar = $("vol-bar");
            var vol_process = $("vol-process");
            var volume_mute = $("volume-mute");

            var jsons = {
                init: function () { //初始化
                    slists.innerHTML = jsons.templateLists(data);
                    jsons.playMusic();
                    //jsons.searchMusic();
                    //this.analyserMus();
                },

                playMusic: function () { //播放音乐
                    var _this = this;
                    //播放、暂停
                    playBtn.onclick = function () {
                        if (mark) {
                            $audio.play();
                            _this.clearOtherStyle(n);
                            this.classList.add("play");
                        } else {
                            $audio.pause();
                            this.classList.remove("play");
                        }
                        mark = !mark;
                        totalTime.innerHTML = time($audio.duration);
                    };

                    //上一曲:
                    prev.onclick = function () {
                        n--;
                        if (n < 0) n = data.length - 1;
                        _this.playing(n);
                    }

                    //下一曲
                    next.onclick = function () {
                        n++;
                        if (n > data.length - 1) n = 0;
                        _this.playing(n);
                    }
                    // 点击播放
                    _this.clickLists();

                    //播放完成自动跳转
                    $audio.addEventListener("ended", function () {
                        n++;
                        if (n > data.length - 1) n = 0;
                        _this.playing(n);
                    }, false);

                    //当前播放时间
                    $audio.addEventListener("timeupdate", function () {
                        nowTime();
                    });

                    //快进
                    wp_processBtn.onmousedown = function (ev) {
                        var ev = ev || window.event;
                        var x = ev.clientX - this.offsetLeft;
                        document.onmousemove = function (ev) {
                            var _left = ev.clientX - x;
                            if (_left <= 0) {
                                _left = 0;
                            }
                            if (_left >= wp_process.offsetWidth - wp_processBtn.offsetWidth) {
                                _left = wp_process.offsetWidth - wp_processBtn.offsetWidth;
                            }
                            wp_processBtn.style.left = _left + "px";
                            wp_processBar.style.width = _left + "px";
                            var proN = _left / (wp_process.offsetWidth - wp_processBtn.offsetWidth);
                            $audio.currentTime = proN * $audio.duration;
                            nowTime();
                        }
                        document.onmouseup = function () {
                            document.onmousemove = null;
                            document.onmouseup = null;
                        }
                        return false;
                    }

                    //音量控制
                    vol_btn.onmousedown = function (ev) {
                        var ev = ev || window.event;
                        var x = ev.clientX - this.offsetLeft;
                        document.onmousemove = function (ev) {
                            var w = ev.clientX - x;
                            if (w <= 0) {
                                w = 0;
                            }
                            if (w >= vol_process.offsetWidth - vol_btn.offsetWidth) {
                                w = vol_process.offsetWidth - vol_btn.offsetWidth;
                            }
                            vol_bar.style.width = w + "px";
                            vol_btn.style.left = w + "px";
                            var proN = w / (vol_process.offsetWidth - vol_btn.offsetWidth);
                            $audio.volume = proN;
                            nowTime();
                        }
                        document.onmouseup = function () {
                            document.onmousemove = null;
                            document.onmouseup = null;
                        }
                        return false;
                    }

                    //静音
                    volume_mute.onclick = function () {
                        $audio.volume = 0;
                        vol_bar.style.width = 0;
                        vol_btn.style.left = 0;
                    };

                    //设置时间
                    function nowTime() {
                        wp_playTime.innerHTML = time(audio.currentTime);
                        var n = $audio.currentTime / $audio.duration;
                        wp_processBtn.style.left = n * (wp_process.offsetWidth - wp_processBtn.offsetWidth) + "px";
                        wp_processBar.style.width = n * (wp_process.offsetWidth - wp_processBtn.offsetWidth) + "px";
                    }
                    //歌词同步
                    _this.currentLrc();
                },


                //点击列表播放
                clickLists: function () {
                    //点击列表播放
                    var _this = this;
                    var $songs = $("s-lists").getElementsByTagName("li");
                    for (var i = 0; i < $songs.length; i++) {
                        (function (index) {
                            $songs[index].onclick = function () {
                                n = index;
                                _this.playing(n);
                            }
                        })(i);
                    }
                    
                },

                //播放总方法
                playing: function (n) {
                    this.clearOtherStyle(n); //清楚选中列表的样式
                    $audio.src = data[n].src; //获取播放url
                    txt = data[n].lrc; //获取歌词
                    playBtn.classList.add("play");
                    mark = false;
                    this.currentLrc(); //歌词同步 初始化
                    $audio.play(); //播放
                    this.load(); //加载 监听
                },
                //监听歌曲是否完成
                load: function () {
                    $audio.addEventListener("canplay", function () {
                        totalTime.innerHTML = time(audio.duration);
                    }, false);
                },
                //清除样式
                clearOtherStyle: function (n) {
                    for (var i = 0; i < $songs.length; i++) {
                        $songs[i].classList.remove("active");
                    }
                    $songs[n].classList.add("active");
                },
                //歌词同步
                currentLrc: function () {
                    var lrcArr = txt.split("[");
                    //console.log(lrcArr);
                    var html = '';
                    for (var i = 0; i < lrcArr.length ; i++) {
                        var arr = lrcArr[i].split("]");
                        //console.log(arr);
                        var time = arr[0].split(".");
                        var timer = time[0].split(":");
                        //console.log(timer);
                        var ms = timer[0] * 60 + timer[1] * 1;//将时间转换为秒
                        //console.log(ms);
                        var text = arr[1];//歌词内容
                        if (text) {
                            html += "<p id=gc" + ms + ">" + text + "</p>"
                        }
                        lrcCon.innerHTML = html;
                    }
                    var sum = 0;
                    var curTime = 0;
                    var oP = lrcCon.getElementsByTagName("p");
                    for (var i = 0; i < oP.length; i++) {
                        oP[i].style.display = 'none';
                    }
                    $audio.addEventListener("timeupdate", function () {
                        curTime = parseInt(this.currentTime);//获取当前播放的时间
                        if (document.getElementById("gc" + curTime)) {
                            for (var i = 0; i < oP.length ; i++) {
                                oP[i].style.display = "none";
                            }
                            document.getElementById("gc" + curTime).style.display = "block";
                        }
                    });
                },
                templateLists: function (data) { //歌曲列表模板
                    var html = "";
                    for (var i = 0; i < data.length; i++) {
                        html += '<li> ' +
								'	<a href="javascript:void(0)">' + data[i].name + '</a>' +
								'</li>';
                    }
                    return html;
                }
            };
            function $(id) {
                return document.getElementById(id);
            }
            String.prototype.trim = function () { //去掉左右空格
                return this.replace(/(^\s*)|(\s*$)/g, "");
            }
            //设置时间格式
            function time(cTime) {
                cTime = parseInt(cTime);
                //var h = formatData(Math.floor(cTime/3600));
                var m = formatData(Math.floor(cTime % 3600 / 60));
                var s = formatData(Math.floor(cTime % 60));
                return m + ":" + s;
            }
            function formatData(num) {
                return num < 10 ? "0" + num : ' ' + num;
            }
            return jsons.init();
        };
        return music;
    })();
    window.myMusic = myMusic; // 返回接口调用
})();
