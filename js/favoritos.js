let body = document.getElementsByTagName("body")[0];
let botonCrearGifo = document.getElementById("botonCrearGifo");
let botonVerMasGifos = document.getElementById("botonVerMasGifos");

let botonLeftTrending = document.getElementById("botonLeftTrending");
let botonRightTrending = document.getElementById("botonRightTrending");

let linkFacebook = document.getElementById("linkFacebook");
let linkTwitter = document.getElementById("linkTwitter");
let linkInstagram = document.getElementById("linkInstagram");

const api_key = "lrnG9FoHoVNeYhrRPSGA1MtbbERL9qZL";

let countGifos = 0;
let gifosTotales = 0
let gifosFaltantes = 0;
let gifosRenderizados = 0;

let dataGifosFavoritos = [];


// Funcionalidad del modo nocturno/diurno
let modoActual = localStorage.getItem('modo-diurno-nocturno');
if (modoActual == null) { // asigna modo diurno si es la primera vez que se esta accediendo a la pagina
    modoActual = 'D';
    localStorage.setItem('modo-diurno-nocturno', modoActual);
    body.classList.add("modo-diurno");
}

let modoDiurnoNocturno = document.getElementById("modoDiurnoNocturno");
cambiarModo(modoActual);

function cambiarModo(modo) {
    let logoPagina = document.getElementById("logoPagina");
    let iconoBurger = document.getElementById("iconoBurger");
    let iconoEquis = document.getElementById("iconoEquis");

    if (modo === "N") { // Activa modo Nocturno 
        modoDiurnoNocturno.innerHTML = 'Modo Diurno';
        modoActual = 'N';
        body.classList.remove("modo-diurno");
        body.classList.add("modo-nocturno");

        //iconos seccion nav
        logoPagina.attributes.src.value = "./assets/Logo-modo-noc.svg";
        iconoEquis.attributes.src.value = "./assets/close-modo-noct.svg";
        iconoBurger.attributes.src.value = "./assets/burger-modo-noct.svg";
        botonCrearGifo.attributes.src.value = "./assets/CTA-crear-gifo-modo-noc.svg";

        //iconos seccion Gifo Max
        botonSalirGifoMax.attributes.src.value = "./assets/close-modo-noct.svg";
        botonLeftGifoMax.attributes.src.value = "./assets/button-slider-left-md-noct.svg";
        botonRightGifoMax.attributes.src.value = "./assets/button-slider-right-md-noct.svg";

        // boton ver mas
        botonVerMasGifos.attributes.src.value = "./assets/CTA-ver+-modo-noc.svg";

        //iconos seccion Trending
        botonLeftTrending.attributes.src.value = "./assets/button-slider-left-md-noct.svg";
        botonRightTrending.attributes.src.value = "./assets/button-slider-right-md-noct.svg";

        //iconos footer
        linkFacebook.setAttribute("src", "./assets/icon_facebook.svg")
        linkTwitter.setAttribute("src", "./assets/icon-tw-normal.svg");
        linkInstagram.setAttribute("src", "./assets/icon_instagram.svg")


    } else {    // Activa modo Diurno
        modoDiurnoNocturno.innerHTML = 'Modo Nocturno';
        modoActual = 'D';
        body.classList.add("modo-diurno");
        body.classList.remove("modo-nocturno");

        //iconos seccion nav
        logoPagina.attributes.src.value = "./assets/logo-desktop.svg";
        iconoEquis.attributes.src.value = "./assets/close.svg";
        iconoBurger.attributes.src.value = "./assets/burger.svg";
        botonCrearGifo.attributes.src.value = "./assets/button-crear-gifo.svg";

        //iconos seccion gifo max
        botonSalirGifoMax.attributes.src.value = "./assets/close.svg";
        botonLeftGifoMax.attributes.src.value = "./assets/button-slider-left.svg";
        botonRightGifoMax.attributes.src.value = "./assets/button-slider-right.svg";

        //iconos seccion trending
        botonLeftTrending.attributes.src.value = "./assets/button-slider-left.svg";
        botonRightTrending.attributes.src.value = "./assets/button-slider-right.svg";

        // boton ver mas
        botonVerMasGifos.attributes.src.value = "./assets/CTA-ver-mas.svg";

        // iconos footer
        linkFacebook.setAttribute("src", "./assets/icon_facebook.svg");
        linkTwitter.setAttribute("src", "./assets/icon-tw-normal.svg");
        linkInstagram.setAttribute("src", "./assets/icon_instagram.svg");
    }

    localStorage.setItem('modo-diurno-nocturno', modoActual);
}

// Evento de boton que cambia el modo nocturno/ diurno
modoDiurnoNocturno.addEventListener("click", () => {
    cambiarModo(modoActual === "D" ? "N" : "D");
})

//Eventos button crear gifos
botonCrearGifo.addEventListener("mouseover", () => {
    if (modoActual === "D") {
        botonCrearGifo.attributes.src.value = "./assets/CTA-crear-gifo-hover.svg";
    } else {
        botonCrearGifo.attributes.src.value = "./assets/CTA-crear-gifo-hover-modo-noc.svg";
    }
})
botonCrearGifo.addEventListener("mouseout", () => {
    if (modoActual === "D") {
        botonCrearGifo.attributes.src.value = "./assets/button-crear-gifo.svg";
    } else {
        botonCrearGifo.attributes.src.value = "./assets/CTA-crear-gifo-modo-noc.svg";
    }
})

// se renderizan los gifos favoritos que se encuentran en el localStorage

let cntGifosFavoritos = document.getElementById("cntGifosFavoritos");
let cntSinGifosFavoritos = document.getElementById("cntSinGifosFavoritos");


if (localStorage.getItem('favoritos') != null) {
    dataGifosFavoritos = (JSON.parse(localStorage.getItem('favoritos')));
}

let countGifosFavoritos = dataGifosFavoritos.length;
console.log(countGifosFavoritos)
if (countGifosFavoritos >= 1) {
    cntSinGifosFavoritos.classList.add("hide")
    cntGifosFavoritos.classList.remove("hide")

    countGifosFavoritos = countGifosFavoritos > 12 ? 12 : countGifosFavoritos;

    for (let i = 0; i < countGifosFavoritos; i++) {
        const element = dataGifosFavoritos[i];
        renderizarGifos(element, cntGifosFavoritos, i, dataGifosFavoritos);
    }

} else {
    cntSinGifosFavoritos.classList.remove("hide")
    cntGifosFavoritos.classList.add("hide")
}

