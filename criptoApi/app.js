// Leer formulario
const formulario = document.querySelector('#formulario')
const Api = new API('0a238f698630274a5c8ac6035e8c7ecf02deeec9b89992fcbb59edf49fa5cf0d');
const ui = new Interfaz();


formulario.addEventListener('submit', (event) =>
{
    event.preventDefault()
    
    const monedaSelect = document.querySelector('#moneda');
    const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value

    const criptoSelect = document.querySelector('#criptomoneda');
    const criptoSeleccionada = criptoSelect.options[criptoSelect.selectedIndex].value
    if(monedaSeleccionada === '' || criptoSeleccionada === '')
    {
        ui.mostrarMensaje("Ambos campos son obligatorios", "alert bg-danger text-center")
    }
    else
    {
        Api.obtenerValores(monedaSeleccionada, criptoSeleccionada)
            .then(data => 
                {
                    ui.mostrarResultado(data.resultado.RAW,  monedaSeleccionada, criptoSeleccionada);
                })
    }
    
})