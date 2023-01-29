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
        Object.keys(pokemon) ? pokemonList.push(pokemon) : !add(pokemon);
    }

    function getAll() {
        return pokemonList;
    }
    return {
        add: add,
        getAll: getAll
    };
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

// for loop to print pokemon objects with conditional for biggest pokemon height
// for (let i = 0; i < pokemonList.length; i++){
//     document.write(pokemonList[i].height >= 3.5 ? 
//         `${pokemonList[i].name} (height: ${pokemonList[i].height} m) Wow! Big Pokemon! <br>`: 
//         `${pokemonList[i].name} (height: ${pokemonList[i].height} m) <br>`);
// };

// forEach Loop to print Pokemon Array with conditional for biggest pokemon height
pokemonRepository.getAll().forEach((pokemon) => {
    document.write(pokemon.height >= 3.5 ? 
        `${pokemon.name} (height: ${pokemon.height} m) Wow! Big Pokemon! <br>`: 
        `${pokemon.name} (height: ${pokemon.height} m) <br>`);
});

// document.write(typeof pokemonRepository)

// let result = pokemonRepository.getAll.filter(pokemonRepository.getAll => pokemonRepository.getAll.length > 7);
// document.write(result);

// Object.keys(pokemon).forEach(function(property) {
//     document.write(pokemon[property])
// });

// document.write(Object.keys(pokemon))