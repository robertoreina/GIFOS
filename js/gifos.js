/**
 * Renderiza  gifos en cada seccion de la pagina
 * @param {*} gifos 
 * @param {*} seccion 
 */
 function renderizarGifos(gifos, seccion, i, array) {

    // idSeccion = document.getElementById(idSeccion);
    let li = document.createElement("li");
    li.setAttribute("tabindex", "0");

    li.classList.add("cnt-card-gifos");
    li.classList.add(`cls-${seccion.id}`);
    console.log(seccion.id)
    let gifo = document.createElement("img");
    gifo.classList.add("gifo-min");
    // gifo.setAttribute("src", gifos.images.fixed_height.url);
    gifo.setAttribute("src", gifos.images.preview_gif.url);  // aqui se asigna la url del gif que
    seccion.appendChild(li);
    li.appendChild(gifo);

    let div = document.createElement("div");
    div.classList.add("cnt-botones-gifos");

    let botonFavoritos = document.createElement("img");
    botonFavoritos.id = "botonFavGifo" + i;
    botonFavoritos.setAttribute("src", dataGifosFavoritos.some((element) => element.id === gifos.id) ? "./assets/icon-fav-active.svg" : "./assets/icon-fav.svg");

    let botonDescargar = document.createElement("img");
    botonDescargar.id = "botonDesGifo" + i;
    botonDescargar.setAttribute("src", "./assets/icon-download.svg");

    let botonMaximizar = document.createElement("img");
    botonMaximizar.id = "botonMaxGifo" + i;
    botonMaximizar.setAttribute("src", "./assets/icon-max-normal.svg");

    div.appendChild(botonFavoritos)
    div.appendChild(botonDescargar)
    div.appendChild(botonMaximizar)
    li.appendChild(div);

    let userGifo = document.createElement("p");
    userGifo.classList.add("user-gifos");
    userGifo.innerHTML = gifos.username;

    let tituloGifo = document.createElement("p");
    tituloGifo.classList.add("titulo-gifos");
    tituloGifo.innerHTML = gifos.title;

    li.appendChild(userGifo);
    li.appendChild(tituloGifo);

    //Boton maximiza el gifo seleccionado
    botonMaximizar.addEventListener("click", () => {
        cntGifoMax.classList.remove("hide");
        body.classList.add("overflow-hidden");
        gifoMaximizado.setAttribute("src", gifos.images.original.url)
        userGifoMax.innerHTML = gifos.username;
        tituloGifoMax.innerHTML = gifos.title;
        iGifoMax = i;
        dataGifosMaximizados = array;
    })

    botonMaximizar.addEventListener("mouseover", () => {
        botonMaximizar.setAttribute("src", "./assets/icon-max-hover.svg");
    })

    botonMaximizar.addEventListener("mouseout", () => {
        botonMaximizar.setAttribute("src", "./assets/icon-max-normal.svg");
    })

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

    // Boton descargar gifo
    botonDescargar.addEventListener("click", () => {

    })

    botonDescargar.addEventListener("mouseover", () => {
        botonDescargar.setAttribute("src", "./assets/icon-download-hover.svg");
    })

    botonDescargar.addEventListener("mouseout", () => {
        botonDescargar.setAttribute("src", "./assets/icon-download.svg");
    })
}

// Agrega o remueve gifos favoritos del localStorage
function gifoFavorito(favorito, gifo) {

    if (favorito) {
        dataGifosFavoritos.push(gifo)
    } else {
        let posicion = dataGifosFavoritos.find(elemento => elemento.id == gifo.id);
        dataGifosFavoritos.splice(posicion, 1);
    }

    localStorage.setItem('favoritos', JSON.stringify(dataGifosFavoritos))
}

