// window.onload = function () {


// import {renderizarGifos} from './gifos.js';

// Elementos de la seccion de busqueda
let inputBuscador = document.getElementById("inputBuscador");
let cntInputBusqueda = document.getElementById("cntInputBusqueda");
let boxBusqueda = document.getElementById("boxBusqueda");
let listaSugerenciaBusqueda = document.getElementById("listaSugerenciaBusqueda");
let botonBusquedaInactiva = document.getElementById("botonBusquedaInactiva");
let botonBusquedaActiva = document.getElementById("botonBusquedaActiva");
let buscadorActivo = false;
let buscadorEnNav = false;
let valorBuscar;
let dataSugerenciasBusqueda = [];
let body = document.getElementsByTagName("body")[0];
let botonCrearGifo = document.getElementById("botonCrearGifo");
let botonVerMasGifos = document.getElementById("botonVerMasGifos");



let dataGifos = [];
let dataGifosFavoritos = [];
if (localStorage.getItem('favoritos') != null) {
    dataGifosFavoritos = (JSON.parse(localStorage.getItem('favoritos')));
}

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

        //iconos seccion busqueda
        botonBusquedaInactiva.attributes["src"].value = './assets/icon-search-modo-noct.svg';

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

        //iconos seccion busqueda
        botonBusquedaInactiva.attributes["src"].value = './assets/icon-search.svg';

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

// Evento scroll window para ubicar buscador en el nav y activar el box shadown del header

window.addEventListener('scroll', () => {
    let cntBusqueda = document.getElementById("cntBusqueda");
    let header = document.getElementsByTagName("Header")[0];
    let coordHeader = header.getBoundingClientRect();
    let coordImagenMain = document.getElementById("imagenMain").getBoundingClientRect();

    //Ubica buscador en el nav
    if (coordImagenMain.bottom <= coordHeader.bottom) {
        cntBusqueda.classList.add("buscador-en-nav");
        buscadorEnNav = true;
    } else {
        cntBusqueda.classList.remove("buscador-en-nav");
        buscadorEnNav = false;
    }

    //Activa box-shadown del nav
    let coorTituloMain = document.getElementById("tituloMain").getBoundingClientRect();
    if (coorTituloMain.top <= coordHeader.bottom) {
        header.classList.add("box-shadown-header")
    } else {
        header.classList.remove("box-shadown-header")
    }
});

// Evento keypress de buscador
inputBuscador.addEventListener("keypress", (e) => {

    // Ejecucion de funcion Buscar en caso de que se presione INTRO
    if (e.keyCode === 13 && inputBuscador.value != '') {
        buscadorActivoInactivo(false); // Restablece estilos iniciales del buscador
        buscarGifos(inputBuscador.value);
    }
});

// Evento input de buscador
inputBuscador.addEventListener("input", () => {

    if (inputBuscador.value != "") {
        buscarSugerenciasBusquedas(inputBuscador.value);
    }

    if (buscadorActivo == false) {
        buscadorActivoInactivo(true);
    } else if (inputBuscador.value === "") {
        buscadorActivoInactivo(false);
    }

});

// Evento Click del boton cerrar
botonBusquedaInactiva.addEventListener("click", () => {
    if (buscadorActivo) {
        buscadorActivoInactivo(false);
        inputBuscador.value = '';
    }
})
// Evento Click del boton buscar 
botonBusquedaActiva.addEventListener("click", () => {
    buscarGifos(inputBuscador.value);
})

//Aplica estilos al buscador segun si esta activo o inactivo
function buscadorActivoInactivo(estado) {


    cntInputBusqueda.classList.toggle("borderCntOn");
    boxBusqueda.classList.toggle("clsFormBusquedaOn");
    listaSugerenciaBusqueda.classList.toggle("busquedaOff");
    botonBusquedaActiva.classList.toggle("busquedaOff");


    buscadorActivo = estado;

    // Controla/cambia icono del buscador 
    if (estado) {
        if (modoActual === 'N') {  //modo Nocturno
            botonBusquedaInactiva.attributes["src"].value = './assets/close-modo-noct.svg';
        } else { // Modo diurno
            botonBusquedaInactiva.attributes["src"].value = './assets/close.svg';
        }
    } else {
        if (modoActual === 'N') {
            botonBusquedaInactiva.attributes["src"].value = './assets/icon-search-modo-noct.svg';
        } else {
            botonBusquedaInactiva.attributes["src"].value = './assets/icon-search.svg';
        }
    }
}

