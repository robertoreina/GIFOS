// script contiene funciones y manejo para renderizar las card 
// de los gifos en todas las paginas/Secciones (Resultado de Busqueda - Favoritos - Mis Gifos - Trending)

/**
 * Renderiza  card de gifo en contenedor recibido en paramentro seccion
 * 
 * @param {*} gifos  Objeto gifo a renderizar
 * @param {*} seccion objeto del contenedor donde se va a renderizar 
 * @param {*} enviar indice del array que contiene el objeto 
 * @param {*} array array que contiene el objeto con los gifos 
 */
function renderizarGifos(gifos, seccion, i, array) {

    // idSeccion = document.getElementById(idSeccion);
    let li = document.createElement("li");
    li.setAttribute("tabindex", "0");

    li.classList.add("cnt-card-gifos");
    li.classList.add(`cls-${seccion.id}`);
    let gifo = document.createElement("img");
    gifo.classList.add("gifo-min");
    gifo.setAttribute("src", gifos.images.original.url);  // aqui se asigna la url del gif que
    seccion.appendChild(li);
    li.appendChild(gifo);

    let div = document.createElement("div");
    div.classList.add("cnt-botones-gifos");

    let botonDescargar = document.createElement("img");
    botonDescargar.id = "botonDesGifo" + i;
    botonDescargar.setAttribute("src", "./assets/icon-download.svg");

    let botonMaximizar = document.createElement("img");
    botonMaximizar.id = "botonMaxGifo" + i;
    botonMaximizar.setAttribute("src", "./assets/icon-max-normal.svg");

    if (seccion.id == 'cntGifosMisGifos') {
        let botonEliminar = document.createElement("img");
        botonEliminar.id = "botonEliGifo" + i;
        botonEliminar.setAttribute("src", "./assets/icon-trash-normal.svg");

        // Boton eliminar gifo de la seccion mis gifos 
        botonEliminar.addEventListener("click", () => {
            deleteMisGifos(gifos.id);
        })

        botonEliminar.addEventListener("mouseover", () => {
            botonEliminar.setAttribute("src", "./assets/icon-trash-hover.svg");
        })

        botonEliminar.addEventListener("mouseout", () => {
            botonEliminar.setAttribute("src", "./assets/icon-trash-normal.svg");
        })

        div.appendChild(botonEliminar)

    } else {

        let botonFavoritos = document.createElement("img");
        botonFavoritos.id = "botonFavGifo" + i;
        botonFavoritos.setAttribute("src", dataGifosFavoritos.some((element) => element.id === gifos.id) ? "./assets/icon-fav-active.svg" : "./assets/icon-fav.svg");
        div.appendChild(botonFavoritos)

        // Boton favorito del gifo
        botonFavoritos.addEventListener("click", () => {

            if (dataGifosFavoritos.some((element) => element.id === gifos.id)) {
                gifoFavorito(false, gifos);
                botonFavoritos.setAttribute("src", "./assets/icon-fav.svg");
            } else {
                gifoFavorito(true, gifos);
                botonFavoritos.setAttribute("src", "./assets/icon-fav-active.svg");
            }
        })

        botonFavoritos.addEventListener("mouseover", () => {
            if (!dataGifosFavoritos.some((element) => element.id === gifos.id)) {
                botonFavoritos.setAttribute("src", "./assets/icon-fav-hover.svg");
            }
        })

        botonFavoritos.addEventListener("mouseout", () => {
            if (!dataGifosFavoritos.some((element) => element.id === gifos.id)) {
                botonFavoritos.setAttribute("src", "./assets/icon-fav.svg");
            }
        })

        li.addEventListener("mouseenter", () => {
            if (dataGifosFavoritos.some((element) => element.id === gifos.id)) {
                botonFavoritos.setAttribute("src", "./assets/icon-fav-active.svg");
            } else {
                botonFavoritos.setAttribute("src", "./assets/icon-fav.svg");
            }
        })
    }

    div.appendChild(botonDescargar)
    div.appendChild(botonMaximizar)
    li.appendChild(div);

    let userGifo = document.createElement("p");
    userGifo.classList.add("user-gifos");
    userGifo.innerHTML = gifos.username;

    let tituloGifo = document.createElement("p");
    tituloGifo.classList.add("titulo-gifos");
    tituloGifo.innerHTML = gifos.title;

    li.appendChild(userGifo);     // usuario del gifo en la card 
    li.appendChild(tituloGifo);   // titulo  del gifo en la card


    let maxGifoinMobile = document.createElement("span");  // este elemento permite maximizar el gifo en versiones mobile / se oculta para versiones desktop
    maxGifoinMobile.classList.add("max-gifo-mobile");
    li.appendChild(maxGifoinMobile);

    //Boton maximiza el gifo seleccionado para mobile
    maxGifoinMobile.addEventListener("click", () => maximizarGifo(gifos, i, array))

    //Boton maximiza el gifo seleccionado
    botonMaximizar.addEventListener("click", () => maximizarGifo(gifos, i, array))

    botonMaximizar.addEventListener("mouseover", () => {
        botonMaximizar.setAttribute("src", "./assets/icon-max-hover.svg");
    })

    botonMaximizar.addEventListener("mouseout", () => {
        botonMaximizar.setAttribute("src", "./assets/icon-max-normal.svg");
    })

    // Boton descargar gifo
    botonDescargar.addEventListener("click", () =>{
        downloadGifo(gifos.images.original.url)
    })

    botonDescargar.addEventListener("mouseover", () => {
        botonDescargar.setAttribute("src", "./assets/icon-download-hover.svg");
    })

    botonDescargar.addEventListener("mouseout", () => {
        botonDescargar.setAttribute("src", "./assets/icon-download.svg");
    })
}


