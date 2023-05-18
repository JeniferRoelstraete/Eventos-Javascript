let contenedorTarjetas = document.getElementById("contenedor-tarjetas-upcoming")
let containerCategory = document.getElementById("container-categorias")
let buscador = document.getElementById("buscador")
let valorBusqueda = document.getElementById("valor-ingresado")
let data
let fechaActual

function armarTarjeta(evento) {
  return `
<div class="card">
    <img src="${evento.image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${evento.name}</h5>
        <p class="card-text">${evento.description}</p>
        <div class="d-flex justify-content-between align-items-center">
            <p class="m-0">Price ${evento.price}</p>
            <a href="./details.html?id=${evento._id}" class="btn btn-primary">See more</a>
        </div>
    </div>
</div>`
}

function armarCheckbox(nombreCategoria, indice) {
    return `<div class="form-check">
            <input class="form-check-input" type="checkbox" value="${nombreCategoria}" id="check-${indice}">
            <label class="form-check-label" for="check-${indice}">
              ${nombreCategoria}
            </label>
          </div>`
}

function armarMensajeNoEncontrado() {
    return `
        <h3 class="mensaje-no-encontrado">No records where found for the current search. Try other values</h3>
    `
}
    
function crearListaCategoriasCheckbox(eventos)
{
    let categoriasCheckbox = ''
    const categorias = eventos.map(evento => evento.category)
    const conjuntoDeCategorias = new Set(categorias)
    Array.from(conjuntoDeCategorias).forEach((categoria, indice) => categoriasCheckbox += armarCheckbox(categoria, indice))
    
    return categoriasCheckbox
}

function actualizarListaCategoriasDom(eventos, seccion) {
    const listaCategorias = crearListaCategoriasCheckbox(eventos)
    seccion.insertAdjacentHTML("afterbegin", listaCategorias) 
}

function crearListaEventos(eventos) {
    let listaEventos = ''
    for (let evento of eventos) {
        listaEventos += armarTarjeta(evento)
    }

    return listaEventos
}

function filtrarEventosFuturos(eventos, fecha) {
    return eventos.filter(evento => evento.date >= fecha)
}

function actualizarDom(listaEventosACrear, seccion) {
    if (listaEventosACrear.length === 0) {
        seccion.innerHTML = armarMensajeNoEncontrado()
    } else {
        seccion.innerHTML = crearListaEventos(listaEventosACrear)
    }
}

function filtrarEventosBusqueda(eventos, categorias, textoBusqueda) {
    return eventos.filter(evento => (categorias.length === 0 || categorias.includes(evento.category)) && evento.name.toLowerCase().includes(textoBusqueda.toLowerCase()))
}

containerCategory.addEventListener("change", () => {
    const categoriasSeleccionadas = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value)
    const busqueda = valorBusqueda.value
    const eventosFuturos = filtrarEventosFuturos(data.events, fechaActual)
    const eventosFiltrados = filtrarEventosBusqueda(eventosFuturos, categoriasSeleccionadas, busqueda)
    actualizarDom(eventosFiltrados, contenedorTarjetas)
})

buscador.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log(document)
    const categoriasSeleccionadas = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value)
    const busqueda = valorBusqueda.value
    const eventosFuturos = filtrarEventosFuturos(data.events, fechaActual)
    const eventosFiltrados = filtrarEventosBusqueda(eventosFuturos, categoriasSeleccionadas, busqueda)
    actualizarDom(eventosFiltrados, contenedorTarjetas)
})


fetch('https://mindhub-xj03.onrender.com/api/amazing')
.then(respuesta => respuesta.json())
.then(respuesta => {
    data = respuesta
    fechaActual = data.currentDate
    const eventosFuturos = filtrarEventosFuturos(data.events, fechaActual)
    actualizarDom(eventosFuturos, contenedorTarjetas)
    actualizarListaCategoriasDom(data.events, containerCategory)
})
.catch(error => console.log(error))