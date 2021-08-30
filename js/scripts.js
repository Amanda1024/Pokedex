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

//For Loop populates name and height of pokemonList Array
//Conditional calls out the character whose height is > 1.5
// for (let i = 0; i < pokemonList.length; i++) {
// if (pokemonList[i].height > 1.5) {
//     document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')' + ' - Wow that is big! </p>'  );
//     } 
//     else {
//     document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')</p>');

pokemonList.forEach(function(pokemon) {
    const pokemonIsTall = pokemon.height > 1.5;
    if (pokemonIsTall); 
    document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ')' + ' - Wow that is big! </p>'  ); 
});{
    document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ') </p>' );
};
