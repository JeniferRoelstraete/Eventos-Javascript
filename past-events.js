let contenedorTarjetas = document.getElementById("contenedor-tarjetas-pastevents")
const fechaActual = data.currentDate

function armarTarjeta(evento) {
  return `
<div class="card">
    <img src="${evento.image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${evento.name}</h5>
        <p class="card-text">${evento.description}</p>
        <div class="d-flex justify-content-between align-items-center">
            <p class="m-0">Price ${evento.price}</p>
            <a href="./details.html" class="btn btn-primary">See more</a>
        </div>
    </div>
</div>`
}

function crearListaEventos(eventos) {
    let listaEventos = ''
    for (let evento of eventos) {
        listaEventos += armarTarjeta(evento)
    }

    return listaEventos
}

function filtrarEventosPasados(eventos, fecha) {
    return eventos.filter(evento => evento.date < fecha)
}


function actualizarDom(listaEventosACrear, seccion) {
    const listaEventos = crearListaEventos(filtrarEventosPasados(listaEventosACrear, fechaActual))

    seccion.innerHTML = listaEventos
}

actualizarDom(data.events, contenedorTarjetas)
