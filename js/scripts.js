//Wrapped pokemonList in pokemonRepository (IIFE)
const pokemonRepository = (function(){
//Pokemon Character List
const pokemonList = [
    {
        name: 'Bulbasaur',
        height: 0.7,
        types: ['grass', 'poison'],
    },
    {
        name: 'Ivysaur',
        height: 1,
        types: ['grass', 'poison'],
    },
    {
        name: 'Venusaur',
        height: 2,
        types: ['grass', 'poison'],
    },
    {
        name: 'Charmander',
        height: 0.6,
        types: ['fire'],
    },
    {
        name: 'Charmeleon',
        height: 1.1,
        types: ['fire'],
    }
];

//Add a single pokemon to the pokemonList Array
function add(pokemon) {
    pokemonList.push(pokemon);
}

//Return all pokemon from pokemonList Array
function getAll() {
    return pokemonList;
}

return {
    getAll: getAll,
    add: add
}
})();

//getAll Function pushes data from pokemonRepository onto the DOM
//forEach Loop populates name and height of pokemonList Array
//Conditional calls out the character whose height is > 1.5
pokemonRepository.getAll().forEach(function(pokemon) {
    const pokemonIsTall = pokemon.height > 1.5;
    if (pokemonIsTall) {
        document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ')' + ' - Wow that is big! </p>'  ); 
    } else {
        document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ') </p>' );
    }
});
