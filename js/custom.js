/**
 * Created by Administrator on 2020/5/8.
 */
$(function(){
    //导航菜单
    var ind = 4;
    var nav= jQuery(".nav");
    // var init = jQuery(".nav .m").eq(ind);
    // var block = jQuery(".nav .block");
    // block.css({"left":init.position().left-3});
    // nav.hover(function(){},function(){ block.animate({"left":init.position().left-3},100); });
    nav.hover(function(){
        parent.setHeight(300);
    },function(){
        parent.setHeight(65);
    });

    jQuery(".nav").slide({
        type:"menu",
        titCell:".m",
        targetCell:".sub",
        delayTime:300,
        triggerTime:0,
        returnDefault:true,
        defaultIndex:ind
        // startFun:function(i,c,s,tit){
        //     block.animate({"left":tit.eq(i).position().left-3},100);
        // }
    });

    //banner
    jQuery(".full_banner").slide({
        titCell:".hd ul",
        mainCell:".bd ul",
        effect:"fold",
        autoPlay:true,
        autoPage:true,
        trigger:"click",
        interTime:3500
    });



});
