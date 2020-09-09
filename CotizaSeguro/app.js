// Cotizador

function Seguro(marca, anio, tipo)
{
    this.marca = marca
    this.anio = anio
    this.tipo = tipo
}
Seguro.prototype.cotizarSeguro = function()
{
    /*
        1 = americano 1.15
        2 = asiatico 1.05
        3 = europeo 1.35
    */
    let cantidad;
    const base = 2000;

    switch(this.marca)
    {
        case "1":
            cantidad = base * 1.15;
            break;
        case "2":
            cantidad = base * 1.05;
            break;
        case "3":
            cantidad = base * 1.35;
            break;
    }
    
    const diferencia = new Date().getFullYear() - this.anio;
    cantidad -= ((diferencia * 3) * cantidad) / 100;

    /*
        Si el seguro es básico se múltiplica por 30% más
        Si el seguro es completo por 50% más
    */
    
    if(this.tipo === "basico")
    {
        cantidad *= 1.30
    }
    else
    {
        cantidad *= 1.50
    }

    return cantidad;
}

function Interfaz()
{

}

Interfaz.prototype.mostrarMensaje = function(mensaje, tipo)
{
    const div = document.createElement('div');

    if(tipo === "error")
    {
        div.classList.add("mensaje", "error");
    }
    else
    {
        div.classList.add("mensaje", "correcto");
    }
    div.innerHTML = `${mensaje}`
    formulario.insertBefore(div, document.querySelector(".form-group"))

    setTimeout(function()
    {
        document.querySelector(".mensaje").remove()
    }, 3000);
}

Interfaz.prototype.mostrarResultado = function(seguro, resultado)
{
    const resultado2 = document.querySelector('#resultado');
    let marca;
    switch(seguro.marca)
    {
        case "1":
            marca = 'Americano';
            break;
        case "2":
            marca = 'Asiatico';
            break;
        case "3":
            marca = 'Europeo';
            break;
    }
    const div = document.createElement('div');
    div.innerHTML = `
        <p class="header">Tu resumen: </p>
        <p>Marca: ${marca} </p>
        <p>Año: ${seguro.anio} </p>
        <p>Tipo: ${seguro.tipo} </p>
        <p>Total: $ ${resultado} </p>
    `;

    const spinner = document.querySelector('#cargando img')
    spinner.style.display = "block";
    setTimeout(function()
    {
        spinner.style.display = "none"
        resultado2.appendChild(div)
    },3000);
    
}

const formulario = document.querySelector('#cotizar-seguro')
document.addEventListener("submit", function(event)
{
    event.preventDefault();

    const marca = document.querySelector('#marca')
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;

    const anio = document.querySelector('#anio')
    const anioSeleccionado = anio.options[anio.selectedIndex].value;

    const tipo = document.querySelector('input[name="tipo"]:checked').value

    const interfaz = new Interfaz();
    if(marcaSeleccionada === '' || anioSeleccionado === '' || tipo === '')
    {
        interfaz.mostrarMensaje("Faltan datos, revisar el formulario y prueba de nuevo", "error");
    }
    else
    
    {
        // Limpiar resultados anteriores
        const resultados = document.querySelector('#resultado div')
        if(resultados != null)
        {
            resultados.remove()
        }
        const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);
        const cantidad = seguro.cotizarSeguro();

        interfaz.mostrarResultado(seguro, cantidad)
        interfaz.mostrarMensaje("Cotizando....", "exito")
    }
})

const max = new Date().getFullYear(),
      min = max - 20;


    console.log(max);
    console.log(min);

const selectAnios = document.querySelector('#anio');
for(let i = max; i >= min; i--)
{
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option)
}