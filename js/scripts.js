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

// for loop to print pokemon objects with conditional for biggest pokemon height
// for (let i = 0; i < pokemonList.length; i++){
//     document.write(pokemonList[i].height >= 3.5 ? 
//         `${pokemonList[i].name} (height: ${pokemonList[i].height} m) Wow! Big Pokemon! <br>`: 
//         `${pokemonList[i].name} (height: ${pokemonList[i].height} m) <br>`);
// };

// forEach Loop to print Pokemon Array with conditional for biggest pokemon height
pokemonList.forEach((pokemon) => {
    document.write(pokemon.height >= 3.5 ? 
        `${pokemon.name} (height: ${pokemon.height} m) Wow! Big Pokemon! <br>`: 
        `${pokemon.name} (height: ${pokemon.height} m) <br>`);
});

