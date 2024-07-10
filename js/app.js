//variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners(){

    listaCursos.addEventListener('click', agregarCurso);

    // Elimina curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vacíar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
       articulosCarrito = []; // Resetea el arreglo
       limpiarHtml(); 
    });
}

// Elimina curso del carrito

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        // Elimina del arreglo
            articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

            carritoHtml();
       
    }
}


// Funciones

function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
    //console.log(e.target.classList);
}

// Lee el contenido del HTML y extrae la info del curso

function leerDatosCurso(curso){
    //console.log(curso);

    //Se crea un objeto con el contenido

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1 
    }

    //Revisa si un elemento ya existen en el carrito

    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id ); //iteración 
    if(existe){
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        } )
    }else{
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    console.log(infoCurso);

    //Agrega elementos al arreglo de carrito

    
    console.log(articulosCarrito);

    carritoHtml();
}

// Muestra el carrito de compras en el html

function carritoHtml(){

    //Limpiar el HTML
    limpiarHtml();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${id}"> X </a></td>
        `;

        //Agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

// Elimina  los cursos del tbody

function limpiarHtml(){
    //contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
    
