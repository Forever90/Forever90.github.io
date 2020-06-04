/**
 * Created by Administrator on 2019/12/10.
 */
// window.onload=function(){
//     console.log("==================");
//     window.songList = document.querySelector('.songlist__list');
// };

(function(){
    let musicPlayer = null;

    searchSongs = function(pageNum){
        var data = {
            searchTitle:$(".musicName").val(),
            pageNum:pageNum || 0
        }
        $.ajax({
            type: "GET",
            dataType: "json",//服务器返回的数据类型
            contentType: "application/x-www-form-urlencoded",//post请求的信息格式
            url: "http://192.168.7.90:8888/musicSearch" ,
            data: data,//$('#form1').serialize(),
            success: function (result) {
                console.log(result);//在浏览器中打印服务端返回的数据(调试用)
                if ( result.abslist.length>0 ) {
                    refreshSonglist(result);
                    setPageContainer(result,data.pageNum);
                    $(".musicMain").css({"margin-right":"0.5%","transition":"margin-right 1.0s ease-in-out"})
                }
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

    function playMusic(musicInfo){
        $.ajax({
            type: "GET",
            dataType: "text",//服务器返回的数据类型
            contentType: "application/x-www-form-urlencoded",//post请求的信息格式
            url: "http://192.168.7.90:8888/musicPlay" ,
            data: {mid:musicInfo.MUSICRID},
            success: function (url) {
                console.log(url);//在浏览器中打印服务端返回的数据(调试用)
                // if ( result.code == 200 ) {
                //     //refreshSonglist(result.data);
                // };
                //import('player.js').Player().getInstance();
                //Player().getInstance().handlePlayAndPause()s;

                let song = new songsInfo(musicInfo.MUSICRID,musicInfo.NAME,musicInfo.ARTIST,url,'./res/images/songs/yanyuan.jpg');
                if(!duplicateRemoval(song)){
                    //生成播放器实例
                    musicPlayer = new Player();
                    musicPlayer.renderSongList();
                    musicPlayer.PlayNewSong();
                }

            },
            error : function() {
                alert("异常！");
            }
        });
    }

    function duplicateRemoval(song){
        for(var i in musics){
            if(musics[i].id === song.id){
                return true;
            }
        }
        musics.push(song);
        return false;
    }

    function refreshSonglist(data){
        // $('.result').css('opacity',1);
        window.songList = document.querySelector('.songlist__list');
        $('.songlist__list').empty();
        for(let i in data.abslist){
            let music = data.abslist[i];
            //歌曲名称 播放按钮
            let li_song = document.createElement("li");
            li_song.className = "songInfo";
            li_song.setAttribute('mid',music.MUSICRID);
            li_song.setAttribute('ix',i);
            songList.appendChild(li_song);

            let div_song_name = document.createElement('div');
            div_song_name.className = 'songName';
            li_song.appendChild(div_song_name);

            //歌曲名称
            // var div_song_name = document.createElement('div');
            // div_song_name.className = 'songlist__songname';
            // div_song_item.appendChild(div_song_name);

            let span_name = document.createElement('span');
            span_name.className = 'songname_txt';
            span_name.innerHTML = music.NAME || "--";
            div_song_name.appendChild(span_name);
            let div_mod_menu = document.createElement('div');
            div_mod_menu.className = 'mod_list_menu';
            div_song_name.appendChild(div_mod_menu);

            // var a_mod_menu_item_play = document.createElement('a');
            // a_mod_menu_item_play.href = "javascript:;";
            // a_mod_menu_item_play.className = 'list_menu__item list_menu__add js_fav';
            // a_mod_menu_item_play.title = '播放';
            // div_mod_menu.appendChild(a_mod_menu_item_play);

            let i_play = document.createElement('i');
            i_play.className = 'iconfont list_menu__icon_play';
            div_mod_menu.appendChild(i_play);
            i_play.musicInfo = music;
            i_play.onclick = function(){
                playMusic(this.musicInfo);
            };
            // var span_play = document.createElement('span');
            // span_play.class = 'icon_txt';
            // span_play.innerHTML = '播放';
            // a_mod_menu_item_play.appendChild(span_play);
            //
            // var a_mod_menu_item_add = document.createElement('a');
            // a_mod_menu_item_add.href = "javascript:;";
            // a_mod_menu_item_add.className = 'list_menu__item list_menu__add js_fav';
            // a_mod_menu_item_add.title = '添加到歌单';
            // div_mod_menu.appendChild(a_mod_menu_item_add);
            //
            // var li_add = document.createElement('li');
            // li_add.className = 'list_menu__icon_add';
            // a_mod_menu_item_add.appendChild(li_add);
            // var span_add = document.createElement('span');
            // span_add.class = 'icon_txt';
            // span_add.innerHTML = '添加到歌单';
            // a_mod_menu_item_add.appendChild(span_add);

            //歌曲歌手
            let div_song_author = document.createElement('div');
            div_song_author.className = 'artist';
            li_song.appendChild(div_song_author);
            let span_artist = document.createElement('span');
            span_artist.className = 'artist_txt';
            span_artist.innerHTML = music.ARTIST || "--";
            div_song_author.appendChild(span_artist);

            //歌曲专辑
            let div_song_album = document.createElement('div');
            div_song_album.className = 'album';
            li_song.appendChild(div_song_album);
            let span_album = document.createElement('span');
            span_album.className = 'album_txt';
            span_album.innerHTML = music.ALBUM || "--";
            div_song_album.appendChild(span_album);

            //歌曲时长
            let div_song_time = document.createElement('div');
            div_song_time.className = 'duration';
            li_song.appendChild(div_song_time);
            let span_time = document.createElement('span');
            span_time.className = 'duration_txt';
            span_time.innerHTML = music.DURATION || "--";
            div_song_time.appendChild(span_time);
        }
    }

    function setPageContainer(result,index){
        window.page_list = document.querySelector('.page_list');
        $('.page_list').empty();
        let totalPageNum = parseInt(result.TOTAL/30);
        //前一页
        let pre_page_li = createHtmlElement("li","page_pre",page_list);
        let pre_page_a = createHtmlElement("a","",pre_page_li);
        pre_page_a.innerHTML = "<<";
        pre_page_li.onclick = function(){
            if(index === 0){
                alert("已到首页");
                return;
            }
            searchSongs(index - 1);
        };
        if(totalPageNum>10){
            if(index + 5 < totalPageNum - 1 - 4){
                for(let i = index;i<index + 4;i++){
                    let num_page_li = createHtmlElement("li","page_"+String(i),page_list);
                    let num_page_a = createHtmlElement("a","",num_page_li);
                    num_page_a.innerHTML = String(i+1);
                    num_page_li.onclick = function(){
                        searchSongs(num_page_a.innerHTML - 1);
                    }
                }
                let page_li = createHtmlElement("li","",page_list);
                let page_a = createHtmlElement("a","",page_li);
                page_a.innerHTML = "...";
                //最后4页
                for(let i=totalPageNum-4;i<totalPageNum;i++){
                    let num_page_li = createHtmlElement("li","page_"+String(i),page_list);
                    let num_page_a = createHtmlElement("a","",num_page_li);
                    num_page_a.innerHTML = String(i+1);
                    num_page_li.onclick = function(){
                        searchSongs(num_page_a.innerHTML - 1);
                    }
                }
            }else{
                //最后10页
                for(let i = totalPageNum-10;i<totalPageNum;i++){
                    let num_page_li = createHtmlElement("li","page_"+String(i),page_list);
                    let num_page_a = createHtmlElement("a","",num_page_li);
                    num_page_a.innerHTML = String(i+1);
                    num_page_li.onclick = function(){
                        searchSongs(num_page_a.innerHTML - 1);
                    }
                }
            }
        }else{
            for(let i = 0;i<totalPageNum;i++){
                let num_page_li = createHtmlElement("li","page_"+String(i),page_list);
                let num_page_a = createHtmlElement("a","",num_page_li);
                num_page_a.innerHTML = String(i+1);
                num_page_li.onclick = function(){
                    searchSongs(num_page_a.innerHTML - 1);
                }
            }
        }
        let next_page_li = createHtmlElement("li","page_next",page_list);
        let next_page_a = createHtmlElement("a","",next_page_li);
        next_page_a.innerHTML = ">>";
        next_page_li.onclick = function(){
            if(index >= totalPageNum-1){
                alert("已到尾页");
                return;
            }
            searchSongs(index + 1);
        };
        $(".page_" + index).addClass("selected").siblings().removeClass("selected");
    }

    function createHtmlElement(nodeName,className,parentNode) {
        let node = document.createElement(nodeName);
        node.className = className;
        parentNode.appendChild(node);
        return node;
    }

    myFunction = function (){
        if(musicPlayer){
            //播放条尺寸
            musicPlayer.progress.refreshDomStyle();
            musicPlayer.progress.setValue(musicPlayer.audio.currentTime);
            //音量条尺寸
            musicPlayer.volumProgress.refreshDomStyle();
            musicPlayer.volumProgress.setValue(musicPlayer.audio.volume);
        }
    }

})();

