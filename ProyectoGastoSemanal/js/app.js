const presupuestoUser = prompt("¿Cual es tu presupuesto semanal?");
const formulario = document.querySelector('#agregar-gasto');

let cantidadPresupuesto;

class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }

    presupuestoRestante(cantidad=0){
        return this.restante -= Number(cantidad);
    }
}

class Interfaz{
    
    insertarPresupuesto(cantidad){
        const presupuestoSpan = document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');

        presupuestoSpan.innerHTML = `${cantidad}`;
        restanteSpan.innerHTML = `${cantidad}`;
    }

    imprimirMensaje(mensaje, tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');
        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }
        divMensaje.appendChild(document.createTextNode(mensaje));
        
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        setTimeout(function(){
            document.querySelector('.primario .alert').remove();
            formulario.reset();
        }, 3000)
    }

    agregarGastoListado(nombre, cantidad){
        const listaGastos = document.querySelector('#gastos ul');

        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            ${nombre}
            <span class="badge badge-primary badge-pill">$ ${cantidad}</span>
        `;
        
        listaGastos.appendChild(li);
    }
    
    presupuestoRestante(cantidad){
        const restante = document.querySelector('span#restante');

        const presupuestoRestanteUser = cantidadPresupuesto.presupuestoRestante(cantidad);

        restante.innerHTML = `${presupuestoRestanteUser}`;

        this.comprobarPresupuesto();
    }

    comprobarPresupuesto(){
        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;

        if((presupuestoTotal / 4) > presupuestoRestante){
            const restante = document.querySelector('.restante');
            restante.classList.remove('.alert-success', 'alert-warning');
            restante.classList.add('alert-danger');
        } else if((presupuestoTotal / 2) > presupuestoRestante){
            const restante = document.querySelector('.restante');
            restante.classList.remove('.alert-success');
            restante.classList.add('alert-warning');
        }
    }
}

document.addEventListener('DOMContentLoaded', function(){
    if(presupuestoUser==null || presupuestoUser ===''){
        window.location.reload();
    } else {
        cantidadPresupuesto = new Presupuesto(presupuestoUser);

        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto) 
    }
});

formulario.addEventListener('submit', function(e){
    e.preventDefault();

    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;

    const ui = new Interfaz();

    if(nombreGasto === '' || cantidadGasto === ''){
        ui.imprimirMensaje('Campo Vacio', 'error');
    } else {
        ui.imprimirMensaje('Agregado con exito', 'Correcto');
        ui.agregarGastoListado(nombreGasto, cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);
    }
});