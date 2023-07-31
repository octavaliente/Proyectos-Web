const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const enviarBtn = document.querySelector('#enviar');
const borrarBtn = document.querySelector('#resetBtn');

const content = document.querySelector('#enviar-mail');

eventListeners();

function eventListeners() {
    document.addEventListener('DOMContentLoaded', inicioApp);

    email.addEventListener('blur', campo);
    asunto.addEventListener('blur', campo);
    mensaje.addEventListener('blur', campo);

    borrarBtn.addEventListener('click', borrarForm);
    enviarBtn.addEventListener('click', enviarEmail);
}

function inicioApp() {
    enviarBtn.disabled = true;
}

function campo(e) {
    validarCampo(this);

    if(this.type === 'email'){
        validarEmail(this);
    }

    if (email.value !== '' && asunto.value !== '' && mensaje.value !== '') {
        if (document.querySelectorAll('.error').length == 0) {
            enviarBtn.disabled = false;
        } else {
            enviarBtn.disabled = true;
        }
    } else {
        enviarBtn.disabled = true;
    }

}

function validarCampo(campo) {
    if (campo.value.length > 0) {
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
    } else {
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}

function validarEmail (campo){
    const email = campo.value;

    if(email.indexOf('@') !== -1){
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
    } else {
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}

function borrarForm(e){
    e.preventDefault();
    content.reset();
}

function enviarEmail(e){
    e.preventDefault();
    spinner = document.querySelector('#spinner');
    spinner.style.display = 'block';

    const enviado = document.createElement('img');
    enviado.style.display = 'block';
    enviado.src = 'img/mail.gif';

    setTimeout(function(){
        spinner.style.display = 'none';

        document.querySelector('#loaders').appendChild(enviado);
        setTimeout(function(){
            enviado.remove();
            content.reset();
        }, 5000);
    }, 3000);
}