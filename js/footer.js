


linkFacebook.addEventListener("mouseout", () => {

    linkFacebook.setAttribute("src", "./assets/icon_facebook.svg")

})

linkFacebook.addEventListener("mouseover", () => {
    if (modoActual === "D") {
        linkFacebook.setAttribute("src", "./assets/icon_facebook_hover.svg")
    } else {
        linkFacebook.setAttribute("src", "./assets/icon_facebook_noc.svg")
    }
})

linkTwitter.addEventListener("mouseout", () => {
    if (modoActual === "D") {
        linkTwitter.setAttribute("src", "./assets/icon-twitter.svg")
    } else {
        linkTwitter.setAttribute("src", "./assets/icon-tw-normal.svg")
    }
})

linkTwitter.addEventListener("mouseover", () => {
    if (modoActual === "D") {
        linkTwitter.setAttribute("src", "./assets/icon-twitter-hover.svg")
    } else {
        linkTwitter.setAttribute("src", "./assets/icon_twitter_noc.svg")
    }
})

linkInstagram.addEventListener("mouseout", () => {

    linkInstagram.setAttribute("src", "./assets/icon_instagram.svg")

})

linkInstagram.addEventListener("mouseover", () => {
    if (modoActual === "D") {
        linkInstagram.setAttribute("src", "./assets/icon_instagram-hover.svg")
    } else {
        linkInstagram.setAttribute("src", "./assets/icon_instagram_noc.svg")
    }
})






