var trainerName = document.getElementById("input-name");
var gymName = document.getElementById("input-gym");
var type = document.getElementById("input-type");
var savedGym = document.getElementById("saved-gym");
var letsGoBtn = document.querySelector("#first-time-popup-submit");
var input = document.querySelector(".form-control")
var firstStarted =document.querySelector(".started .first");
// save last trainer information 

// if (location.search === "" || parseInt(location.search.substring(2, location.search.indexOf("&purchases"))) === "") {
//     document.getElementById("poke-coin-inv").innerHTML = '<img src="./assets/images/pokecoin-logo.png" alt="pokecoin logo" class="" >' + localStorage["poke-shop:coins"]
// } else if (parseInt(localStorage["poke-shop:coins"]) > parseInt(location.search.substring(2, location.search.indexOf("&purchases")))) {
//     localStorage.setItem("poke-shop:coins", parseInt(location.search.substring(2, location.search.indexOf("&purchases"))))
//     document.getElementById("poke-coin-inv").innerHTML = '<img src="./assets/images/pokecoin-logo.png" alt="pokecoin logo" class="" >' + parseInt(location.search.substring(2, location.search.indexOf("&purchases")))
// } else if (localStorage["poke-shop:coins"]!==null) {
//     document.getElementById("poke-coin-inv").innerHTML = '<img src="./assets/images/pokecoin-logo.png" alt="pokecoin logo" class="" >' + localStorage["poke-shop:coins"]
// }

if (location.search === "" || parseInt(location.search.substring(2, location.search.indexOf("&purchases"))) === "") {
    document.getElementById("poke-coin-inv").innerHTML = '<img src="./assets/images/pokecoin-logo.png" alt="pokecoin logo" class="" >' + localStorage["poke-shop:coins"]
} else if (!location.search.includes("&purchases")) {
    localStorage.setItem("poke-shop:coins", parseInt(location.search.substring(2)))
    document.getElementById("poke-coin-inv").innerHTML = '<img src="./assets/images/pokecoin-logo.png" alt="pokecoin logo" class="" >' + parseInt(location.search.substring(2))
} else {
    localStorage.setItem("poke-shop:coins", parseInt(location.search.substring(2, location.search.indexOf("&purchases"))))
    document.getElementById("poke-coin-inv").innerHTML = '<img src="./assets/images/pokecoin-logo.png" alt="pokecoin logo" class="" >' + parseInt(location.search.substring(2, location.search.indexOf("&purchases")))
}

function saveTrainerInfo(){

	var trainerInfo = {
		trainerName: trainerName.value,
		gymName: gymName.value,
		type: type.value,
	};
	localStorage.setItem("trainerInfo", JSON.stringify(trainerInfo));
}

function renderLastTrainer(){
	var lastTrainer = JSON.parse(localStorage.getItem("trainerInfo"));

	if (lastTrainer !== null){
      document.getElementById("saved-gym").innerHTML = lastTrainer.gymName +" "+lastTrainer.type;
	  document.getElementById("saved-name").innerHTML = lastTrainer.trainerName;
    //   saveStarterPokemon(type);
	} else{
		return;
	}
}

window.addEventListener("load", function(){
	if (localStorage.getItem("pokeHome:visited")==="true"){
		document.getElementById("trainer-form").style.display = "none";

        this.document.getElementById("backgroundReset").style.display = "none";
        renderLastTrainer();

    } else {
        setTimeout(function open(event) {
            document.querySelector(".popup").style.display = "block";
            this.document.getElementById("backgroundReset").style.display = "block";
        },
            0000
        )
    };
})

loadPokemon()

