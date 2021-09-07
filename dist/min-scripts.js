const pokemonRepository = function() {
    const t = [];
    let e = "https://pokeapi.co/api/v2/pokemon/?limit=151",
        n = document.querySelector("#search-bar");

    function o(e) { "object" == typeof e ? t.push(e) : alert("pokemon is not correct") }

    function i(t) { let e = t.detailsUrl; return fetch(e).then(function(t) { return t.json() }).then(function(e) { t.imageUrl = e.sprites.front_default, t.imageUrlBack = e.sprites.back_default, t.height = e.height, t.types = e.types }).catch(function(t) { console.error(t) }) }

    function a(t) { i(t).then(function() { l(t) }) }

    function l(t) {
        let e = $(".modal-body"),
            n = $(".modal-title");
        n.empty(), e.empty();
        let o = $("<h1>" + t.name + "</h1>"),
            i = $('<img class="modal-img" style="width:50%">');
        i.attr("src", t.imageUrl);
        let a = $('<img class="modal-img" style="width:50%">');
        a.attr("src", t.imageUrlBack);
        let l = $("<p>Height : " + t.height + "</p>"),
            r = $("<p>Types : " + t.types.map(t => t.type.name).join(", ") + "</p>");
        n.append(o), e.append(i), e.append(a), e.append(l), e.append(r)
    }
    return n.addEventListener("input", function() {
        let t = document.querySelectorAll("li"),
            e = n.value.toUpperCase();
        t.forEach(function(t) { t.innerText.toUpperCase().indexOf(e) > -1 ? t.style.display = "" : t.style.display = "none" })
    }), {
        getAll: function() { return t },
        add: o,
        addListItem: function(t) {
            let e = document.querySelector(".list-group"),
                n = document.createElement("li");
            n.classList.add("group-list-item");
            let o = document.createElement("button");
            o.innerText = t.name, o.classList.add("btn", "btn-outline-warning", "btn-lg"), o.setAttribute("data-target", "#pokemonModal"), o.setAttribute("data-toggle", "modal"), n.appendChild(o), e.appendChild(n), o.addEventListener("click", function() { a(t) })
        },
        loadList: function() { return fetch(e).then(function(t) { return t.json() }).then(function(t) { t.results.forEach(function(t) { o({ name: t.name, detailsUrl: t.url }) }) }).catch(function(t) { console.error(t) }) },
        loadDetails: i,
        showDetails: a,
        showModal: l
    }
}();
pokemonRepository.loadList().then(function() { pokemonRepository.getAll().forEach(function(t) { pokemonRepository.addListItem(t) }) });