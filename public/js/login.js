
function s(element) {
    return document.querySelector(element);
}
function sA(element) {
    return document.querySelectorAll(element);
}

function login() {
    s("h1").style.opacity = 0;
    sA("#links a").forEach(a => {
        a.style.opacity = 0;
    });
    sA("input").forEach(inn => {
        inn.style.width = "0px";
    })
    s("button").style.opacity = 0;
    setTimeout(function () {
        s("#login_page").style.padding = "0px 0px";
        s("#login_page").style.height = "0px";

        s("#overlay").style.display = "block"
    }, 350);



    let dot = 0;
    let x = setInterval(function () {
        sA(".dot")[dot].style.marginTop = "0px";

        setTimeout(function () {
            sA(".dot")[dot].style.marginTop = "16px";
            dot += 1;

            if (dot == 4) { dot = 0 }
        }, 450);

    }, 500);
}

function loadPage(page) {
    s("#pageload_bar").style.opacity = 1;
    s("#pageload_bar").style.width = "10px"
    fetch(page)
    .then(h => {
        h.text().then(html => {
            document.body.innerHTML = html.split("<body>")[1].split("</body>")[0]
            s("#pageload_bar").style.width = "100%"
            setTimeout(function() {
                s("#pageload_bar").style.opacity = 0;
            }, 100)
        })
    })
}

function done() {
    s("#overlay").style.display = "none";
    s("#overlay").style.opacity = 0;
}