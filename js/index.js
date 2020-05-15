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
}