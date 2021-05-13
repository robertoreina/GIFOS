// script para manejar el funcionamiento de los gifos al estar maximizados

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
let botonDeleteGifoMax = document.getElementById("botonDeleteGifoMax");


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
    downloadGifo(dataGifosMaximizados[iGifoMax].images.original.url)
})

botonDownloadGifoMax.addEventListener("mouseover", () => {
    botonDownloadGifoMax.setAttribute("src", "./assets/icon-download-hover.svg");
})

botonDownloadGifoMax.addEventListener("mouseout", () => {
    botonDownloadGifoMax.setAttribute("src", "./assets/icon-download.svg");
})

// Boton eliminar gifo de la seccion mis gifos 
botonDeleteGifoMax.addEventListener("click", () => {
    deleteMisGifos(dataGifosMaximizados[iGifoMax].id);
})

botonDeleteGifoMax.addEventListener("mouseover", () => {
    botonDeleteGifoMax.setAttribute("src", "./assets/icon-trash-hover.svg");
})

botonDeleteGifoMax.addEventListener("mouseout", () => {
    botonDeleteGifoMax.setAttribute("src", "./assets/icon-trash-normal.svg");
})


// realiza el cambio de gifo en la seccion gifo max
function cambiarGifoMax(posicionGifoMax) {
    gifoMaximizado.setAttribute("src", dataGifosMaximizados[posicionGifoMax].images.original.url)
    userGifoMax.innerHTML = dataGifosMaximizados[posicionGifoMax].username;
    tituloGifoMax.innerHTML = dataGifosMaximizados[posicionGifoMax].title;

    if (dataGifosFavoritos.some((element) => element.id === dataGifosMaximizados[posicionGifoMax].id)) {
        botonFavGifoMax.setAttribute("src", "./assets/icon-fav-active.svg");
    } else {
        botonFavGifoMax.setAttribute("src", "./assets/icon-fav.svg");
    }
}

// funcion elimina los gifos del local storage en la seccion mis gifos
function deleteMisGifos(idGifo) {

    let posicion = dataIdMisGifos.findIndex(elemento => elemento.id == idGifo);
    dataIdMisGifos.splice(posicion, 1);
    localStorage.setItem('id-mis-gifos', JSON.stringify(dataIdMisGifos))
    location.reload();
}

