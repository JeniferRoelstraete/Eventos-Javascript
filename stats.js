let tablaGeneral = document.getElementById('estadisticas-tabla-general')
let tablaEventosPasados = document.getElementById('estadisticas-eventos-pasados')
let tablaEventosFuturos = document.getElementById('estadisticas-eventos-futuros')
let data
let fechaActual


fetch('https://mindhub-xj03.onrender.com/api/amazing')
.then(response => response.json())
.then(datos => {
    data = datos
    console.log(datos.events)
    fechaActual = data.currentDate
    const categoriasTodas = data.events.map(evento => evento.category)
    const categoriasNoRepetidas = Array.from(new Set(categoriasTodas))
    const porcentajeAsistenciaPorEvento = data.events.filter(evento => evento.assistance).map(evento => evento.assistance / evento.capacity * 100)
    const eventoMayorAsistencia = Math.max(...porcentajeAsistenciaPorEvento)
    const eventoMenorAsistencia = Math.min(...porcentajeAsistenciaPorEvento)
    const eventoMayorCapacidad = Math.max(...data.events.map(evento => evento.capacity))
    let templateCategoriasPasadas = ''
    let templateCategoriasFuturas = ''

    for (let categoria of categoriasNoRepetidas) {
        const eventosPasadosAgrupadosPorCategoria = data.events
        .filter(evento => evento.category === categoria && evento.date < fechaActual) 
        const eventosFuturosAgrupadosPorCategoria = data.events
        .filter(evento => evento.category === categoria && evento.date >= fechaActual)


        // Cálculo de ingresos (columna Revenues)
        const ingresoTotalEventosPasadosPorCategoria = eventosPasadosAgrupadosPorCategoria
        .reduce((ingresoTotal, evento) => ingresoTotal + evento.price * evento.assistance, 0)
        const ingresoTotalEventosFuturosPorCategoria = eventosFuturosAgrupadosPorCategoria
        .reduce((ingresoTotal, evento) => ingresoTotal + evento.price *  evento.estimate, 0)
        
        // Cálculo de % asistencia (columna attendance)
        const porcentajeAsistenciaEventosPasadosPorCategoria = eventosPasadosAgrupadosPorCategoria
        .reduce((porcentajeTotal, evento) => porcentajeTotal + evento.assistance / evento.capacity, 0) * 100 / eventosPasadosAgrupadosPorCategoria.length
        const porcentajeAsistenciaEventosFuturosPorCategoria = eventosFuturosAgrupadosPorCategoria
        .reduce((porcentajeTotal, evento) => porcentajeTotal + evento.estimate / evento.capacity, 0) * 100 / eventosFuturosAgrupadosPorCategoria.length
        
        // Excluyo categorias que no tienen valores
        if (eventosPasadosAgrupadosPorCategoria.some(evento => evento.category === categoria)) {
            templateCategoriasPasadas += armarFilaTabla(categoria, ingresoTotalEventosPasadosPorCategoria, porcentajeAsistenciaEventosPasadosPorCategoria)
        }
        if (eventosFuturosAgrupadosPorCategoria.some(evento => evento.category === categoria)) {
            templateCategoriasFuturas += armarFilaTabla(categoria, ingresoTotalEventosFuturosPorCategoria, porcentajeAsistenciaEventosFuturosPorCategoria)
        }
    }
    
    tablaGeneral.innerHTML = armarFilaTablaGeneral(eventoMayorAsistencia, eventoMenorAsistencia, eventoMayorCapacidad)    
    tablaEventosPasados.innerHTML = templateCategoriasPasadas
    tablaEventosFuturos.innerHTML = templateCategoriasFuturas
})
.catch(err => console.log(err))

function armarFilaTablaGeneral(mayorAsistencia, menorAsistencia, mayorCapacidad) {
    return `
    <tr>
        <td>${(mayorAsistencia).toFixed(2)} %</td>
        <td>${(menorAsistencia).toFixed(2)} %</td>
        <td>${mayorCapacidad.toLocaleString()}</td>
    </tr>`  
}

function armarFilaTabla(categoria, ingresos, porcentaje) {
    return `
    <tr>
        <td>${categoria}</td>
        <td>$ ${ingresos.toLocaleString()}</td>
        <td>${porcentaje.toFixed(2)} %</td>
    </tr>`  
}
