// IIFE wrap
let pokemonRepository = (function() {
    //array of different pokemon objects and individual key values.
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1279';
    // add pokemon function with object parameters 
    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon &&
            'detailsUrl' in pokemon 
        ) {
            // if object parameters correct, push pokemon to pokemonList
            pokemonList.push(pokemon);
        }   
            //if object parameters incorrect log to console
            else {
                console.log('not a correct pokemon')
        }
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        //selecting nodes and adding class elements
        let pokemonListHere = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
    
        //create button for each pokemon
        button.innerText = pokemon.name.toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        });
        document.querySelector('.pokemon-list');
        button.classList.add('list-button');
        listItem.appendChild(button);
        pokemonListHere.appendChild(listItem);

        //add event listener to log to console when click on pokemon
        button.addEventListener('click', function() {
            showDetails(pokemon);
        });
            
    }
       
//loadList from Api
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

//loadDetails from Api
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e)
        });
    }
// showModal to display pokemon details when button is clicked
    function showModal(pokemon) {

        let modalContainer = document.querySelector('#modal-container');

        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');
    
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);
        
        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name.toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        });

        // add image to details modal
        let myImage = document.createElement('img');
        myImage.classList.add('myImage');
        myImage.src = pokemon.imageUrl;
        
        
        let contentElement = document.createElement('p');
        contentElement.innerText = (`Height: ${pokemon.height}`);
    
        modalContainer.appendChild(modal);
        modalContainer.classList.add('is-visible');
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(myImage);
    
    }

    let dialogPromiseReject;
       
    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');

        // hideModal when ESC key is pressed
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
              hideModal();
            }
          });
          // hideModal if click on page outside modal
          modalContainer.addEventListener('click', (e) => {
            let target = e.target;
            if (target === modalContainer) {
              hideModal();
            }
          });
        
        if (dialogPromiseReject) {
            dialogPromiseReject();
            dialogPromiseReject = null;
        }
    }


    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function(){
            showModal(item);
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal,
        hideModal: hideModal
    };

})();




//call loadList function
pokemonRepository.loadList().then(function() {

    // forEach Loop to print Pokemon Array
    pokemonRepository.getAll().forEach((pokemon) => {
        pokemonRepository.addListItem(pokemon);
        
    });
});



// Everything below is code I am working through, but it's not ready to be implemented

// function getPokemon(name) {
//     let pokemon = pokemonList.filter((pokemon) => {
//         return pokemon.name == name;
//     });
//     return pokemon [0] || null;
// }

// let result = pokemonRepository.getAll.filter(pokemonRepository.getAll => pokemonRepository.getAll.length > 7);
// document.write(result);



    // let loadingMessage = document.createElement('loadingMessage');
    // loadingMessage.innerText = 'Loading, please wait...';
    // document.getElementById('myMessage').appendChild(loadingMessage);
    // document.addEventListener("DOMContentLoaded", loadingMessage() {
    //     alert();
    // };

    // function hideLoadingMessage() {

    // }