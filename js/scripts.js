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
        listItem.classList.add('list-group-item');
        let button = document.createElement('button');
    
        //create button for each pokemon added extra code to Capitalize the first letter of Each pokemon
        button.innerText = pokemon.name.toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        });
        document.querySelector('.pokemon-list');
        button.classList.add('list-button');
        button.classList.add('btn');
        button.classList.add('btn-block');
        button.classList.add('btn-primary');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#buttonModal');
        listItem.classList.add('border-5');
        listItem.classList.add('col-sm-6')
        listItem.classList.add('col-md-4');
        listItem.classList.add('col-lg-3');
        listItem.classList.add('col-xl-2');
        listItem.appendChild(button);
        pokemonListHere.appendChild(listItem);

        //add event listener to log to console when click on pokemon
        button.addEventListener('click', function() {
            showDetails(pokemon);
        });
            
    };
       
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
            item.imageUrl = details.sprites.other.dream_world.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e)
        });
    }
    // get search bar element
// function searchPokemon() {
//     let searchInput = document.getElementById('searchInput');
//     let searchText = searchInput.value.toLowerCase();
//     let allPokemon = document.querySelectorAll('.list-group-item');

//     allPokemon.forEach(function(pokemon) {
//         let pokemonName = pokemonList;
//         if (pokemonName.includes(searchText)) {
//             pokemon.style.display = 'none';
//         }
//     });
// }   

// let searchInput = document.getElementById('searchInput');
// searchInput.addEventListener('input', function () {
//     searchPokemon();
// });
// function searchPokemon() {
//     let pokemonList = [];
//     console.log(searchInput);
//     searchInput.addEventListener('keyup', (e) => {
//         const searchString = e.target.value.toLowerCase();
//         const filteredPokemon = pokemonList.filter(pokemon => {
//             return pokemon.name.toLowerCase().includes(searchString);
//         });
//         console.log(filteredPokemon);
        
//     });
// }


    
// showModal to display pokemon details when button is clicked
    function showModal(pokemon) {

        

        let modalBody = $('.modal-body');
        let modalHeader = $('.modal-header');
        // let modalHeader = $('.modal-header');
        // clear existing content of modal
        modalHeader.empty();
        modalBody.empty();

        //create element for name in modal
        let titleElement = $("<h1>" + pokemon.name.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                    return letter.toUpperCase();
                }) + "</h1>");
        // add image to details modal
        let myImage = $('<img class="modal-img" style="width:20%">');
        myImage.attr("src", pokemon.imageUrl);
        // add height to details modal
        let heightElement = $("<p>" + `Height: ${pokemon.height} m` + "</p>");
        // add types to details modal
        let pokemonElement = [];
        // pokemon.types.forEach(function() {
        pokemonElement += ["<p>" + `Types: ${pokemon.types}` + "</p>"];
        // });
        // let pokemonTypes = document.createElement('ul');
        // pokemonTypes.classList.add('.pokemon-types');
        // pokemonTypes.innerHTML = pokemonElement;

        

    

        
        modalHeader.append(titleElement);
        modalBody.append(myImage);
        modalBody.append(heightElement);
        modalBody.append(pokemonElement);
    
    //     let modalContainer = document.querySelector('#modal-container');

    //     modalContainer.innerHTML = '';

    //     let modal = document.createElement('div');
    //     modal.classList.add('modal');
    
    //     let closeButtonElement = document.createElement('button');
    //     closeButtonElement.classList.add('modal-close');
    //     closeButtonElement.innerText = 'Close';
    //     closeButtonElement.addEventListener('click', hideModal);
        
    //     let titleElement = document.createElement('h1');
    //     titleElement.innerText = pokemon.name.toLowerCase().replace(/\b[a-z]/g, function(letter) {
    //         return letter.toUpperCase();
    //     });

    //     // add image to details modal
    //     let myImage = document.createElement('img');
    //     myImage.classList.add('myImage');
    //     myImage.src = pokemon.imageUrl;
        
        
    //     let contentElement = document.createElement('p');
    //     contentElement.innerText = (`Height: ${pokemon.height}`);
    
    //     modalContainer.appendChild(modal);
    //     modalContainer.classList.add('is-visible');
    //     modal.appendChild(closeButtonElement);
    //     modal.appendChild(titleElement);
    //     modal.appendChild(contentElement);
    //     modal.appendChild(myImage);

    //      // hideModal when ESC key is pressed
    //     window.addEventListener('keydown', (e) => {
    //         if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    //         hideModal();
    //         }
    //     });
    //   // hideModal if click on page outside modal
    //     modalContainer.addEventListener('click', (e) => {
    //         let target = e.target;
    //          if (target === modalContainer) {
    //         hideModal();
    //         }
    //     });
    
    }

    // let dialogPromiseReject;
       
    // function hideModal() {
    //     let modalContainer = document.querySelector('#modal-container');
    //     modalContainer.classList.remove('is-visible');

    //     if (dialogPromiseReject) {
    //         dialogPromiseReject();
    //         dialogPromiseReject = null;
    //     }
    // }


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
        // searchPokemon: searchPokemon
        // hideModal: hideModal
    };

})();