letsGoBtn.addEventListener("click", function(event){
	event.preventDefault();
    
	localStorage.setItem("pokeHome:visited", "true");
	
    saveStarterPokemon(document.getElementById("input-type").value);
	saveTrainerInfo();
	renderLastTrainer();
	// document.getElementById("trainer-form").reset();
	document.getElementById("trainer-form").style.display = "none";
    location.assign("./index.html?=500")
});
    // type selected will auto populate the first pokemon.

 function saveStarterPokemon(type){
    let firstPokemon = {
        "Grass":{
            name: "Bulbasaur",
            givenName: null,
            type: ["Grass"],
            rarity: "Standard",
            id: 1,
            storageId: 0,
            pointsTillEvolved: null,    // Add when evolves are in
            imgURL:"assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png"
        },
        "Fire":{
            name: "Charmander",
            givenName: null,
            type: ["Fire"],
            rarity: "Standard",
            id: 4,
            storageId: 0,
            pointsTillEvolved: null,    // Add when evolves are in
            imgURL:"assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png"
    
        },
        "Water":{
            name: "Squirtle",
            givenName: null,
            type: ["Water"],
            rarity: "Standard",
            id: 7,
            storageId: 0,
            pointsTillEvolved: null,    // Add when evolves are in
            imgURL:"assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png"
    
        },
        "Bug":{
            name: "Caterpie",
            givenName: null,
            type: ["Bug"],
            rarity: "Standard",
            id: 10,
            storageId: 0,
            pointsTillEvolved: null,    // Add when evolves are in
            imgURL:"assets.pokemon.com/assets/cms2/img/pokedex/detail/010.png"
        },
        "Flying":{
            name: "Pidgey",
            givenName: null,
            type: ["Flying"],
            rarity: "Standard",
            id: 10,
            storageId: 0,
            pointsTillEvolved: null,    // Add when evolves are in
            imgURL:"assets.pokemon.com/assets/cms2/img/pokedex/detail/016.png"
        },
        "Electric":{
            name: "Pikachu",
            givenName: null,
            type: ["Electric"],
            rarity: "Standard",
            id: 25,
            storageId: 0,
            pointsTillEvolved: null,    // Add when evolves are in
            imgURL:"assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png"
        },
        "Poison":{
            name: "Grimer",
            givenName: null,
            type: ["Poison"],
            rarity: "Standard",
            id: 88,
            storageId: 0,
            pointsTillEvolved: null,    // Add when evolves are in
            imgURL:"assets.pokemon.com/assets/cms2/img/pokedex/detail/088.png"
        },
        "Rock":{
            name: "Geodude",
            givenName: null,
            type: ["Rock"],
            rarity: "Standard",
            id: 74,
            storageId: 0,
            pointsTillEvolved: null,    // Add when evolves are in
            imgURL:"assets.pokemon.com/assets/cms2/img/pokedex/detail/074.png"
        },
        "Psychic":{
            name: "Abra",
            givenName: null,
            type: ["Psychic"],
            rarity: "Standard",
            id: 63,
            storageId: 0,
            pointsTillEvolved: null,    // Add when evolves are in
            imgURL:"assets.pokemon.com/assets/cms2/img/pokedex/detail/063.png"  
        },  
        "Dragon":{
            name: "Dratini",
            givenName: null,
            type: ["Dragon"],
            rarity: "Standard",
            id: 147,
            storageId: 0,
            pointsTillEvolved: null,    // Add when evolves are in
            imgURL:"assets.pokemon.com/assets/cms2/img/pokedex/detail/147.png"  
        },  
        "Steel":{
            name: "Aron",
            givenName: null,
            type: ["Steel"],
            rarity: "Standard",
            id: 304,
            storageId: 0,
            pointsTillEvolved: null,    // Add when evolves are in
            imgURL:"assets.pokemon.com/assets/cms2/img/pokedex/detail/304.png"  
        },  
        "Fairy":{
            name: "Clefairy",
            givenName: null,
            type: ["Fairy"],
            rarity: "Standard",
            id: 35,
            storageId: 0,
            pointsTillEvolved: null,    // Add when evolves are in
            imgURL:"assets.pokemon.com/assets/cms2/img/pokedex/detail/035.png"  
        },  
        "Ground":{
            name: "Diglett",
            givenName: null,
            type: ["Ground"],
            rarity: "Standard",
            id: 50,
            storageId: 0,
            pointsTillEvolved: null,    // Add when evolves are in
            imgURL:"assets.pokemon.com/assets/cms2/img/pokedex/detail/050.png"  
        },  
        "Fighting": {
            name: "Machop",
            givenName: null,
            type: ["Fighting"],
            rarity: "Standard",
            id: 66,
            storageId: 0,
            pointsTillEvolved: null,    // Add when evolves are in
            imgURL:"assets.pokemon.com/assets/cms2/img/pokedex/detail/066.png"  
        },  
        "Ice":{
            name: "Seel",
            givenName: null,
            type: ["Ice"],
            rarity: "Standard",
            id: 86,
            storageId: 0,
            pointsTillEvolved: null,    // Add when evolves are in
            imgURL:"assets.pokemon.com/assets/cms2/img/pokedex/detail/086.png"  
        },  
        "Ghost":{
            name: "Gastly",
            givenName: null,
            type: ["Ghost"],
            rarity: "Standard",
            id: 92,
            storageId: 0,
            pointsTillEvolved: null,    // Add when evolves are in
            imgURL:"assets.pokemon.com/assets/cms2/img/pokedex/detail/092.png"  
        },  
        "Dark": {
            name: "Houndour",
            givenName: null,
            type: ["Dark"],
            rarity: "Standard",
            id: 228,
            storageId: 0,
            pointsTillEvolved: null,    // Add when evolves are in
            imgURL:"assets.pokemon.com/assets/cms2/img/pokedex/detail/228.png"  
        },  
        "Normal":{
            name: "Slakoth",
            givenName: null,
            type: ["Normal"],
            rarity: "Standard",
            id: 287,
            storageId: 0,
            pointsTillEvolved: null,    // Add when evolves are in
            imgURL:"assets.pokemon.com/assets/cms2/img/pokedex/detail/287.png"  
        }  
    }
    let newGivenName = prompt("What would you like ot name your first pokemon?");
    console.log(newGivenName);
    if (newGivenName === "" || newGivenName === null) {
        newGivenName = firstPokemon[type].name
        firstPokemon[type].givenName = newGivenName
    } else {
        firstPokemon[type].givenName = newGivenName
    }
    console.log(newGivenName)
    localStorage.setItem("poke-shop:!"+firstPokemon[type].givenName, JSON.stringify(firstPokemon[type]));
    console.log(firstPokemon)
}

