let iGifoMax;
let dataGifosMaximizados = [];
let gifoMaximizado = document.getElementById("gifoMaximizado");
let userGifoMax = document.getElementById("userGifoMax");
let tituloGifoMax = document.getElementById("tituloGifoMax");
let botonSalirGifoMax = document.getElementById("botonSalirGifoMax");
let botonLeftGifoMax = document.getElementById("botonLeftGifoMax");
let botonRightGifoMax = document.getElementById("botonRightGifoMax");
let cntGifoMax = document.getElementById("cntGifoMax");
let botonFavGifoMax = document.getElementById("botonFavGifoMax");


//Gifos Maximizados   
// evento cerrar gifo maximizado
botonSalirGifoMax.addEventListener("click", () => {
    cntGifoMax.classList.add("hide");
    body.classList.remove("overflow-hidden");
    gifoMaximizado.setAttribute("src", "")
})

// Funcionamiento del boton desplazar hacia la izquierda  
botonLeftGifoMax.addEventListener("click", () => {
    gifoMaximizado.setAttribute("src", "")

    iGifoMax -= 1;
    if (iGifoMax < 0) {
        iGifoMax = dataGifosMaximizados.length - 1;
    }
    cambiarGifoMax(iGifoMax);
})

botonLeftGifoMax.addEventListener("mouseover", () => {
    if (modoActual === "D") {
        botonLeftGifoMax.setAttribute("src", "./assets/button-slider-left-hover.svg")

    } else {
        botonLeftGifoMax.setAttribute("src", "./assets/button-slider-left-md-noct-2.svg")
    }
})

botonLeftGifoMax.addEventListener("mouseout", () => {
    if (modoActual === "D") {
        botonLeftGifoMax.setAttribute("src", "./assets/button-slider-left.svg")

    } else {
        botonLeftGifoMax.setAttribute("src", "./assets/button-slider-left-md-noct.svg")
    }
})

// Funcionamiento del boton desplazar hacia la derecha
botonRightGifoMax.addEventListener("click", () => {

    gifoMaximizado.setAttribute("src", "")
    gifoMaximizado.classList.add("transicion-right")
    gifoMaximizado.classList.add("margin-gifo-max")

    iGifoMax += 1;
    if (iGifoMax >= dataGifosMaximizados.length) {
        iGifoMax = 0;
    }
    cambiarGifoMax(iGifoMax);
})

botonRightGifoMax.addEventListener("mouseout", () => {
    if (modoActual === "D") {
        botonRightGifoMax.setAttribute("src", "./assets/Button-slider-right.svg")
    } else {
        botonRightGifoMax.setAttribute("src", "./assets/button-slider-right-md-noct.svg")
    }
})

botonRightGifoMax.addEventListener("mouseover", () => {
    if (modoActual === "D") {
        botonRightGifoMax.setAttribute("src", "./assets/Button-Slider-right-hover.svg")

    } else {
        botonRightGifoMax.setAttribute("src", "./assets/button-slider-right-md-noct-2.svg")
    }
})

// Boton favorito del gifo maximizado
botonFavGifoMax.addEventListener("click", () => {

    if (dataGifosFavoritos.some((element) => element.id === dataGifosMaximizados[iGifoMax].id)) {
        gifoFavorito(false, dataGifosMaximizados[iGifoMax]);
        botonFavGifoMax.setAttribute("src", "./assets/icon-fav.svg");
    } else {
        gifoFavorito(true, dataGifosMaximizados[iGifoMax]);
        botonFavGifoMax.setAttribute("src", "./assets/icon-fav-active.svg");
    }
})

botonFavGifoMax.addEventListener("mouseover", () => {
    if (!dataGifosFavoritos.some((element) => element.id === dataGifosMaximizados[iGifoMax].id)) {
        botonFavGifoMax.setAttribute("src", "./assets/icon-fav-hover.svg");
    }
})

botonFavGifoMax.addEventListener("mouseout", () => {
    if (!dataGifosFavoritos.some((element) => element.id === dataGifosMaximizados[iGifoMax].id)) {
        botonFavGifoMax.setAttribute("src", "./assets/icon-fav.svg");
    }
})

// Boton descargar gifo Maximizado 
botonDownloadGifoMax.addEventListener("click", () => {

})

botonDownloadGifoMax.addEventListener("mouseover", () => {
    botonDownloadGifoMax.setAttribute("src", "./assets/icon-download-hover.svg");
})

botonDownloadGifoMax.addEventListener("mouseout", () => {
    botonDownloadGifoMax.setAttribute("src", "./assets/icon-download.svg");
})

function cambiarGifoMax(posicionGifoMax) {
    console.log(dataGifosMaximizados)
    gifoMaximizado.setAttribute("src", dataGifosMaximizados[posicionGifoMax].images.original.url)
    userGifoMax.innerHTML = dataGifosMaximizados[posicionGifoMax].username;
    tituloGifoMax.innerHTML = dataGifosMaximizados[posicionGifoMax].title;

    if (dataGifosFavoritos.some((element) => element.id === dataGifosMaximizados[posicionGifoMax].id)) {
        botonFavGifoMax.setAttribute("src", "./assets/icon-fav-active.svg");
    } else {
        botonFavGifoMax.setAttribute("src", "./assets/icon-fav.svg");
    }
}