//busqueda de gifos
function buscarGifos(buscar) {

    // buscadorActivoInactivo(false); // Restablece estilos iniciales del buscador

    inputBuscador.value = "";
    let titResultados = document.getElementById("titResultados");
    titResultados.innerHTML = buscar;
    valorBuscar = buscar;

    let cntSinResultadosGifos = document.getElementById("cntSinResultadosGifos");
    cntSinResultadosGifos.classList.add("hide");
    let cntSugerenciaTrending = document.getElementById("cntSugerenciaTrending");
    cntSugerenciaTrending.classList.add("clsBorderSugerenciaTrending"); // agrega border inferior 
    let cntResultadosGifos = document.getElementById("cntResultadosGifos");
    cntResultadosGifos.classList.add("hide");
    cntResultadosGifos.innerHTML = "";

    getGifos(buscar, 0)
        .then((respuesta) => {

            countGifos = respuesta.pagination.count;
            gifosTotales = respuesta.pagination.total_count;
            gifosFaltantes = gifosTotales - countGifos;
            if (countGifos != 0) {

                dataGifos = respuesta.data;
                cntResultadosGifos.classList.remove("hide");
                gifosRenderizados = countGifos;
                for (let index = 0; index < dataGifos.length; index++) {
                    let element = dataGifos[index];
                    cntResultadosGifos.classList.remove("hide");
                    renderizarGifos(element, cntResultadosGifos, index, dataGifos);
                }

                // console.log("gifosTotales: " + gifosTotales,
                //     "gifosRenderizados: " + gifosRenderizados,
                //     "countGifos : " + countGifos,
                //     "gifosFaltantes: ", gifosFaltantes,
                //     "dataGifos.lenght: " + dataGifos.length);

                if (gifosFaltantes > 0) {
                    botonVerMasGifos.classList.remove("hide");
                }

            } else {
                cntSinResultadosGifos.classList.remove("hide")
                botonVerMasGifos.classList.add("hide");

            }
            window.scroll({
                top: 700,
                left: 0,
                behavior: 'smooth'
            });

        })
        .catch((err) => {
            console.err(err);
            cntSinResultadosGifos.classList.remove("hide")
            botonVerMasGifos.classList.add("hide");

            window.scroll({
                top: 700,
                left: 0,
                behavior: 'smooth'
            });
        });
}

// Request get servicio de busqueda de gifo
/**
 *  
 */
function getGifos(buscar, offset) {
    const endpoint = "https://api.giphy.com/v1/gifs/search?";
    const url = `${endpoint}api_key=${api_key}&q=${buscar}&limit=12&offset=${offset}`;
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    reject(response.status)
                }
            })
            .then(json => {
                resolve(json)
            })
            .catch(err => reject(err))
    });
}

// Funcionamiento del boton ver mas solo para la seccion de resultados de busqueda
botonVerMasGifos.addEventListener("click", () => {

    getGifos(valorBuscar, gifosRenderizados)
        .then((respuesta) => {

            countGifos = respuesta.pagination.count;
            if (countGifos != 0) {

                respuesta.data.forEach((elemento) => {
                    dataGifos.push(elemento);
                });

                for (let index = gifosRenderizados; index < dataGifos.length; index++) {
                    let element = dataGifos[index];
                    cntResultadosGifos.classList.remove("hide");
                    renderizarGifos(element, cntResultadosGifos, index, dataGifos);
                }

                gifosRenderizados += countGifos;
                gifosFaltantes = gifosTotales - gifosRenderizados;

                // console.log("ver mas ", "gifosTotales: " + gifosTotales,
                //     "gifosRenderizados: " + gifosRenderizados,
                //     "countGifos : " + countGifos,
                //     "gifosFaltantes: ", gifosFaltantes,
                //     "dataGifos.length " + dataGifos.length);

                if (gifosFaltantes > 0) {
                    botonVerMasGifos.classList.remove("hide");
                } else {
                    botonVerMasGifos.classList.add("hide");
                }

            } else {
                botonVerMasGifos.classList.add("hide");
            }
        })
        .catch((err) => {
            console.err(err)
        });
});

// Busqueda de sugerencia de busqueda a partir de lo que ingrese el usuario 
function buscarSugerenciasBusquedas(busqueda) {
    const endpoint = "https://api.giphy.com/v1/gifs/search/tags?";
    const url = `${endpoint}api_key=${api_key}&q=${busqueda}&limit=4`;

    fetch(url)
        .then(response => response.json())
        .then(json => {
            dataSugerenciasBusqueda = json.data;
            pintarSugerenciasBusquedas();
        })
}

// Pinta las sugerencias de busqueda recibidas desde la Api
function pintarSugerenciasBusquedas() {
    listaSugerenciaBusqueda.innerHTML = "";
    dataSugerenciasBusqueda.forEach((elemento, index) => {
        let sugerenciasBusqueda = document.createElement("li");
        sugerenciasBusqueda.id = `sugerencia${index}`;
        sugerenciasBusqueda.innerHTML = elemento.name;
        listaSugerenciaBusqueda.appendChild(sugerenciasBusqueda);

        sugerenciasBusqueda.addEventListener("click", () => {
            inputBuscador.value = sugerenciasBusqueda.innerHTML
            buscarGifos(inputBuscador.value);
        })
    });
}

//Elementos de la seccion de trending
let listaSugerenciaTrending = document.getElementById("listaSugerenciaTrending");
let dataListaTrending = [];

buscarSugerenciaTrending();

//busca palabras de trending 
function buscarSugerenciaTrending() {

    const endpoint = "https://api.giphy.com/v1/trending/searches?";
    const url = `${endpoint}api_key=${api_key}`;

    fetch(url)
        .then(response => response.json())
        .then(json => {
            dataListaTrending = json.data;
            renderizarSugerenciaTrending()
            // sugerenciaTrending.innerHTML = dataListaTrending.filter(element => dataListaTrending.indexOf(element) < 5).join(', ');
        })
}

function renderizarSugerenciaTrending() {
    for (let i = 0; i < 6; i++) {
        let sugerenciaTrending = document.createElement("span");
        sugerenciaTrending.id = "sugerenciaTrending" + i;
        let trending = dataListaTrending[i];
        trending += i < 5 ? ', ' : '';
        sugerenciaTrending.innerHTML = trending;
        sugerenciaTrending.value = dataListaTrending[i]
        listaSugerenciaTrending.appendChild(sugerenciaTrending);

        sugerenciaTrending.addEventListener("click", () => {
            buscarGifos(sugerenciaTrending.value)
        })
    }
}

// }