//call loadList function
pokemonRepository.loadList().then(function() {

    // forEach Loop to print Pokemon Array
    pokemonRepository.getAll().forEach((pokemon) => {
        pokemonRepository.addListItem(pokemon);
        
    // pokemonRepository.searchPokemon();
        
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

    // function searchPokemon(namesFromDOM) {
    //     pokemon = pokemonList.filter((pokemon) => {
    //         return pokemonList.name == pokemon;
    //     });
    //     return pokemon[0] || null;
    // }

    // const searchButton = document.getElementById('search-button');
    // const searchInput = document.getElementById('search-input');
    // searchButton.addEventListener('click', () => {
    // const inputValue = searchPokemon();
    // alert(inputValue);
    // });

    // function searchPokemon(results) {
    //     for (pokemonList of results) {
    //         const resultItem = document.createElement('li');
    //         resultItem.classList.add('result-item');
    //         const text = document.createTextNode(pokemonList.name);
    //         resultItem.appendChild(text);
    //         list.appendChild(resultItem);
    //     }
    // }

    // const searchInput = document.querySelector('.search-input');

    // searchInput.addEventListener('search-input', (e) => {
    //     let value = e.target.value
    //     if (value && value.trim().length > 0){
    //         value = value.trim().toLowerCase()
    //         searchPokemon(pokemonList.filter(pokemon => {
    //             return pokemonList.name.includes(value);
    //         }))
    //     } else {

    //     }
    // })

    // function searchPokemon () {
    //     let t=document.querySelector(".search-input");
    //     let l=document.querySelector(".pokemon-list").getElementsByTagName("li");
        
    //     for(let i=0;i<l.length;i++)l[i].classList.remove("hide");
    //     for(let n=0;n<l.length;n++)""===t.value||l[n].innerText.indexOf(t.value)&&l[n].classList.add("hide")}

       
// const searchInput = document.getElementById("searchInput");

// // store name elements in array-like object

// const namesFromDOM = document.getElementsByTagName("li");

// // listen for user events

// searchInput.addEventListener("keyup", (event) => {
//   const { value } = event.target;

//   // get user search input converted to lowercase

//   const searchQuery = value.toLowerCase();

//   for (const nameElement of namesFromDOM) {
//     // store name text and convert to lowercase

//     let name = nameElement.textContent.toLowerCase();

//     // compare current name to search input

//     if (name.includes(searchQuery)) {
//       // found name matching search, display it

//       nameElement.style.display = "block";
//     } else {
//       // no match, don't display name

//       nameElement.style.display = "none";
//     }
//   }
// });