/**
 * Created by Administrator on 2020/5/8.
 */
$(function(){
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
