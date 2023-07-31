const formulario = document.querySelector('#generar-nombre').addEventListener('submit', cargarNombres);

function cargarNombres(e){
    e.preventDefault();

    const origen = document.querySelector('#origen');
    const origenSelected = origen.options[origen.selectedIndex].value;

    const genero = document.querySelector('#genero');
    const generoSelected = genero.options[genero.selectedIndex].value;

    const cantidad = document.querySelector('#numero').value;

    let url = '';
    url += 'http://uinames.com/api/?';

    if (origenSelected != ''){
        url+= `region=${origenSelected}&`;
    }
    if (generoSelected !=''){
        url += `gender=${generoSelected}`;
    }
    if(cantidad != ''){
        url += `amount=${cantidad}`;
    }

    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.onload = function() {
        if(this.status === 200) {
            const nombres = JSON.parse(this.responseText);

            let htmlNombres = '<h2>Nombres Generados</h2>'

            htmlNombres += '<ul class="lista">'

            nombres.forEach(function(nombre){
                htmlNombres += `
                        <li>${nombre.name}</li>
                `;
            });
            
            htmlNombres += '</ul>';

            document.querySelector('#resultado').innerHTML = htmlNombres;
        }
    }

    xhr.send();
}