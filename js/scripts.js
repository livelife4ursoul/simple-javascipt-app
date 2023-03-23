// IIFE wrap
let pokemonRepository = (function() {
    //array of different pokemon objects and individual key values.
    const pokemonList = [];
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1279';
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
        button.innerText = pokemon.name
        .toLowerCase().replace(/\b[a-z]/g, function(letter) {
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

    // creating search bar function


    searchInput.addEventListener('keyup', (e) => {
        searchPokemon();
    });

    function searchPokemon() {
        
        const searchText = $("#searchInput").val().toLowerCase();
        $(".pokemon-list").empty();
        pokemonList.forEach(function(pokemon) {
            if (pokemon.name.toLowerCase().startsWith(searchText)) {
                addListItem(pokemon);
            }
        });
        console.log(searchText);
       }

    
// showModal to display pokemon details when button is clicked
    function showModal(pokemon) {

        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');
        // clear existing content of modal
        modalTitle.empty();
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
        const typesArray = pokemon.types.map(function (type) {
            return type.type.name;
        });
        const typesFormatted = typesArray.join(", ");
        let pokemonElement = $("<p>" + `Types: ${typesFormatted}` + "</p>");

        
        modalTitle.append(titleElement);
        modalBody.append(myImage);
        modalBody.append(heightElement);
        modalBody.append(pokemonElement);
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
        searchPokemon: searchPokemon
    };


})();

//call loadList function
pokemonRepository.loadList().then(function() {

    // forEach Loop to print Pokemon Array
    pokemonRepository.getAll().forEach((pokemon) => {
        pokemonRepository.addListItem(pokemon);
    });
});


