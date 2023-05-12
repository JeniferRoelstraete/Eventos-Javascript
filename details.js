let contenedorEvento = document.getElementById('contenedor-evento')
const param = location.search
const searchParams = new URLSearchParams(param)
const idEvento = searchParams.get('id')

function armarDetalleEvento(evento) {
    return `
    <div>
        <img id="detail-image" src=${evento.image} alt="">
    </div>
    <div class="d-flex flex-column align-items-center">
        <h2 class="pb-2">${evento.name}</h2>
        <p>Date: ${evento.date}</p>
        <p>Description: ${evento.description}</p>
        <p>Category: ${evento.category}</p>
        <p>Place: ${evento.place}</p>
        <p>Capacity: ${evento.capacity} people</p>
        <p>Assistance or estimate: ${evento.assistance} people</p>
        <p>Price: USD ${evento.price}</p>
    </div>`
}

function obtenerEventoPorId(listaEventos, id) {
    return listaEventos.find(evento => evento._id === id)
}

function actualizarDomEvento(idEvento, contenedorEvento) {
    const evento = obtenerEventoPorId(data.events, idEvento)
    const detalleEvento = armarDetalleEvento(evento)
    contenedorEvento.innerHTML = detalleEvento
}

 actualizarDomEvento(idEvento, contenedorEvento)