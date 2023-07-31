function Seguro(marca, year, seguro) {
    this.marca = marca;
    this.year = year;
    this.seguro = seguro;
}

Seguro.prototype.cotizarSeguro = function () {
    /*
        1 = americano 1.15
        2 = asiatico 1.05
        3 = europeo 1.35
    */
    let cantidad;
    const base = 2000;

    switch (this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
    }

    const diferencia = new Date().getFullYear() - this.year;
    cantidad -= ((diferencia * 3) * cantidad) / 100;

    if(this.tipo === 'basico'){
        cantidad = cantidad * 1.30;
    } else {
        cantidad = cantidad * 1.50;
    }

    return cantidad;
}

function Interfaz() { }

Interfaz.prototype.mostrarMensaje = function (mensaje, tipo) {
    const div = document.createElement('div');

    if (tipo === 'error') {
        div.classList.add('mensaje', 'error');
    } else {
        div.classList.add('mensaje', 'correcto');
    }
    div.innerHTML = `${mensaje}`;
    formulario.insertBefore(div, document.querySelector('.form-group'));

    setTimeout(function () {
        document.querySelector('.mensaje').remove();
    }, 3000);
}

Interfaz.prototype.mostrarResultado = function(seguro, total){
    const resultado = document.querySelector('#resultado');
    let marca;
    switch(seguro.marca){
        case '1':
            marca = 'Americano';
            break;
        case '2':
            marca = 'Asiatico';
            break;
        case '3':
            marca = 'Europeo';
            break;
    }
    const div = document.createElement('div');

    div.innerHTML = `
        <p class="header">Tu seguro:</p>
        <p>Marca: ${marca}</p>
        <p>Año: ${seguro.year}</p>
        <p>Seguro: ${seguro.seguro}</p>
        <p>Total: $ ${total}</p>
    `;
    const spinner = document.querySelector('#cargando img');
    spinner.style.display = 'block';
    setTimeout(function(){
        spinner.style.display = 'none';
        resultado.appendChild(div);
    }, 3000);
    
}


const formulario = document.querySelector('#cotizar-seguro');
formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    const marca = document.querySelector('#marca');
    const marcaSelected = marca.options[marca.selectedIndex].value;

    const year = document.querySelector('#anio');
    const yearSelected = year.options[year.selectedIndex].value;

    const seguroSelected = document.querySelector('input[name="tipo"]:checked').value;

    const interfaz = new Interfaz();

    if (marcaSelected === '' || yearSelected === '' || seguroSelected === '') {
        interfaz.mostrarMensaje('Formulario incompleto', 'error');
    } else {
        //Resultados anteriores
        const resultado = document.querySelector('#resultado div');
        if (resultado != null){
            resultado.remove();
        }

        const seguro = new Seguro(marcaSelected, yearSelected, seguroSelected);
        const cantidad = seguro.cotizarSeguro(seguro);
        
        interfaz.mostrarResultado(seguro, cantidad);
        interfaz.mostrarMensaje('Cotizando su seguro...', 'correcto');
    }
});

const maxYear = new Date().getFullYear(), minYear = maxYear - 20;
const selectYear = document.querySelector('#anio');

for (let i = maxYear; i >= minYear; i--) {
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectYear.appendChild(option);
} 