function turnObjToArray(object) {
    let newArray = []
    for (let index = 0; index < Object.keys(object).length - 2; index++) {
        newArray.push(object[index])
    }
    return newArray
}

function loadPokemon() {
    $("#poke-cards-container").children().remove()

    let getFilters = () => {
        switch ($("#poke-search-filter-btn").text()) {
            case "Filter":
                return ["none"]
            case "Filter: Name":
                if ($("#poke-search-name-bar").val() === "") {
                    return["none"]
                } else {
                    return ["Name",$("#poke-search-name-bar").val()]
                }
            case "Filter: Rarity":
                return ["Rarity",$("#poke-search-rarity-btn").text()]
            case "Filter: Type":
                return ["Type",$("#poke-search-type-btn").text()]     
        }
    }

    let filter = getFilters()
    console.log(filter);
    let filtered = []
    let sessionSoldList = []
    let objectList;
    if (location.search.substring(location.search.indexOf("&purchases=")+11).replace(/(%22)/g, '"') !== "") {
        objectList = JSON.parse(location.search.substring(location.search.indexOf("&purchases=")+11).replace(/(%22)/g, '"'))
    }

    for (item in localStorage) {
        if (item.includes("poke-shop-sold")) {
            sessionSoldList.push(localStorage[item])
        }
    }

    for (item in objectList) {
        if (!sessionSoldList.includes(objectList[item].givenName)) {
            localStorage.setItem("poke-shop:!"+objectList[item].givenName, JSON.stringify(objectList[item]))
        }
    }

    console.log(filter[0]);
    for (item in localStorage) {
        if (item.includes("poke-shop:!")) {
            switch (filter[0]) {
                case "none":
                    filtered.push(JSON.parse(localStorage[item]))
                case "Name":
                    if (JSON.parse(localStorage[item]).name === filter[1] || JSON.parse(localStorage[item]).givenName === filter[1]) {
                        filtered.push(JSON.parse(localStorage[item]))
                    }
                case "Rarity":
                    if (JSON.parse(localStorage[item]).rarity === filter[1]) {
                        filtered.push(JSON.parse(localStorage[item]))
                    }
                case "Type":
                    if (JSON.parse(localStorage[item]).type.includes(filter[1])) {
                        filtered.push(JSON.parse(localStorage[item]))
                    }
            }
        }
    }

    console.log(filtered);
    for (item in filtered) {
        checkDouble = () => {
            if(filtered[item].type.length === 2) {
                console.log(filtered[item].type.length);
                return filtered[item].type[1]
            } else {
                return filtered[item].type[0]
            }
        }
        $("#poke-cards-container").append($("<div>").addClass("card m-1 mb-3 d-inline-block").attr("id", "poke-info-card").attr("style", "width: 12rem; height: 24rem;")
            .append($("<img>").addClass("card-img-top").attr("src", "https://"+filtered[item].imgURL).attr("alt", filtered[item].givenName+"-Pokemon Inventory Card Image"))
            .append($("<div>").addClass("card-body")
                .append($("<h5>").addClass("card-title").text(filtered[item].givenName))
                .append($("<p>").addClass("card-text").text(filtered[item].name))
                .append($("<p>").addClass("card-text").text(filtered[item].type[0]+","))
                .append($("<p>").addClass("card-text").text(checkDouble()))
                .append($("<p>").addClass("card-text").text(filtered[item].rarity))
                .append($("<div>").addClass("text-center")
                    .append($("<a>").addClass("sell-pkm-btn btn btn-primary").attr("href", "#").text("Sell"))
                    .append($("<br>"))
                    .append($("<div>").addClass("row-cols-3 mt-2 d-flex justify-content-around")
                        .append($("<a>").addClass("feed-pkm-btn").attr("id", "poke-feed-normal").attr("href", "#").attr("data-toggle","tooltip").attr("data-placement", "top").attr("title", "Feed Pokemon").append($("<img>").attr("src", "https://archives.bulbagarden.net/media/upload/9/93/Bag_Health_Candy_Sprite.png")))
                        .append($("<a>").addClass("feed-pkm-btn").attr("id", "poke-feed-large").attr("href", "#").attr("data-toggle","tooltip").attr("data-placement", "top").attr("title", "Feed Pokemon").append($("<img>").attr("src", "https://archives.bulbagarden.net/media/upload/8/86/Bag_Health_Candy_L_Sprite.png")))
                        .append($("<a>").addClass("feed-pkm-btn").attr("id", "poke-feed-xlarge").attr("href", "#").attr("data-toggle","tooltip").attr("data-placement", "top").attr("title", "Feed Pokemon").append($("<img>").attr("src", "https://archives.bulbagarden.net/media/upload/6/64/Bag_Health_Candy_XL_Sprite.png")))
                        )
                    )
                )
            )
    }
}

