/**
 * Created by Administrator on 2019/12/10.
 */
(function(){

    window.onload=function(){
        /*
         * jquery 方法
         */
        // var testAnimation = $("#testAnimation");
        // var animationName = testAnimation.data('animation');
        // testAnimation.addClass("animated "+ animationName);
        // function handleAnimationEnd() {
        //     testAnimation.removeClass('animated '+ animationName)
        //     testAnimation.off('animationend', handleAnimationEnd)
        //     if (typeof callback === 'function') callback()
        // }
        // testAnimation.on('animationend', handleAnimationEnd)
        /*
        * 基本javascript 方法
        */
        // var AnimationNode = document.getElementById("testAnimation");
        // var animationName = AnimationNode.getAttribute("data-animation");
        // AnimationNode.classList.add("animated",animationName);
        // function handleAnimationEnd() {
        //     AnimationNode.classList.remove('animated',animationName);
        //     AnimationNode.removeEventListener('animationend', handleAnimationEnd)
        //     if (typeof callback === 'function') callback()
        // }
        // AnimationNode.addEventListener('animationend', handleAnimationEnd)

        // searchResult = document.querySelector('.result');

    };

    searchSongs = function(){
        $.ajax({
            type: "GET",
            dataType: "json",//服务器返回的数据类型
            contentType: "application/x-www-form-urlencoded",//post请求的信息格式
            url: "http://182.150.21.240:8888/musicSearch" ,
            data: $('#form1').serialize(),
            success: function (result) {
                console.log(result);//在浏览器中打印服务端返回的数据(调试用)
                if ( result.code == 200 ) {
                    refreshSonglist(result.data);
                };
            },
            error : function() {
                alert("异常！");
            }
        });
//            var xhr = new XMLHttpRequest();
//            xhr.onreadystatechange = (function () {
//                if (xhr.readyState === 4 && xhr.status === 200) {
//                    var json = JSON.parse(xhr.responseText);
//                }
//            }).bind(this);
//            xhr.open("GET", "http://localhost:8888/musicSearch", true);
//            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//            var form = document.getElementById("form1");
//            xhr.send(form.serialize());
    };

    function playMusic(mid){
        $.ajax({
            type: "GET",
            dataType: "text",//服务器返回的数据类型
            contentType: "application/x-www-form-urlencoded",//post请求的信息格式
            url: "http://182.150.21.240:8888/musicPlay" ,
            data: {mid:mid},
            success: function (url) {
                console.log(url);//在浏览器中打印服务端返回的数据(调试用)
                // if ( result.code == 200 ) {
                //     //refreshSonglist(result.data);
                // };
                controlMusic(url);
            },
            error : function() {
                alert("异常！");
            }
        });
    }

    function refreshSonglist(data){
        $('.result').css('opacity',1);
        $('.songlist__list').empty();
        for(var i in data.list){
            var music = data.list[i];
            //歌曲名称 播放按钮
            var li_song = document.createElement("li");
            li_song.setAttribute('mid',music.musicrid);
            li_song.setAttribute('ix',i);
            songList.appendChild(li_song);

            var div_song_item = document.createElement('div');
            div_song_item.className = 'songlist__item';
            li_song.appendChild(div_song_item);

            //歌曲名称
            var div_song_name = document.createElement('div');
            div_song_name.className = 'songlist__songname';
            div_song_item.appendChild(div_song_name);

            var span_name = document.createElement('span');
            span_name.className = 'songlist__songname_txt';
            span_name.innerHTML = music.name;
            div_song_name.appendChild(span_name);
            var div_mod_menu = document.createElement('div');
            div_mod_menu.className = 'mod_list_menu';
            div_song_name.appendChild(div_mod_menu);

            var a_mod_menu_item_play = document.createElement('a');
            a_mod_menu_item_play.href = "javascript:;";
            a_mod_menu_item_play.className = 'list_menu__item list_menu__add js_fav';
            a_mod_menu_item_play.title = '播放';
            div_mod_menu.appendChild(a_mod_menu_item_play);

            var li_play = document.createElement('li');
            li_play.className = 'list_menu__icon_play';
            a_mod_menu_item_play.appendChild(li_play);
            li_play.musicInfo = music;
            li_play.onclick = function(){
                playMusic(this.musicInfo.musicrid);
            };
            var span_play = document.createElement('span');
            span_play.class = 'icon_txt';
            span_play.innerHTML = '播放';
            a_mod_menu_item_play.appendChild(span_play);

            var a_mod_menu_item_add = document.createElement('a');
            a_mod_menu_item_add.href = "javascript:;";
            a_mod_menu_item_add.className = 'list_menu__item list_menu__add js_fav';
            a_mod_menu_item_add.title = '添加到歌单';
            div_mod_menu.appendChild(a_mod_menu_item_add);

            var li_add = document.createElement('li');
            li_add.className = 'list_menu__icon_add';
            a_mod_menu_item_add.appendChild(li_add);
            var span_add = document.createElement('span');
            span_add.class = 'icon_txt';
            span_add.innerHTML = '添加到歌单';
            a_mod_menu_item_add.appendChild(span_add);

            //歌曲歌手
            var div_song_author = document.createElement('div');
            div_song_author.className = 'songlist__artist';
            div_song_author.innerHTML = music.artist;
            div_song_item.appendChild(div_song_author);

            //歌曲专辑
            var div_song_album = document.createElement('div');
            div_song_album.className = 'songlist__album';
            div_song_album.innerHTML = music.album;
            div_song_item.appendChild(div_song_album);

            //歌曲时长
            var div_song_time = document.createElement('div');
            div_song_time.className = 'songlist__time';
            div_song_time.innerHTML = music.songTimeMinutes;
            div_song_item.appendChild(div_song_time);
        }
    }


})();

