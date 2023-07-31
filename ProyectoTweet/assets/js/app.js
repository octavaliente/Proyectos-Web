//Donde van a mostrarse
// localStorage.clear();
const listaTweets = document.querySelector('#lista-tweets');


eventListeners();

function eventListeners(){
    //Cuando se hace click en Agregar 
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    listaTweets.addEventListener('click', borrarTweet);

    document.addEventListener('DOMContentLoaded', mostrarAlmacenados);

}

function agregarTweet(e){
    e.preventDefault();
    const tweet = document.querySelector('#tweet').value;
    if(!tweet.includes('\n')){

    //Muestro el tweet
    // const tweet = document.querySelector('#tweet').value;
    const li = document.createElement('li');

    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';
    
    li.innerText = tweet;
    listaTweets.appendChild(li);
    //Boton para borrar ese tweet
    li.appendChild(botonBorrar);

    //Local Storage
    agregarTweetLS(tweet);
    }else{
        alert('No se pudo ingresar el tweet por espacios en blanco');
    }
}

function borrarTweet(e){
    e.preventDefault();
    if(e.target.className === 'borrar-tweet'){
        e.target.parentElement.remove();
        borrarTweetLC(e.target.parentElement.innerText);
        
    }


}

function agregarTweetLS(tweet){
    let tweets;
    tweets = tweetsLC();
    tweets.push(tweet);
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function tweetsLC(){
    let tweets;
    
    if(localStorage.getItem('tweets') === null){
        tweets = [];
    } else{
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }

    return tweets;
}

function mostrarAlmacenados(){
    let tweets = tweetsLC();
    tweets.forEach(function(tweet){
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';

        const li = document.createElement('li');
        li.innerText = tweet;

        listaTweets.appendChild(li);
        li.appendChild(botonBorrar);
    });
}

function borrarTweetLC(tweet){
    let tweets, tweetBorrar;
    
    tweetBorrar = tweet.substring(0, tweet.length - 1);
    
    tweets = tweetsLC();

    tweets.forEach(function(tweet, index){
        if(tweetBorrar == tweet){
            tweets.splice(index, 1);
        }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets));
}