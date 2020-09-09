// Variables
const presupuestoUsuario = prompt("Cuál es tu presupuesto semanal?")
const formulario = document.querySelector("#agregar-gasto")
let cantidadPresupuesto;

// Clases
class Presupuesto
{
    constructor(presupuesto)
    {
        this.presupuesto = Number(presupuesto)
        this.restante = Number(presupuesto)
    }
    presupuestoRestante(cantidad = 0)
    {
        return this.restante -= Number(cantidad);
    }
}

class Interfaz
{
    insertarPresupuesto(cantidad)
    {
        const presupuestoSpan = document.querySelector('span#total')
        const restanteSpan = document.querySelector('span#restante')

        presupuestoSpan.innerHTML = cantidad
        restanteSpan.innerHTML = cantidad
    }

    imprimirMensaje(mensaje, tipo)
    {
        const divMensaje = document.createElement('div')
        divMensaje.classList.add('text-center', 'alert')
        if(tipo === 'error')
        {
            divMensaje.classList.add('alert-danger');
        }
        else
        {
            divMensaje.classList.add('alert-success')
        }
        divMensaje.appendChild(document.createTextNode(mensaje))
        document.querySelector('.primario').insertBefore(divMensaje, formulario)
        setTimeout(function()
        {
            document.querySelector('.primario .alert').remove()
            formulario.reset()
        }, 3000);
    }

    agregarGastos(nombreGasto, cantidadGasto)
    {
        const gastosLista = document.querySelector("#gastos ul")

        const li = document.createElement("li")
        li.className = "list-group-item d-flex justify-content-between align-items-center"
        li.innerHTML = 
        `
            ${nombreGasto}
            <span class="badge badge-primary badge-pill"> $ ${cantidadGasto} </span>
        `;
        gastosLista.appendChild(li)
    }

    presupuestoRestante(cantidadGasto)
    {
        const restante = document.querySelector('span#restante')
        const presupuesResta = cantidadPresupuesto.presupuestoRestante(cantidadGasto)

        restante.innerHTML = presupuesResta
        this.comprobarPresupuesto();
    }

    comprobarPresupuesto()
    {
        const presupuestoTotal = cantidadPresupuesto.presupuesto
        const restanteTotal = cantidadPresupuesto.restante
        if(restanteTotal <100 (presupuestoTotal / 4))
        {
            const restante = document.querySelector('.restante')
            restante.classList.remove('alert-success', 'alert-warning');
            restante.classList.add('alert-danger')
        }
        else if(restanteTotal < (presupuestoTotal / 2))
        {
            const restante = document.querySelector('.restante')
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning')
        }
    }
}







// Event listeners
document.addEventListener('DOMContentLoaded', function()
{
    if(presupuestoUsuario === null || presupuestoUsuario === '')
    {
        window.location.reload()
    }
    else
    {
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario)
        const ui = new Interfaz()
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto)
    }
})

formulario.addEventListener('submit', function(event)
{
    event.preventDefault();
    const nombreGasto = document.querySelector("#gasto").value;
    const cantidadGasto = document.querySelector("#cantidad").value;

    const ui = new Interfaz()

    if(nombreGasto === '' || cantidadGasto === '')
    {
        ui.imprimirMensaje("Hubo un error", "error")
    }
    else
    {
        ui.imprimirMensaje("Agregado", "correcto")
        ui.agregarGastos(nombreGasto, cantidadGasto)
        ui.presupuestoRestante(cantidadGasto);
    }
})