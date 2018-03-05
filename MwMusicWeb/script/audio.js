 (function ($) {

    var fnName = 'audioPlay';
    var config = {

        view: ".audio-view",        //播放器

        title: ".audio-title",      //歌曲名称

        cover: ".audio-cover",      //歌曲海报

        autoPlay: false,

        volume: {

            volumeView: ".audio-set-volume",    //隐藏的音量控制
            volumeBox: ".volume-box",           //音量条
        },

        timeView: {

            thisTime: ".audio-this-time",       //播放时长

            countTime: '.audio-count-time',     //总时长
        },

        setbacks: {

            setbacks: '.audio-setbacks',            //播放进度控制条

            thisSetbacks: '.audio-this-setbacks',   //已播放进度

            cacheSetbacks: ".audio-cache-setbacks", //播放时长缓存

            volumeSetbacks: ".volume-box > i",      //已播放进度2

            volumeCircular: ".volume-box > i span"  //控制播放进度
        },

        button: {

            volume: ".audio-volume",        //音量按钮

            backs: ".audio-backs-btn",      //控制播放进度

            prev: ".audio-prev",            //上一首按钮

            play: ".audio-play",            //播放按钮

            next: ".audio-next",            //下一首按钮

            menu: ".audio-menu",            //歌单按钮  

            menuClose: ".menu-close"        //关闭歌单
        },

        menu: {

            menuView: '.audio-list',        //歌单列表div

            colse: '.close',

            list: '.audio-inline'           //歌单列表ul
        },

        song: null
    };

    var songEq = 0,     //当前歌曲索引
		volumeSize = 0.7;


    window[fnName] = function (setConfig) {

        //设置属性值
        if (typeof (setConfig) == "object") {

            for (var n in setConfig) {

                config[n] = setConfig[n];
            }
        }

        var _this = config, playDate;


        var cover = $(_this.cover),
			title = $(_this.title),
			thisTime = $(_this.timeView.thisTime),
			countTime = $(_this.timeView.countTime),
			thisSetbacks = $(_this.setbacks.thisSetbacks),
			cacheSetbacks = $(_this.setbacks.cacheSetbacks),
			setbacks = $(_this.setbacks.setbacks),
			volumeCircular = $(_this.setbacks.volumeCircular),
			volumeSetbacks = $(_this.setbacks.volumeSetbacks),
			volumeBox = $(_this.volume.volumeBox),
			play = $(_this.button.play),
			prev = $(_this.button.prev),
			next = $(_this.button.next),
			menuBtn = $(_this.button.menu),
			volume = $(_this.button.volume),
			menuClose = $(_this.button.menuClose),
			backs = $(_this.button.backs);

        _this.createAudio = function () {   //创建播放器

            if (!_this.audio) {

                _this.audio = new Audio();
            }

            var song = config.song;         //获取歌曲
            if (!song) {

                alert('当前歌单没有歌曲!!!');
                return false;
            }

            _this.stopAudio();
            _this.audio.src = song[songEq].src;     //获取歌曲路径

            _this.volumeSet();      //设置声音

            title.text(song[songEq].title || '未知歌曲');   //显示歌曲名称
            cover.css({
                'backgroundImage': 'url(' + (song[songEq].cover || '') + ')'        //设置歌曲图片
            });

            function setDuration() {

                if (isNaN(_this.audio.duration)) {

                    setTimeout(setDuration, 50);        // ?
                } else {

                    countTime.text(_this.conversion(_this.audio.duration));     // ?
                }
            }
            setDuration(_this.audio.duration);

            thisTime.text(_this.conversion(_this.audio.currentTime));   //已播放时间标签

            _this.audio.onended = function () {     //当前歌曲播放结束事件

                setTimeout(function () {

                    ++songEq;   //歌曲下标
                    songEq = (songEq < _this.song.length) ? songEq : 0; //设置歌曲下标
                    _this.selectMenu(songEq, true);     // ?
                }, 1000);
            }

        }



        //?

        var timeAudio;
        _this.playAudio = function () {

            if (_this.audio) {

                if (!playDate || (Date.now() - playDate) > 100) {

                    playDate = Date.now();      //播放时间等于当前时间毫秒值

                    (!_this.audio.paused) || _this.audio.pause();           //正在播放歌曲则暂停 

                    _this.audio.play();
                    play.addClass('audio-stop').one('click', function () {  //给暂停按钮添加一次事件

                        _this.stopAudio();
                        $(this).removeClass('audio-stop').one('click', function () {    //给播放按钮添加一次事件

                            _this.playAudio();
                        });
                    });
                    
                    timeAudio = setInterval(function () {
                        //readyState:返回音频的当前就绪状态  4：表示有足够的数据来开始播放音频
                        if (_this.audio.readyState == 4) {

                            cacheSetbacks.css({
                                'width': (_this.audio.buffered.end(0) / _this.audio.duration) * 100 + "%"
                            });
                        }

                        thisSetbacks.css({
                            'width': (_this.audio.currentTime / _this.audio.duration) * 100 + "%"
                        });

                        thisTime.text(_this.conversion(_this.audio.currentTime));
                    }, 50);
                } else {

                    setTimeout(function () {
                        _this.playAudio();
                    }, 50);
                }
            }
        }

        _this.stopAudio = function () {     //停止播放

            if (!playDate || (Date.now() - playDate) > 100) {

                playDate = Date.now();      //播放时间等于当前时间毫秒值
                _this.audio.pause();        //暂停播放
                clearInterval(timeAudio);   //清除播放时间事件
            } else {

                setTimeout(function () {

                    _this.stopAudio();
                }, 50);
            }
        }

        _this.conversion = function (num) {

            function changInt(num) {

                return (num < 10) ? '0' + num : num;
            }

            return changInt(parseInt(num / 60)) + ":" + changInt(Math.floor(num % 60));
        }

        _this.upMenu = function () {    //设置播放列表

            var song = _this.song,      //获取歌曲列表
				inline = $(_this.menu.list).empty();    //获取歌单列表ul

            for (var i in song) {       //将歌曲追加到歌单列表

                inline.append("<li><a href='javascript:;'>" + (song[i].title || '未知歌曲') + "</a></li>");
            }

            inline.find(">li").unbind('click').on('click', function () {    //给歌曲添加单击事件

                _this.selectMenu($(this).index(), true);
            });
        }

        _this.selectMenu = function (num, _bool) {   //歌曲单击事件 num,歌曲在歌单中的下标，_bool是否立即播放

            songEq = num;                            //设置播放歌曲下标
            _this.createAudio();                     //重新打开播放器
            (_bool) && _this.playAudio();            //_bool为ture 播放歌曲 
        }

        _this.volumeSet = function () {

            _this.audio.volume = volumeSize;         //设置播放器音量
            volumeSetbacks.css({
                'height': volumeSize * 100 + "%"    //设置音量控制条音量高度
            });
        }

        _this.newSong = function (_new, _bool) {    //添加歌曲到歌单，_new歌曲对象，_bool是否立即播放

            if (typeof (_new) == 'object') {        //判断参数是否为一个对象

                if (_new.src) {                     //判断是否存在歌曲文件 

                    if (_this.song) {               //判断是否存在歌单

                        _this.song.push(_new);      //向歌单追加新歌曲
                    } else {
                        _this.song = [_new];        //不存在歌单则创建新歌单
                    }

                    _this.upMenu();                 //设置播放列表
                    (_bool) && _this.selectMenu(_this.song.length - 1, true);
                } else {            //不存在歌曲文件

                    alert('对象缺省src属性');
                }
            } else {                //不是歌曲对象

                alert('这不是一个对象');
            }
        }

        var volumeTime;
        volumeBox.on('mousedown', function () {     

            if (_this.audio) {
                var Y, EndY = parseInt(volumeBox.css('height')), goY;
                volumeBox.on('mousemove click', function (e) {      //音量控制条移动点击事件

                    clearTimeout(volumeTime);

                    Y = (e.clientY - (volumeBox.offset().top - $(document).scrollTop()));
                    Y = (Y > 0) ? (Y > EndY) ? EndY : Y : 0;

                    goY = Y / EndY;

                    volumeSize = 1 - goY;   //音量大小

                    _this.volumeSet();      //设置音量
                });

                volumeBox.one('mouseup', function () {

                    volumeBox.unbind('mousemove');
                }).on('mouseout', function () {

                    volumeTime = setTimeout(function () {

                        volumeBox.unbind('mousemove');
                    }, 500);
                });
            }
        });

        setbacks.on('mousedown', function () {

            if (_this.audio) {
                var X, EndX = parseInt(setbacks.css('width')), goX, mouseTime;
                setbacks.on('mousemove click', function (e) {

                    _this.stopAudio();
                    clearTimeout(mouseTime);

                    X = (e.clientX - setbacks.offset().left);
                    X = (X > 0) ? (X > EndX) ? EndX : X : 0;
                    X = (X > 0) ? ((X > EndX) ? EndX : X ): 0;
                    goX = X / EndX;
                    thisSetbacks.css({
                        'width': goX * 100 + "%"
                    });

                    _this.audio.currentTime = parseInt(goX * _this.audio.duration);
                    thisTime.text(_this.conversion(_this.audio.currentTime));
                });

                setbacks.one('mouseup', function () {

                    _this.playAudio();
                    setbacks.unbind('mousemove');
                }).on('mouseout', function () {

                    mouseTime = setTimeout(function () {

                        _this.playAudio();
                        setbacks.unbind('mousemove');
                    }, 500);
                });
            }
        });

        play.one('click', function () {

            _this.playAudio();
        });

        menuBtn.on('click', function () {

            $(_this.menu.menuView).toggleClass('menu-show');
        });

        prev.on('click', function () {

            --songEq;
            songEq = (songEq >= 0) ? songEq : _this.song.length - 1;
            _this.selectMenu(songEq, true);
        });

        next.on('click', function () {

            ++songEq;
            songEq = (songEq < _this.song.length) ? songEq : 0;
            _this.selectMenu(songEq, true);
        });

        menuClose.on('click', function () {

            $(_this.menu.menuView).removeClass('menu-show');
        });

        volume.on('click', function () {

            $(_this.volume.volumeView).toggleClass('audio-show-volume');
        });

        _this.upMenu();

        _this.selectMenu(songEq, _this.autoPlay);

        return _this;
    }
})(jQuery)