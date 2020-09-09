import * as UI from './interfaz.js';
import * as API from './api.js';

UI.formularioBuscar.addEventListener('submit', (event) =>
{
    event.preventDefault();

    // Obtener datos del formulario
    const artista = document.querySelector('#artista').value,
          cancion = document.querySelector('#cancion').value;

    if(artista === '' || cancion === '')
    {
        UI.divMensajes.innerHTML = "Error... Todos los campos son obligatorios";
        UI.divMensajes.classList.add('error');
        setTimeout( () => 
        {
            UI.divMensajes.innerHTML = "";
            UI.divMensajes.classList.remove('error');
        }, 3000);
        
    }
    else
    {
        const api = new API.API(artista, cancion);
        api.consultarApi()
            .then(data => 
                {
                    if(data.respuesta.lyrics)
                    {
                        const letra = data.respuesta.lyrics;
                        UI.divResultado.textContent = letra;
                    }
                    else
                    {
                        UI.divMensajes.innerHTML = "La canción no existe, prueba con otra busqueda";
                        UI.divMensajes.classList.add('error');
                        setTimeout( () => 
                        {
                            UI.divMensajes.innerHTML = "";
                            UI.divMensajes.classList.remove('error');
                            UI.formularioBuscar.reset()
                        }, 3000);
                    }
                })
    }
});