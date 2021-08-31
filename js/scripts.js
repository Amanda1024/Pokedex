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

//Adds a single pokemon to the pokemonList Array
function add(pokemon) {
    pokemonList.push(pokemon);
}

//Returns all pokemon from pokemonList Array
function getAll() {
    return pokemonList;
}

//Shows details of selected pokemon
function showDetails(pokemon){
    console.log(pokemon);
}

//Formats the pokemon ul into buttons
function addListItem(pokemon){
    let pokemonList = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener('click', function(){
        showDetails(pokemon);
    });
}

return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
    };
})();

pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});



