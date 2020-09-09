class Interfaz
{
    constructor()
    {
        this.init();
    }

    init()
    {
        this.construirSelect();
    }
    construirSelect()
    {
        Api.obtenerMonedasAPI()
            .then(monedas => 
                {
                    const selectOption = document.querySelector('#criptomoneda')
                    for(const [key, value] of Object.entries(monedas.monedas.Data))
                    {
                        const opcion = document.createElement('option')
                        opcion.value = value.Symbol;
                        opcion.appendChild(document.createTextNode(value.CoinName))
                        selectOption.appendChild(opcion)
                    }
                })
    }


    mostrarMensaje(mensaje, clases)
    {
        const div = document.createElement('div')
        div.className = clases;
        div.appendChild(document.createTextNode(mensaje))

        const divMensaje = document.querySelector('.mensajes')
        divMensaje.appendChild(div)

        setTimeout(() =>
        {
            document.querySelector('.mensajes div').remove()
        }, 3000)
    }

    mostrarResultado(resultado, moneda, criptoMoneda)
    {
        const resultadoAnterior = document.querySelector('#resultado div')
        if(resultadoAnterior)
        {
            resultadoAnterior.remove()
        }
        const datosMoneda = resultado[criptoMoneda][moneda]

        let precio = datosMoneda.PRICE.toFixed(2),
            porcentaje = datosMoneda.CHANGEPCTDAY.toFixed(2),
            actualizado = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('es-CO')

        let html = 
        `
            <div class="card bg-warning">
                <div class="card-body text-light>
                    <h2 class="card-title">Resultado:</h2>
                    <p>El precio de ${datosMoneda.FROMSYMBOL} a moneda ${datosMoneda.TOSYMBOL} es de: $${precio} </p>
                    <p>Variación último día: % ${porcentaje} </p>
                    <p>Última actualización: ${actualizado} </p>
                </div>
            </div>
        `

        this.mostrarSpinner('block')
        setTimeout(() =>
        {
            document.querySelector('#resultado').innerHTML = html
            this.mostrarSpinner('None')
        }, 3000)
        
    }

    mostrarSpinner(vista)
    {
        const spinner = document.querySelector('.contenido-spinner')
        spinner.style.display = vista;
    }
}