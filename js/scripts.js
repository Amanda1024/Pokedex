//Wrapped pokemonList in pokemonRepository (IIFE)
const pokemonRepository = (function() {
    //Pokemon Character List
    const pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';


    //Adds a single pokemon to the pokemonList 
    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    //Returns all pokemon from pokemonList
    function getAll() {
        return pokemonList;
    }

    //Formats the pokemon ul into buttons
    function addListItem(pokemon) {
        //Accesses pokemon ul
        let pokemonList = document.querySelector('.pokemon-list');
        //Creates bulleted list
        let listPokemon = document.createElement('li');
        //Creates button
        let button = document.createElement('button');
        //Puts pokemon name on button
        button.innerText = pokemon.name;
        //Creates class for the list
        button.classList.add('button-class');
        //Attaches button to the list
        listPokemon.appendChild(button);
        //Establishes that the ul = pokemonList
        pokemonList.appendChild(listPokemon);
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
                console.log(pokemon);
            });
        }).catch(function(e) {
            console.error(e);
        })
    }

    //Loads details about each pokemon via API
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function(response) {
            return response.json();
        }).then(function(details) {
            //Adds the details of the pokemon to be displayed
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
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

    //Creates Modal 
    let modalContainer = document.querySelector('#modal-container');
    //Shows Modal
    function showModal(pokemon) {
        let modalContainer = document.querySelector('#modal-container');
        //Clears existing Modal content
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        //Adds new Modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        //Closes Modal when "Close" button is clicked
        closeButtonElement.addEventListener('click', hideModal);

        //Adds title to button
        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;

        //Creates element that will display <p> text pokemon details upon button click
        let contentElement = document.createElement('p');
        let pokeHeight = pokemon.height;
        let pokeTypes = pokemon.types
            .map(function(item) {
                return item.type.name;
            })
            .join(", ")


        //Establishes the <p> text specfics that will be displayed on button click
        contentElement.innerText = 'Height: ' + pokeHeight + 'm ' + '\r\n' + 'Types: ' + pokeTypes;

        //Adds image element to populate from the API
        let imageElement = document.createElement('img');
        imageElement.setAttribute('src', pokemon.imageUrl);
        imageElement.setAttribute('alt', 'Front view of' + pokemon.name);

        modal.appendChild(closeButtonElement);
        modal.appendChild(imageElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);

        //Displays the Modal
        modalContainer.classList.add('is-visible');
    }

    let dialogPromiseReject;
    //Hides the Modal
    function hideModal() {
        modalContainer.classList.remove('is-visible');

        if (dialogPromiseReject) {
            dialogPromiseReject();
            dialogPromiseReject = null;
        }
    }

    //Hides Modal when user presses 'Esc' on keyboard
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    //Hides Modal when the container is clicked
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });


    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal,
        hideModal: hideModal,

    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});