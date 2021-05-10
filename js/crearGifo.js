// script para el manejo de la pagina crear gifos

let video = document.querySelector('video');
let grabar = document.getElementById('grabar');
let finalizar = document.getElementById("finalizar");
let subirGifo = document.getElementById("subirGifo");
let timerbtnRepetir = document.getElementById('timer-btnRepetir');
let stream = null;
let track = null;
let recorder = null;
let dataGifId = [];

let body = document.getElementsByTagName("body")[0];
let botonCrearGifo = document.getElementById("botonCrearGifo");

let linkFacebook = document.getElementById("linkFacebook");
let linkTwitter = document.getElementById("linkTwitter");
let linkInstagram = document.getElementById("linkInstagram");


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
        botonCrearGifo.attributes.src.value = "./assets/CTA-crear-gifo-active.svg"

        //iconos footer
        linkFacebook.setAttribute("src", "./assets/icon_facebook.svg")
        linkTwitter.setAttribute("src", "./assets/icon-tw-normal.svg");
        linkInstagram.setAttribute("src", "./assets/icon_instagram.svg")

        // figuras camara y pelicula
        document.querySelectorAll('figure > img')[0].setAttribute("src", "./assets/camara-modo-noc.svg")
        document.querySelectorAll('figure > img')[1].setAttribute("src", "./assets/Path 2.svg")
        document.querySelectorAll('figure > img')[2].setAttribute("src", "./assets/pelicula-modo-noc.svg")

    } else {    // Activa modo Diurno
        modoDiurnoNocturno.innerHTML = 'Modo Nocturno';
        modoActual = 'D';
        body.classList.add("modo-diurno");
        body.classList.remove("modo-nocturno");

        //iconos seccion nav
        logoPagina.attributes.src.value = "./assets/logo-desktop.svg";
        iconoEquis.attributes.src.value = "./assets/close.svg";
        iconoBurger.attributes.src.value = "./assets/burger.svg";
        botonCrearGifo.attributes.src.value = "./assets/CTA-crear-gifo-active.svg"

        // iconos footer
        linkFacebook.setAttribute("src", "./assets/icon_facebook.svg");
        linkTwitter.setAttribute("src", "./assets/icon-tw-normal.svg");
        linkInstagram.setAttribute("src", "./assets/icon_instagram.svg");

        // figuras camara y pelicula
        document.querySelectorAll('figure > img')[0].setAttribute("src", "./assets/camara.svg")
        document.querySelectorAll('figure > img')[1].setAttribute("src", "./assets/element-luz-camara.svg")
        document.querySelectorAll('figure > img')[2].setAttribute("src", "./assets/pelicula.svg")

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
        if (location.pathname == '/crearGifo.html') {
            botonCrearGifo.attributes.src.value = "./assets/CTA-crear-gifo-active.svg";
        } else {
            botonCrearGifo.attributes.src.value = "./assets/button-crear-gifo.svg";
        }
    } else {
        if (location.pathname == '/crearGifo.html') {
            botonCrearGifo.attributes.src.value = "./assets/CTA-crear-gifo-active.svg"
        } else {
            botonCrearGifo.attributes.src.value = "./assets/CTA-crear-gifo-modo-noc.svg";
        }
    }
})

let cntMsg01 = document.getElementById("cntMsg01");
let cntMsg02 = document.getElementById("cntMsg02");
let cntMsg03 = document.getElementById("cntMsg03");
let paso1 = document.getElementById("paso1");
let paso2 = document.getElementById("paso2");
let paso3 = document.getElementById("paso3");
let btnDownloadNuevoGif = document.getElementById("btnDownloadNuevoGif");
let btnLinkNuevoGif = document.getElementById("btnLinkNuevoGif");
let cntBtnsDownLink = document.getElementById("cntBtnsDownLink");

if (localStorage.getItem('id-mis-gifos') != null) {
    dataGifId = (JSON.parse(localStorage.getItem('id-mis-gifos')));
}

//boton solicita perisos y aplica estilos para el paso 1
comenzar.addEventListener("click", () => getPermisos());

//boton para inicia la grabacion del gifo
grabar.addEventListener("click", () => getMedia());

//boton para finalizar la grabacion del gif
finalizar.addEventListener("click", () => stopMedia());

//boton para realizar el post hacia GIPHY 
subirGifo.addEventListener("click", () => postGifos());

