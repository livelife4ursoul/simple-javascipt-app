// IIFE wrap
let pokemonRepository = (function() {
    //array of different pokemon objects and individual key values.
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1279';
    // add pokemon function with object parameters 
    function add(pokemon) {
        // if (
        //     typeof pokemon === 'object' &&
        //     'name' in pokemon &&
        //     'height' in pokemon &&
        //     'types' in pokemon
        
        // ) {
            // if object parameters correct, push pokemon to pokemonList
            pokemonList.push(pokemon);
        // }   
        //     //if object parameters incorrect log to console
        //     else {
        //         console.log('not a correct pokemon')
        // }
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
        button.innerText = pokemon.name;
        document.querySelector('.pokemon-list');
        button.classList.add('list-button');
        listItem.appendChild(button);
        pokemonListHere.appendChild(listItem);

        //add event listener to log to console when click on pokemon
        button.addEventListener('click', function() {
            showDetails(pokemon);
        });
            
    }
    //function to log pokemon to console
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function() {
            console.log(pokemon);
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

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };

})();

//call loadList function
pokemonRepository.loadList().then(function() {

    // forEach Loop to print Pokemon Array
    pokemonRepository.getAll().forEach((pokemon) => {
        pokemonRepository.addListItem(pokemon);
    });
});


// function getPokemon(name) {
//     let pokemon = pokemonList.filter((pokemon) => {
//         return pokemon.name == name;
//     });
//     return pokemon [0] || null;
// }

// let result = pokemonRepository.getAll.filter(pokemonRepository.getAll => pokemonRepository.getAll.length > 7);
// document.write(result);

