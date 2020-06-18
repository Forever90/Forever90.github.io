/**
 * Created by Administrator on 2020/5/15.
 */
var admin= null;
$(function(){
    //导航菜单
    // var init = jQuery(".nav .m").eq(ind);
    // var block = jQuery(".nav .block");
    // block.css({"left":init.position().left-3});
    // nav.hover(function(){},function(){ block.animate({"left":init.position().left-3},100); });
    admin= jQuery(".admin");
});

function setHeight(value){
    admin.height(value);
    admin.css(
        "transition", "height 0.2s ease-in-out"
    )
}

function onEventListener(event){
    console.log(event);
    switch (event.type){
        case "mouseenter":
            {
                if(event.currentTarget.id === "japan"){
                    setHeight(300);
                }
            }
            break;
        case "mouseleave":
            {
                setHeight(65);
            }
            break;
        case "mousedown":
            if(event.currentTarget.id === "music"){
                window.location.href = "./music.html"
            }else if(event.currentTarget.id === "blog"){
                window.location.href = "./blog.html"
            }
            break;
        default:
            break;
    }
}