$("#poke-search-filter").children().on("click", event => {
    event.preventDefault()
    switch (event.currentTarget.innerText) {
        case "Name":
            event.currentTarget.parentNode.parentNode.children[0].innerText = "Filter: "+event.currentTarget.innerText
            $("#poke-search-name").prop("style", "display: visible;")
            $("#poke-search-rarity").prop("style", "display: none;")
            $("#poke-search-type").prop("style", "display: none;")
            $("#poke-search-rarity-btn").text("Rarity")
            $("#poke-search-type-btn").text("Type")
            break;
        case "Rarity":
            event.currentTarget.parentNode.parentNode.children[0].innerText = "Filter: "+event.currentTarget.innerText
            $("#poke-search-name").prop("style", "display: none;")
            $("#poke-search-rarity").prop("style", "display: visible;")
            $("#poke-search-type").prop("style", "display: none;")
            $("#poke-search-rarity-btn").text("Rarity")
            break;
        case "Type":
            event.currentTarget.parentNode.parentNode.children[0].innerText = "Filter: "+event.currentTarget.innerText
            $("#poke-search-name").prop("style", "display: none;")
            $("#poke-search-rarity").prop("style", "display: none;")
            $("#poke-search-type").prop("style", "display: visible;")
            $("#poke-search-type-btn").text("Type")
            break;
        case "None":
            event.currentTarget.parentNode.parentNode.children[0].innerText = "Filter"
            $("#poke-search-name").prop("style", "display: none;")
            $("#poke-search-rarity").prop("style", "display: none;")
            $("#poke-search-rarity-btn").text("Rarity")
            $("#poke-search-type").prop("style", "display: none;")
            $("#poke-search-type-btn").text("Type")
            loadPokemon()
            break;
    }
})

