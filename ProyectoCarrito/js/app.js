// localStorage.clear();

const carrito = document.querySelector('#carrito');
const productos = document.querySelector('#lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');

eventListeners();

function eventListeners(){
    productos.addEventListener('click', agregarCurso);

    carrito.addEventListener('click', borrarCurso);

    document.addEventListener('DOMContentLoaded', mostrarCursosLS);
}

function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        curso = e.target.parentElement.parentElement;
        datosCurso(curso);
    }
}

function datosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        nombre: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }
    
    insertarCarrito(infoCurso);
    almacenarCurso(infoCurso);
}

function insertarCarrito(infoCurso){
    const row = document.createElement('tr');
    row.innerHTML = `
            <td>
                <img src="${infoCurso.imagen}"  width=100>
            </td>
            <td>
                ${infoCurso.nombre}
            </td>
            <td>
                ${infoCurso.precio}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${infoCurso.id}">X</a>
            </td>
            `;
    listaCursos.appendChild(row);
}

function borrarCurso(e){
    e.preventDefault();
    let cursoId;
    if(e.target.className == 'borrar-curso'){
        cursoId = e.target.parentElement.parentElement.querySelector('a').getAttribute('data-id');
        e.target.parentElement.parentElement.remove();
        borrarCursoLS(cursoId);
    }
    else if(e.target.id == "vaciar-carrito"){
        while(listaCursos.firstChild){
            listaCursos.removeChild(listaCursos.firstChild);
        }
        localStorage.clear();
    }
    return false;
}

function almacenarCurso(curso){
    let cursos;
    cursos = cursosAlmacenados();
    cursos.push(curso);
    localStorage.setItem('cursos', JSON.stringify(cursos));
}

function cursosAlmacenados(){
    let cursosLS;

    if(localStorage.getItem('cursos') == null){
        cursosLS = [];
    } else{
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }

    return cursosLS;
} 

function mostrarCursosLS(){
    let cursosLS;
    cursosLS = cursosAlmacenados();
    cursosLS.forEach(function(curso){
        insertarCarrito(curso);
    });
}

function borrarCursoLS(cursoId){
    let cursosLS;
    cursosLS = cursosAlmacenados();

    cursosLS.forEach(function(curso, index){
        if(curso.id == cursoId){
            cursosLS.splice(index, 1);
        }
    });

    localStorage.setItem('cursos', JSON.stringify(cursosLS));
}