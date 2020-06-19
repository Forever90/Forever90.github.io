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

openLogin = function(){
    let container = jQuery(".container");
    if(container) {
        container.removeClass("layui-anim-fadeout");
        container.addClass("layui-anim layui-anim-scale");
        container.show();
    }
};

closeLogin = function(){
    let container = jQuery(".container");
    if(container){
        container.removeClass("layui-anim-scale");
        container.addClass("layui-anim-fadeout");
        setTimeout(function(){
            container.hide();
        },500);
    }

};

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
            }else if(event.currentTarget.id === "loginBtn"){
                openLogin();
            }
            break;

        default:
            break;
    }
}