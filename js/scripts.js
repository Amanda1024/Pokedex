//Wrapped pokemonList in pokemonRepository (I.I.F.E.)
const pokemonRepository = (function() {
    //Pokemon Character List
    const pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
    let searchInput = document.querySelector('#search-bar');


    //Adds a single pokemon to the pokemonList 
    function add(pokemon) {
        if (typeof pokemon === 'object') {
            pokemonList.push(pokemon);
        } else alert('pokemon is not correct');
    }

    //Returns all pokemon from pokemonList
    function getAll() {
        return pokemonList;
    }

    //Formats the pokemon ul into buttons
    function addListItem(pokemon) {
        //Accesses pokemon ul
        let pokemonList = document.querySelector('.list-group');
        //Creates bulleted list
        let listItem = document.createElement('li');
        listItem.classList.add('group-list-item');
        //Creates button
        let button = document.createElement('button');
        //Puts pokemon name on button
        button.innerText = pokemon.name;
        //Creates class for the list
        button.classList.add('btn', 'btn-outline-warning', 'btn-lg');
        button.setAttribute('data-target', '#pokemonModal');
        button.setAttribute('data-toggle', 'modal');

        //Attaches button to the list
        listItem.appendChild(button);
        //Establishes that the ul = pokemonList
        pokemonList.appendChild(listItem);
        //Displays pokemon info in console log when button is clicked
        button.addEventListener('click', function() {
            showDetails(pokemon);
        });
    }

    //Loads pokemonList via API
    function loadList() {
        return fetch(apiUrl).then(function(response) {
            return response.json();
        }).then(function(json) {
            json.results.forEach(function(item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function(e) {
            console.error(e);
        })
    }

    //Loads details about each pokemon via API
    function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(url).then(function(response) {
            return response.json();
        }).then(function(details) {
            //Adds the details of the pokemon to be displayed
            pokemon.imageUrl = details.sprites.front_default;
            pokemon.imageUrlBack = details.sprites.back_default;
            pokemon.height = details.height;
            pokemon.types = details.types;
        }).catch(function(e) {
            console.error(e);
        });
    }

    //Shows the details of a selected pokemon
    function showDetails(pokemon) {
        // pokemonRepository.loadDetails(item).then(function() {
        loadDetails(pokemon).then(function() {
            showModal(pokemon);
        });
    }

    //Shows Modal
    function showModal(pokemon) {
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');

        modalTitle.empty();
        modalBody.empty();


        // Creates element name in modal
        let nameElement = $('<h1>' + pokemon.name + '</h1>');
        // Populates image in modal
        let imageElement = $('<img class="modal-img" style="width:50%">');
        imageElement.attr('src', pokemon.imageUrl);
        let imageElementBack = $('<img class="modal-img" style="width:50%">');
        imageElementBack.attr('src', pokemon.imageUrlBack);
        // Displays height information
        let heightElement = $('<p>' + 'Height : ' + pokemon.height + '</p>');
        // Displays type information
        let typesElement = $('<p>' + 'Types : ' + pokemon.types.map(pokemon => pokemon.type.name).join(', ') + '</p>');

        modalTitle.append(nameElement);
        modalBody.append(imageElement);
        modalBody.append(imageElementBack);
        modalBody.append(heightElement);
        modalBody.append(typesElement);

    }
    // Adds event listener to search bar
    searchInput.addEventListener('input', function() {
        let listPokemon = document.querySelectorAll('li');
        //let listPokemon = $('li');
        let value = searchInput.value.toUpperCase();

        listPokemon.forEach(function(pokemon) {
            if (pokemon.innerText.toUpperCase().indexOf(value) > -1) {
                pokemon.style.display = '';
            } else {
                pokemon.style.display = 'none';
            }
        });
    });

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal,
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});