$("#poke-search-name-btn").on("click", event => {
    event.preventDefault()
    loadPokemon()
})

$("body").on("keyup", event => {
    console.log(event.originalEvent.key);
    if ($("#poke-search-name").css("display") === "inline-flex") {
        if (event.originalEvent.key === "Enter") {
            loadPokemon()
        }
    }
})

$("#poke-search-rarity-items").children().on("click", event => {
    event.preventDefault()
    event.currentTarget.parentNode.parentNode.children[0].innerText = event.currentTarget.innerText
    loadPokemon()
})

$("#poke-search-type-items").children().on("click", event => {
    event.preventDefault()
    event.currentTarget.parentNode.parentNode.children[0].innerText = event.currentTarget.innerText
    loadPokemon()
})


$(".sell-pkm-btn").on("click", event => {
    event.preventDefault()
    console.log("poke-shop:!"+event.currentTarget.parentNode.parentNode.children[0].innerText);
    localStorage.removeItem("poke-shop:!"+event.currentTarget.parentNode.parentNode.children[0].innerText)
    localStorage.setItem("poke-shop-sold:"+event.currentTarget.parentNode.parentNode.children[0].innerText, event.currentTarget.parentNode.parentNode.children[0].innerText)
    anime({
        targets: event.currentTarget.parentNode.parentNode.parentNode,
        keyframes: [
            {
                zIndex: 100,
                duration: 0
            },
            {
                translateX: (window.innerWidth / 2) - event.currentTarget.parentNode.parentNode.parentNode.getBoundingClientRect().x - 160,
                translateY: (window.innerHeight / 2) - event.currentTarget.parentNode.parentNode.parentNode.getBoundingClientRect().y - 250,
                scale: 1.5,
                duration: 2000
            },
            {
                translateX: window.innerWidth - event.currentTarget.parentNode.parentNode.parentNode.getBoundingClientRect().x - 160,
                translateY: -(window.innerHeight - 400),
                opacity: 0,
                easing: 'cubicBezier(1, 0, 1, 1)',
                duration: 1000
            }
        ],
        complete: function (anim) {
            $("#anime-pokecoin-sell").remove()
            switch (event.currentTarget.parentNode.parentNode.children[4].innerText) {
                case "Standard":
                    increaseMoney(2)
                    localStorage.setItem("poke-shop:coins", document.getElementById("poke-coin-inv").innerText)
                    break;
                case "Legendary":
                    increaseMoney(125)
                    localStorage.setItem("poke-shop:coins", document.getElementById("poke-coin-inv").innerText)
                    break;
                case "Mythic":
                    increaseMoney(250)
                    localStorage.setItem("poke-shop:coins", document.getElementById("poke-coin-inv").innerText)
                    break;
            }
            event.currentTarget.parentNode.parentNode.parentNode.remove()
            let totalPokecoins = 8;    // Set how many coins to create.
            $("body").append($("<div>").attr("id", "anime-pokecoin-sell").attr("style", "display: flex; justify-content: end; position: fixed; z-index: 100; top: 0px; right: 0px; width: 5%; height: 5%; opacity: 1;")
                .append(() => {
                    let pokeCoinImageArray = []
                    for (let index = 0; index < totalPokecoins; index++) {
                        pokeCoinImageArray.push($("<img>").attr("src", "./assets/images/pokecoin.png").attr("style", "position: absolute; width: 32px; height: 32px;"))
                    }
                    return pokeCoinImageArray
                }))
            anime({
                targets: turnObjToArray($("#anime-pokecoin-sell").children()),
                translateX: anime.stagger(-35, { grid: [Math.sqrt(totalPokecoins), Math.sqrt(totalPokecoins)], axis: "x" }),
                translateY: anime.stagger(35, { grid: [Math.sqrt(totalPokecoins), Math.sqrt(totalPokecoins)], axis: "y" }),
                opacity: 0,
                duration: 1000,
                easing: "easeInOutQuad",
            })
        }
    })
})

