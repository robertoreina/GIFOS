// import {renderizarGifos} from './gifos.js';

let cntTrendingGifos = document.getElementById("cntTrendingGifos");
let deslizarTrending = 0;
let controlGifosTrending = 3;
let anchoViewport;

// se ejecuta servicio para obtener trending gifos desde GIPHY
getRequestTrendingGifos();

// funcion de que ejecuta fetch para obtener los trending Gifos 
async function getRequestTrendingGifos() {
    const endpoint = "https://api.giphy.com/v1/gifs/trending?";
    const api_key = "lrnG9FoHoVNeYhrRPSGA1MtbbERL9qZL";

    const url = `${endpoint}api_key=${api_key}&limit=24&rating=g`;
    let response = await fetch(url);
    let dataTrending = await response.json();
    renderizarGifosTrending(dataTrending.data);
}

//Funcion para renderizar gifos en la seccion de trending
function renderizarGifosTrending(trendingGifos) {

    trendingGifos.forEach((element, index, array) => {
        renderizarGifos(element, cntTrendingGifos, index, array);        
    });

}

 // Funcionamiento del boton desplazar hacia la izquierda 
 
 if (controlGifosTrending <= 3) {
    botonLeftTrending.classList.add("no-visible")
 }

 botonLeftTrending.addEventListener("click", () => {
    anchoViewport = window.innerWidth;
    deslizarTrending -= (anchoViewport * 82.2 ) / 100;
    cntTrendingGifos.style.right = `${deslizarTrending}px`;
    controlGifosTrending -= 3;
    if (controlGifosTrending <= 3) {
        controlGifosTrending = 3;
        botonLeftTrending.classList.add("no-visible");
    }
    botonRightTrending.classList.remove("no-visible")
})

botonLeftTrending.addEventListener("mouseover", () => {
    if (modoActual === "D") {
        botonLeftTrending.setAttribute("src", "./assets/button-slider-left-hover.svg")

    } else {
        botonLeftTrending.setAttribute("src", "./assets/button-slider-left-md-noct-2.svg")
    }
})

botonLeftTrending.addEventListener("mouseout", () => {
    if (modoActual === "D") {
        botonLeftTrending.setAttribute("src", "./assets/button-slider-left.svg")

    } else {
        botonLeftTrending.setAttribute("src", "./assets/button-slider-left-md-noct.svg")
    }
})

// Funcionamiento del boton desplazar hacia la derecha
botonRightTrending.addEventListener("click", () => {
    anchoViewport = window.innerWidth;
    deslizarTrending += (anchoViewport * 82.2 ) / 100;
    cntTrendingGifos.style.right = `${deslizarTrending}px`;
    controlGifosTrending += 3;
    if (controlGifosTrending >= 24) {
        controlGifosTrending = 24;
        botonRightTrending.classList.add("no-visible");
    }
    botonLeftTrending.classList.remove("no-visible")
})

botonRightTrending.addEventListener("mouseout", () => {
    if (modoActual === "D") {
        botonRightTrending.setAttribute("src", "./assets/Button-slider-right.svg")
    } else {
        botonRightTrending.setAttribute("src", "./assets/button-slider-right-md-noct.svg")
    }
})

botonRightTrending.addEventListener("mouseover", () => {
    if (modoActual === "D") {
        botonRightTrending.setAttribute("src", "./assets/Button-Slider-right-hover.svg")
    } else {
        botonRightTrending.setAttribute("src", "./assets/button-slider-right-md-noct-2.svg")
    }
})




