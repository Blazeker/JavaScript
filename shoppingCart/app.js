// Variables
const carrito = document.querySelector('#carrito');
const cursos = document.querySelector('#lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');



// Event listeners
cargarEventListeners();

function cargarEventListeners()
{
    cursos.addEventListener('click', comprarCurso);
    carrito.addEventListener('click', eliminarCurso);
    vaciarCarrito.addEventListener('click', vaciarCarritoBTN);
    document.addEventListener('DOMContentLoaded', leerLS);
}




// Funciones


function comprarCurso(event)
{
    event.preventDefault();
    if(event.target.classList.contains('agregar-carrito'))
    {
        const curso = event.target.parentElement.parentElement;

        leerDatosCurso(curso);
    }
}

function leerDatosCurso(curso)
{
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    };
    insertarCarrito(infoCurso);

}

function insertarCarrito(infoCurso)
{
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${infoCurso.imagen}" width=100>
        </td>
        <td>${infoCurso.titulo}</td>
        <td>${infoCurso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${infoCurso.id}">X</a>
        </td>
    `;
    listaCursos.appendChild(row);
    guardarCursoLS(infoCurso);
}

function eliminarCurso(event)
{
    event.preventDefault();
    
    let curso, cursoID;
    if(event.target.classList.contains('borrar-curso'))
    {
        event.target.parentElement.parentElement.remove();
        curso = event.target.parentElement.parentElement;
        cursoID = curso.querySelector('a').getAttribute('data-id');
    }
    eliminarCursoLS(cursoID);
}

function vaciarCarritoBTN()
{
    // Forma lenta
    // listaCursos.innerHTML = '';

    // Forma recomendada
    while(listaCursos.firstChild)
    {
        listaCursos.removeChild(listaCursos.firstChild);
    }

    vaciarLS();
    return false;
}

function guardarCursoLS(curso)
{
    let cursos;
    // Toma el valor de un arreglo con datos de LS o vacio
    cursos = obtenerCursosLS();

    cursos.push(curso);

    localStorage.setItem('cursos', JSON.stringify(cursos));
}

function obtenerCursosLS()
{
    let cursosLS;

    if(localStorage.getItem('cursos') === null)
    {
        cursosLS = [];
    }
    else
    {
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }

    return cursosLS;
}

function leerLS()
{
    let cursosLS;

    cursosLS = obtenerCursosLS();

    cursosLS.forEach(function(curso)
    {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width=100>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
        `;
        listaCursos.appendChild(row);
    });
}

function eliminarCursoLS(cursoID)
{
    let cursosLS;

    cursosLS = obtenerCursosLS();

    cursosLS.forEach(function(curso, i)
    {
        if(curso.id === cursoID)
        {
            cursosLS.splice(i, 1);
        }
    });

    localStorage.setItem('cursos', JSON.stringify(cursosLS));
}

function vaciarLS()
{
    localStorage.clear();
}