$(".feed-pkm-btn").on("click", event => {
    event.preventDefault()
    let hasCandy;
    if (event.currentTarget.id === "poke-feed-normal") {
        hasCandy = decreaseNormalCandy() || alert("You are out of normal candies!")
    } else if (event.currentTarget.id === "poke-feed-large") {
        hasCandy = decreaseLargeCandy() || alert("You are out of large candies!")
    } else if (event.currentTarget.id === "poke-feed-xlarge") {
        hasCandy = decreaseXlargeCandy() || alert("You are out of large candies!")
    }

    if (hasCandy) {
        anime({
            targets: [event.currentTarget.children[0]],
            translateY: -200,
            opacity: 0,
            easing: "cubicBezier(1, 0, .75, 1)",
            duration: 1000,
            begin: function () {
                $(event.currentTarget).attr("style", "pointer-events: none;")
            },
            complete: function () {
                anime({
                    targets: event.currentTarget.children[0],
                    translateY: 0,
                    opacity: 1,
                    duration: 0,
                    complete: function () {
                        console.log(event.currentTarget.parentNode.parentNode);
                        $(event.currentTarget).attr("style", "pointer-events: initial;")
                    }
                })
            },
        })
    }
})

$("#poke-coin-inv").on("click", event => {
    increaseMoney()
    localStorage.setItem("poke-shop:coins", document.getElementById("poke-coin-inv").innerText)
})

$("#poke-shop-reset-btn").on("click", event => {
    if (confirm("Are you sure you wish to reset your profile?")) {
        localStorage.clear()
        location.assign("./index.html")
    }
})

$("#link-shop").on("click", event => {
    event.preventDefault()
    for (item in localStorage) {
        if (item.includes("poke-shop-sold")) {
            localStorage.removeItem(item)
        }
    }

    location.assign("./shop.html?="+document.getElementById("poke-coin-inv").innerText)
})

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//functional candies and money button counter

function decreaseNormalCandy() {

    if (parseInt(document.getElementById("poke-candy-normal").innerHTML) > 0) {
        document.getElementById("poke-candy-normal").innerHTML = parseInt(document.getElementById("poke-candy-normal").innerHTML) - 1;
        localStorage.setItem("poke-shop:candy-normal", document.getElementById("poke-candy-normal").innerHTML)
        return true
    } else {
        return false
    }
}

function decreaseLargeCandy() {
    if (parseInt(document.getElementById("poke-candy-large").innerHTML) > 0) {
        document.getElementById("poke-candy-large").innerHTML = parseInt(document.getElementById("poke-candy-large").innerHTML) - 1;
        localStorage.setItem("poke-shop:candy-large", document.getElementById("poke-candy-large").innerHTML)
        return true
    } else {
        return false
    }
  
}

function decreaseXlargeCandy() {
    if (parseInt(document.getElementById("poke-candy-xlarge").innerHTML) > 0) {
        document.getElementById("poke-candy-xlarge").innerHTML = parseInt(document.getElementById("poke-candy-xlarge").innerHTML) - 1;
        localStorage.setItem("poke-shop:candy-xlarge", document.getElementById("poke-candy-xlarge").innerHTML)
        return true
    } else {
        return false
    }
}


function increaseMoney(incAmount=5) {
    let newCount = parseInt(document.getElementById("poke-coin-inv").innerText) + incAmount
    document.getElementById("poke-coin-inv").innerHTML = '<img src="./assets/images/pokecoin-logo.png" alt="pokecoin logo" class="" ></img>'+newCount;
    localStorage.setItem("poke-shop:coins", document.getElementById("poke-coin-inv").innerText)
}
