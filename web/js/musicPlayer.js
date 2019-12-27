/**
 * Created by Administrator on 2019/12/18.
 */
(function(){
    /*
    * 播放器控件
    */
    var audioPlayer = null;
    /*
    * 进度条组件
    */
    var slider = null;
    var buffer = null;
    var processor = null;
    var conroller = null;
    /*
    * 数据
    */
    var playState = {
        PRELOAD:0,
        LOADED:1,
        PLAYING:2,
        PAUSE:3,
        END:4,
        CHANGE:5
    };
    curState = playState.PRELOAD;

    var lastSong = "";
    var curSong = "";

    window.onload = function(){
        //自定义播放器组件
        audioPlayer = document.getElementById("musicPlayer");
        /*
        * 按钮事件
        * */
        lastBtn = document.getElementById("last");
        playBtn = document.getElementById("play");
        nextBtn = document.getElementById("next");

        //进度条
        slider = document.querySelector(".slider");
        buffer = document.querySelector(".buffer");
        processor = document.querySelector(".processor");
        conroller = document.querySelector(".controller");
        //进度条控制
        conroller.onmousedown = function (e){
            var x=(e||window.event).clientX;
            var l = this.offsetLeft;
            var max = slider.offsetWidth - this.offsetWidth;
            document.onmousemove=function (e){
                var thisX = (e||window.event).clientX;
                var to = Math.min(max,Math.max(-2,l+(thisX-x)));
                conroller.style.left=to+'px';
                if(curState == playState.PLAYING || curState == playState.PAUSE){

                }
                ondrag(Math.round(Math.max(0,to/max)*100),to);
                window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            };
            document.onmouseup=new Function('this.onmousemove=null');
        };


        $('.result').css('opacity',0);
        window.songList = document.querySelector('.songlist__list');
    };

    controlMusic = function(url){
        var resUrl = "";
        if(!url){
            curSong = curSong;
        }else{
            if(url!=curSong && curState!=playState.END){
                curState = playState.CHANGE;
            }
            else if(url == curSong && curState != playState.PLAYING){
                curState = playState.PAUSE
            }
            curSong = url;
        }
        switch (curState){
            case playState.PRELOAD:
            case playState.CHANGE:
                resUrl = curSong;
                if(resUrl == ""){
                    alert("没有可以播放的音频")
                    return;
                }
                audioPlayer.src = resUrl;
                audioPlayer.load();
                curSong = audioPlayer.src;
                break;
            case playState.LOADED:
                break;
            case playState.PLAYING:
                curState = playState.PAUSE;
                pauseMusic();
                break;
            case playState.PAUSE:
                curState = playState.PLAYING;
                playMusic();
                break;
            case playState.END:
                resetModule();
                if(lastSong == curSong){
                    curState = playState.PLAYING;
                    playMusic();
                    progressBar();
                }else{
                    curState = playState.PRELOAD;
                    resUrl = curSong;
                    audioPlayer.src = resUrl;
                    audioPlayer.load();
                    curSong = audioPlayer.src;
                }
                break;
        }
        /*
         * 监听资源是否加载完成
         * */
        audioPlayer.onloadeddata = function(){
            curState = playState.LOADED;
            progressBar();
        };
        /*
         * 监听播放器是否可以播放
         * */
        audioPlayer.oncanplay = function(){
            curState = playState.PLAYING;
            playMusic();
            // progressBar();
        };
        /*
        * 监听音频是否播放完成
        * */
        audioPlayer.onended = function(){
            curState = playState.END;
            lastSong = curSong;
            stopMusic();
        }

    };

    function playMusic(){
        if(playBtn){
            playBtn.src = "res/pause.png";
        }
        audioPlayer.play();
    }

    function pauseMusic(){
        if(playBtn){
            playBtn.src = "res/play.png";
        }
        audioPlayer.pause();
    }

    function stopMusic(){
        if(playBtn){
            playBtn.src = "res/play.png";
        }
    }

    function ondrag(pos,x){
        // this.step.style.width=Math.max(0,x)+'px';
        // this.title.innerHTML=pos+'%';
        audioPlayer.currentTime = x/reg;

    }

    function progressBar(){
        var musiclength = audioPlayer.duration;
        var sliderlength = slider.offsetWidth - conroller.offsetWidth;
        window.reg =  sliderlength/musiclength;
        var timerID = setInterval(function(){
            var cur = audioPlayer.currentTime;
            var curLength = cur * reg;
            processor.style.width = curLength + 'px';
            var to = curLength;
            conroller.style.left = to + 'px';
            console.log(cur);
            if(cur >= musiclength){
                clearInterval(timerID);
            }
        },1000);

        var timer = setInterval(function(){
            var step = 0.05;
            var sw = slider.offsetWidth;
            var w = buffer.offsetWidth;

            buffer.style.width = w + sw * step + "px";
            if(w+sw*step >= sw){
                buffer.style.width = sw + 'px';
                clearInterval(timer);
            }
        })
    }

    function resetModule(){
        $('.controller').css('left','-7px');
        processor.style.width = '0px';
    }

    function refreshPlayTimes(){

    }
})();