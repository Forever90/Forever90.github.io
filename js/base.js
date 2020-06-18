/**
 * Created by Administrator on 2020/5/8.
 */
$(function(){
    //导航菜单
    var ind = 4;
    var ul= jQuery(".m");
    ul.mousedown(function(event){
        if(typeof parent.setHeight !== "undefined"){
            parent.onEventListener(event);
        }
    });
    ul.hover(function(event) {
        if(typeof parent.setHeight !== "undefined"){
            parent.onEventListener(event);
        }
    },function(event){
        if(typeof parent.setHeight !== "undefined"){
            parent.onEventListener(event);
        }
    });
    // ul.hover(function(event){
    //     switch (event.currentTarget.id){
    //         case "japan":
    //             if(typeof parent.setHeight !== "undefined"){
    //                parent.setHeight(300);
    //             }
    //             break;
    //         case "":
    //             break;
    //         default:
    //             break;
    //     }
    // },function(event){
    //     if(typeof parent.setHeight !== "undefined"){
    //         parent.setHeight(65);
    //     }
    //
    // });

    jQuery(".nav").slide({
        type:"menu",
        titCell:".m",
        targetCell:".sub",
        delayTime:500,
        triggerTime:0,
        returnDefault:true,
        defaultIndex:ind
        // startFun:function(i,c,s,tit){
        //     block.animate({"left":tit.eq(i).position().left-3},100);
        // }
    });



});
