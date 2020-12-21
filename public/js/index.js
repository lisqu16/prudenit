let devMode = false;

window.onscroll = function (h) {
    if (window.scrollY >= window.innerHeight - 250) {
        document.querySelector("#arrow_lookdown").style.opacity = 0
        document.querySelector("main").style.opacity = 1
    } else {
        document.querySelector("#arrow_lookdown").style.opacity = 1;
    }
    if (devMode) {
        console.log(`window.scrollY = ${window.scrollY}  \n  window.innerHeight = ${window.innerHeight}`);
    }
} 