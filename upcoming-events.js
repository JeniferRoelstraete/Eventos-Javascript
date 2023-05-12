let contenedorTarjetas = document.getElementById("contenedor-tarjetas-upcoming")
const fechaActual = data.currentDate
let containerCategory = document.getElementById("container-categorias");
let buscador = document.getElementById("buscador");
let valorBusqueda = document.getElementById("valor-ingresado");

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
    const listaEventos = crearListaEventos(filtrarEventosFuturos(listaEventosACrear, fechaActual))

    seccion.innerHTML = listaEventos
}

function filtrarEventosBusqueda(eventos, categorias, textoBusqueda) {
    return eventos.filter(evento => (categorias.length === 0 || categorias.includes(evento.category)) && evento.name.toLowerCase().includes(textoBusqueda.toLowerCase()))
}

actualizarDom(data.events, contenedorTarjetas)
actualizarListaCategoriasDom(data.events, containerCategory)

buscador.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log(document);
    const categoriasSeleccionadas = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value);
    const busqueda = valorBusqueda.value
    const eventosFiltrados = filtrarEventosBusqueda(data.events, categoriasSeleccionadas, busqueda)
    actualizarDom(eventosFiltrados, contenedorTarjetas)
    if (eventosFiltrados.length === 0) {
        setTimeout(() => alert('No se encontraron resultados para la búsqueda ingresada. Pruebe con otro valor'), 500)
    }
})