// Maximiza gifo
function maximizarGifo(gifos, i, array) {
    cntGifoMax.classList.remove("hide");
    body.classList.add("overflow-hidden");
    gifoMaximizado.setAttribute("src", gifos.images.original.url)
    userGifoMax.innerHTML = gifos.username;
    tituloGifoMax.innerHTML = gifos.title;
    iGifoMax = i;
    dataGifosMaximizados = array;

    if (dataGifosMaximizados.length == 1) {
        console.log("click")
        botonRightGifoMax.classList.add("hide")
        botonLeftGifoMax.classList.add("hide")
    }

    if (dataGifosFavoritos.some((element) => element.id === gifos.id)) {
        botonFavGifoMax.setAttribute("src", "./assets/icon-fav-active.svg");
    } else {
        botonFavGifoMax.setAttribute("src", "./assets/icon-fav.svg");
    }
}


// Agrega o remueve gifos favoritos del localStorage
function gifoFavorito(favorito, gifo) {

    if (favorito) {
        dataGifosFavoritos.push(gifo)
    } else {
        let posicion = dataGifosFavoritos.findIndex(elemento => elemento.id == gifo.id);

        dataGifosFavoritos.splice(posicion, 1);
    }
    localStorage.setItem('favoritos', JSON.stringify(dataGifosFavoritos))
}

// Funcionalidad del boton Ver mas gifos en la seccion princiapl, Mis Gifos y Favoritos
botonVerMasGifos.addEventListener("mouseover", () => {
    if (modoActual === 'D') {
        botonVerMasGifos.attributes.src.value = "./assets/CTA-ver-mas-hover.svg";
    } else {
        botonVerMasGifos.attributes.src.value = "./assets/CTA-ver+hover-modo-noc.svg";
    }
});

botonVerMasGifos.addEventListener("mouseout", () => {
    if (modoActual === 'D') {
        botonVerMasGifos.attributes.src.value = "./assets/CTA-ver-mas.svg";
    } else {
        botonVerMasGifos.attributes.src.value = "./assets/CTA-ver+-modo-noc.svg";
    }
});


// funcion para descargar los gif 
async function downloadGifo(url) {
    //create new a element
    let a = document.createElement('a');
    // get image as blob
    let response = await fetch(url);
    let file = await response.blob();
    a.download = 'myGif';
    a.href = window.URL.createObjectURL(file);
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    a.click();
  };