// IIFE wrap
let pokemonRepository = (function() {
    //array of different pokemon objects and individual key values.
    const pokemonList = [];
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=600';
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
        let pokemonListHere = $('.pokemon-list');
        let listItem = $('<li></li>');
        listItem.addClass('list-group-item border-5 col-sm-6 col-md-4 col-lg-3 col-xl-2');
        //creating button and Capitalizing pokemon name
        let pokemonName = pokemon.name.substr(0, 1).toUpperCase() + pokemon.name.substr(1);
        let button = $('<button class="list-button btn btn-block btn-primary" data-toggle="modal" data-target="#buttonModal">' + pokemonName + '</button>');

        listItem.append(button);
        pokemonListHere.append(listItem);

        //add event listener to log to showModal of pokemon details
        button.on('click', function() {
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
    searchInput.addEventListener('keypress', (e) => {
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
        let heightElement = $("<h5>" + `Height: ${pokemon.height} m` + "</h5>");
        // add types to details modal
        const typesArray = pokemon.types.map(function (type) {
            return type.type.name;
        });
        const typesFormatted = typesArray.join(", ");
        let pokemonElement = $("<h5>" + `Types: ${typesFormatted}` + "</h5>");

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


