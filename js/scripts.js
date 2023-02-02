// IIFE wrap
let pokemonRepository = (function() {
    //array of different pokemon objects and individual key values.
    let pokemonList = [
        {
            name: 'Bulbasaur',
            height: 0.7,
            types: ['grass', 'poison']
        },
        {
            name: 'Arbok',
            height: 3.5,
            types: ['poison']
        },
        {
            name: 'Pichu',
            height: 0.3,
            types: ['electric']
        },
        {
            name: 'Charmeleon',
            height: 1.1,
            types: ['fire']
        },
        {
            name: 'Charizard',
            height: 1.7,
            types: ['fire', 'flying']
        },
        {
            name: 'Butterfree',
            height: 1.1,
            types: ['bug', 'flying']
        },
        {
            name: 'Ninetales',
            height: 1.1,
            types: ['fire']
        },
        {
            name: 'Parasect',
            height: 1,
            types: ['grass', 'bug']
        }
    ];
    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon &&
            'height' in pokemon &&
            'types' in pokemon
        
        ) {
            pokemonList.push(pokemon);
        }   
            else {
                console.log('not a correct pokemon')
        }
    }

    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };

    function addListItem(pokemon) {
        let pokemonListHere = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
    
        button.innerText = pokemon.name;
        document.querySelector('.pokemon-list');
        button.classList.add('list-button');
        listItem.appendChild(button);
        pokemonListHere.appendChild(listItem);
    }
})();

// add pokemon to array 
pokemonRepository.add(
    {
        name: 'Wigglytuff',
        height: 1,
        types: ['fairy', 'normal'] 

    }
    );
pokemonRepository.add(
    {
        name: 'Wailord',
        height: 14.5,
        types: ['water']
    }
);

// forEach Loop to print Pokemon Array

pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
});

// for loop to print pokemon objects with conditional for biggest pokemon height
// for (let i = 0; i < pokemonList.length; i++){
//     document.write(pokemonList[i].height >= 3.5 ? 
//         `${pokemonList[i].name} (height: ${pokemonList[i].height} m) Wow! Big Pokemon! <br>`: 
//         `${pokemonList[i].name} (height: ${pokemonList[i].height} m) <br>`);
// };

for (let i = 0; i < pokemonList.length; i++) {
    const height = pokemonList[i].height;
        document.write(
            `${pokemonList[i].name} (height: ${height} m) 
            ${height >= 3.5 ? 'Wow! Big Pokemon!' : ''} <br>`
        );
    }

// Original forEach Loop to print Pokemon Array with conditional for biggest pokemon height
// pokemonRepository.getAll().forEach((pokemon) => {
//      document.write(pokemon.height >= 3.5 ? 
    //     `${pokemon.name} (height: ${pokemon.height} m) Wow! Big Pokemon! <br>`: 
    //     `${pokemon.name} (height: ${pokemon.height} m) <br>`);


// console.log(typeof pokemonRepository)

// let result = pokemonRepository.getAll.filter(pokemonRepository.getAll => pokemonRepository.getAll.length > 7);
// document.write(result);

// Object.keys(pokemon).forEach(function(property) {
//     document.write(pokemon[property])
// });

// document.write(Object.keys(pokemon))

// Object.keys(pokemon) ? pokemonList.push(pokemon) : !add(pokemon);