// obtener permisos para uso de camar
async function getPermisos() {
    let constraints = { audio: false, video: { width: 450, height: 250 } };
    cntMsg01.classList.add("hide");
    cntMsg02.classList.remove("hide");
    paso1.classList.add("paso-active");
    comenzar.classList.add("hide");

    try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        video.play();
        track = stream.getTracks()[0];
        cntMsg02.classList.add("hide");
        paso1.classList.remove("paso-active");
        paso2.classList.add("paso-active");
        grabar.classList.remove("hide")

    }
    catch (err) {
        console.log(err.name + ": " + err.message);
        comenzar.classList.remove("hide");

    }
}

// funcion para grabar video 
async function getMedia() {
    let constraintsRTC = {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 450,
        hidden: 250,
        onGifRecordingStarted: function () {
            console.log('started')
        },
    };

    try {
        initTimer();
        recorder = new RecordRTC(stream, constraintsRTC);
        recorder.startRecording();
        grabar.classList.add("hide");
        finalizar.classList.remove("hide");
    }
    catch (err) {
        console.log(err.name + ": " + err.message);
    }
}

// detiene y recupera video grabado
let form = new FormData();
let blob;
function stopMedia() {
    track.stop();
    stopTimer();
    timerbtnRepetir.classList.add("btn-repetir");
    finalizar.classList.add("hide")
    subirGifo.classList.remove("hide")
    recorder.stopRecording(function () {
        blob = recorder.getBlob();
        form.append('file', blob, 'myGif.gif');
        console.log(form.get('file'))
        // invokeSaveAsDialog(blob);
    });
}

let cronos;
let tiempo;
let seg = 0;
let min = 0;
let hor = 0;

// funciona que inicializa el cronometo 
function initTimer() {
    cronos = setInterval(function () { timer() }, 1000);
}

// funcion controla el cronometro 
function timer() {
    seg += 1;
    if (seg === 60) {
        min += 1
        seg = 0;
    }
    if (min === 60) {
        min = 0
        hor += 1;
    }
    tiempo = `${hor} : ${min} : ${seg}`

    timerbtnRepetir.innerHTML = tiempo;
}

// funcion que detiene el cronometro 
function stopTimer() {
    clearInterval(cronos);
    seg = 0;
    min = 0;
    hor = 0;
    timerbtnRepetir.innerHTML = "REPETIR CAPTURA";
}

// funcion de que ejecuta fetch para subir gif creado a giphy mediante un post
async function postGifos() {

    subirGifo.classList.add("hide")
    paso2.classList.remove("paso-active");
    paso3.classList.add("paso-active");
    cntMsg03.classList.remove("hide");
    timerbtnRepetir.innerHTML = " "

    const endpoint = "https://upload.giphy.com/v1/gifs?";
    const api_key = "lrnG9FoHoVNeYhrRPSGA1MtbbERL9qZL";
    const url = `${endpoint}api_key=${api_key}&file${form}&source_post_url:${document.location.href}`;
    try {
        let response = await fetch(url, {
            method: 'POST',
            body: form
        });
        let jsonData = await response.json();
        dataGifId.push(jsonData.data)
        localStorage.setItem('id-mis-gifos', JSON.stringify(dataGifId))
        cntBtnsDownLink.classList.remove("hide")
        document.querySelectorAll("#cntMsg03 img")[0].setAttribute("src", "./assets/ok.svg")
        document.querySelectorAll("#cntMsg03 p")[0].innerHTML = "GIFO subido con éxito";


    } catch (err) {
        console.log(err.name + ": " + err.message);
    }
}

function prueba() {
    setTimeout(function () { return 0 }, 5000);
}



//boton descargar gifo creado
btnDownloadNuevoGif.addEventListener("click", () => {
    invokeSaveAsDialog(blob);
})

btnDownloadNuevoGif.addEventListener("mouseover", (e) => {
    btnDownloadNuevoGif.setAttribute("src", "./assets/icon-download-hover.svg");
})

btnDownloadNuevoGif.addEventListener("mouseout", (e) => {
    btnDownloadNuevoGif.setAttribute("src", "./assets/icon-download.svg")
})

//boton compartir gifo creado
btnLinkNuevoGif.addEventListener("click", () => {
})

btnLinkNuevoGif.addEventListener("mouseover", (e) => {
    btnLinkNuevoGif.setAttribute("src", "./assets/icon-link-hover.svg");
})

btnLinkNuevoGif.addEventListener("mouseout", (e) => {
    btnLinkNuevoGif.setAttribute("src", "./assets/icon-link-normal.svg")
})