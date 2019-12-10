/**
 * Created by Administrator on 2019/12/10.
 */
(function(){
    window.onload=function(){
        // var testAnimation = $("#testAnimation");
        // var animationName = testAnimation.data('animation');
        // testAnimation.addClass("animated "+ animationName);
        // function handleAnimationEnd() {
        //     testAnimation.removeClass('animated '+ animationName)
        //     testAnimation.off('animationend', handleAnimationEnd)
        //     if (typeof callback === 'function') callback()
        // }
        // testAnimation.on('animationend', handleAnimationEnd)
        var AnimationNode = document.getElementById("testAnimation");
        var animationName = AnimationNode.getAttribute("data-animation");
        AnimationNode.classList.add("animated",animationName);
        function handleAnimationEnd() {
            AnimationNode.classList.remove('animated',animationName);
            AnimationNode.removeEventListener('animationend', handleAnimationEnd)
            if (typeof callback === 'function') callback()
        }
        AnimationNode.addEventListener('animationend', handleAnimationEnd)
    }
})();

