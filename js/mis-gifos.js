// script principal de la pagina favoritos


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
let dataIdMisGifos = [];
let dataMisGifos = [];

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

// se renderizan mis gifos que se encuentran en el localStorage
let cntGifosMisGifos = document.getElementById("cntGifosMisGifos");
let cntSinGifosMisGifos = document.getElementById("cntSinGifosMisGifos");

if (localStorage.getItem('id-mis-gifos') != null) {
    dataIdMisGifos = (JSON.parse(localStorage.getItem('id-mis-gifos')));
}

cntSinGifosMisGifos.classList.add("hide")
if (dataIdMisGifos.length >= 1) {
    getGifosByIds()
    .then(() => {
        obtenerFavoritosMisGifos(dataMisGifos.data, cntGifosMisGifos, 0)
    }
    );
} else {
    cntSinGifosMisGifos.classList.remove("hide")
    cntGifosMisGifos.classList.add("hide");
}

// funcion de que ejecuta fetch para obtener los trending Gifos 
async function getGifosByIds() {
    const endpoint = "https://api.giphy.com/v1/gifs?";
    const ids = dataIdMisGifos.map((element) => {
        return element.id
    }).join(", ");
    const url = `${endpoint}api_key=${api_key}&ids=${ids}`;

    try {
        let response = await fetch(url);
        dataMisGifos = await response.json();

    } catch (error) {
        console.error(err.name + ": " + err.message);
    }
}

/**
 * Funcion para obtener y renderizar los gifos en las secciones Favoritos y Mis Gifos
 * @param {*} arrayGifos recibe array de objeto que contiene los gifos favoritos/mis gifos
 * @param {*} seccion recibe objeto del contenedor donde se van a renderizar los gifos
 * @param {*} iRender recibe el index desde donde se van a leer los gifos en array
 */
function obtenerFavoritosMisGifos(arrayGifos, seccion, iRender) {

    seccion.classList.remove("hide")
    if (iRender === 0) { // la primera vez que se renderizan los gifos favoritos
        countGifos = arrayGifos.length > 12 ? 12 : arrayGifos.length;
    } else {
        countGifos += gifosFaltantes > 12 ? 12 : gifosFaltantes;
    }

    for (let i = iRender; i < countGifos; i++) {
        renderizarGifos(arrayGifos[i], seccion, i, arrayGifos);
        gifosRenderizados = i + 1;
    }

    gifosFaltantes = arrayGifos.length - gifosRenderizados;

    // console.log("gifosTotales: " + arrayGifos.length,
    //     "gifosRenderizados: " + gifosRenderizados,
    //     "countGifos : " + countGifos,
    //     "gifosFaltantes: ", gifosFaltantes);


    if (gifosFaltantes > 0) {
        botonVerMasGifos.classList.remove("hide");
    } else {
        botonVerMasGifos.classList.add("hide");
    }
}

// boton ver mas gifos favoritos
botonVerMasGifos.addEventListener("click", () => {
    obtenerFavoritosMisGifos(dataGifosFavoritos, cntGifosFavoritos, gifosRenderizados);
})


// Evento scroll window para activar el box shadown del header
window.addEventListener('scroll', () => {
    let header = document.getElementsByTagName("Header")[0];
    let coordHeader = header.getBoundingClientRect();

    //Activa box-shadown del nav
    let tituloSecciones = document.getElementsByClassName("titulo-secciones")[0].getBoundingClientRect();
    if (tituloSecciones.top <= coordHeader.bottom) {
        header.classList.add("box-shadown-header")
    } else {
        header.classList.remove("box-shadown-header")
    }
});



