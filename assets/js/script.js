var trainerName = document.getElementById("input-name");
var gymName = document.getElementById("input-gym");
var type = document.getElementById("input-type");
var savedGym = document.getElementById("saved-gym");
var letsGoBtn = document.querySelector("#first-time-popup-submit");
var input = document.querySelector(".form-control")
<<<<<<< HEAD
// save last trainer information 
=======
var firstStarted =document.querySelector(".started .first");

>>>>>>> 010a41e70ca3561a91d18852f6250ec21857cf55
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
		setTimeout(function open(event){
				document.querySelector(".popup").style.display = "block";
                this.document.getElementById("backgroundReset").style.display = "block";
			},
			0000 
		)
	};
})

loadCoins()
loadCandies()
loadPokemon()

<<<<<<< HEAD
// API handling
=======
letsGoBtn.addEventListener("click", function(event){
	event.preventDefault();
    
	localStorage.setItem("pokeHome:visited", "true");
    localStorage.setItem("poke-shop:c-normal", 0)
    localStorage.setItem("poke-shop:c-large", 0)
    localStorage.setItem("poke-shop:c-xlarge", 0)
	
    saveStarterPokemon(document.getElementById("input-type").value);
	saveTrainerInfo();
	renderLastTrainer();
	// document.getElementById("trainer-form").reset();
	document.getElementById("trainer-form").style.display = "none";
    document.getElementById("poke-coin-inv").innerText = 500
    localStorage.setItem("poke-shop:coins", 500)
    location.assign("./index.html")
});
    // type selected will auto populate the first pokemon.
>>>>>>> 010a41e70ca3561a91d18852f6250ec21857cf55

// Image URL Refrence: https://img.pokemondb.net/sprites/sword-shield/icon/{pokemon_name}.png

function sendRef(results) {
    results.forEach(pokemon => {
        console.log(pokemon);
        console.log("https://img.pokemondb.net/sprites/sword-shield/icon/"+ pokemon.name.toLowerCase() +".png");
    });  // This is where we handle the results retrieved from our fetches
}

// Filter will include: "searchedName", "searchedType", or "searchedRarity" or "searchedAll"
async function pokemonRequestBy(filter, input){
    const fetchTypes = fetch("https://pokemon-go1.p.rapidapi.com/pokemon_types.json", {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "pokemon-go1.p.rapidapi.com",
			"x-rapidapi-key": "04a8eac5c0msh3aca5db7c42a8e3p196c9djsn168c1f1439af"
		}
	})
    const fetchRarity = fetch("https://pokemon-go1.p.rapidapi.com/pokemon_rarity.json", {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "pokemon-go1.p.rapidapi.com",
			"x-rapidapi-key": "04a8eac5c0msh3aca5db7c42a8e3p196c9djsn168c1f1439af"
		}
	})

    Promise.all([fetchTypes, fetchRarity]).then(responses => {
        return Promise.all(responses.map(re => re.json()))
    }).then(([typesData, rarityData]) => {
        console.log(typesData);
        console.log(rarityData);
        if (filter === "searchedName") {
            getPokemonByName(input, typesData, rarityData)
        } else if (filter === "searchedType") {
            getPokemonByType(input,null, typesData, rarityData)
        } else if (filter === "searchedRarity") {
            getPokemonByRarity(input,null, rarityData, typesData)
        }
    })
}

// Returns all pokemon matched by name
function getPokemonByName(searchedName, typesData, rarityData){
    let returnResults = []
    let names_filter = []  // Include a name filter since the api has multiple itterations of a same pokemon
    for(let index=0; index < Object.keys(typesData).length; index++){
        let pokemon = {
            name: null,
            type: null,
            rarity: null,
            id: null
        }
        if (typesData[index]["pokemon_name"] === searchedName && !names_filter.includes(typesData[index]["pokemon_name"])) {
            pokemon.name = typesData[index]["pokemon_name"]
            names_filter.push(typesData[index]["pokemon_name"])
            pokemon.type = typesData[index]["type"]
            pokemon.id = typesData[index]["pokemon_id"]
            pokemon.rarity = getPokemonByRarity(null, pokemon.id, rarityData, typesData)

            returnResults.push(pokemon)
        }
    }
    if (returnResults.length > 0) {
        sendRef(returnResults)
    }
}


// Returns all pokemon matched by type
function getPokemonByType(searchedType=null, id=null, typesData, rarityData){  // Add Id variant condition
    let returnResults = []
    let names_filter = []  // Include a name filter since the api has multiple itterations of a same pokemon
    for(let index=0; index < typesData.length; index++){
        if (searchedType !== null) {
            let pokemon = {
                name: null,
                type: null,
                rarity: null,
                id: null
            }
            if (typesData[index]["type"].includes(searchedType) && !names_filter.includes(typesData[index]["pokemon_name"])) {
                pokemon.name = typesData[index]["pokemon_name"]
                names_filter.push(typesData[index]["pokemon_name"])
                pokemon.type = typesData[index]["type"]
                pokemon.id = typesData[index]["pokemon_id"]
                pokemon.rarity = getPokemonByRarity(null, pokemon.id, rarityData, typesData)

                returnResults.push(pokemon)
            }
        } else {
            if (typesData[index]["pokemon_id"] === id) {
                return typesData[index]["type"]
            }
        }
    }

    if (returnResults.length > 0) {
        sendRef(returnResults)
    }
}

// Returns all pokemon matched by Rarity. Because this requests from another api, and is refrenced in other functions,
// first value can be passed in as null if searching rarity by id instead.
// searchedRarity must be "Legendary", "Mythic", or "Standard" case sensitive
function getPokemonByRarity(searchedRarity=null, id=null, rarityData, typesData){
    let returnResults = []
    let names_filter = []  // Include a name filter since the api has multiple itterations of a same pokemon
    for(let index=0; index < Object.keys(rarityData).length; index++){
        if (searchedRarity !== null) {
            if (Object.keys(rarityData)[index]===searchedRarity) {
                console.log("rarityData[searchedRarity] is a "+typeof rarityData[searchedRarity]) // To check if this is a list when debugging
                for(let subindex = 0; subindex < rarityData[Object.keys(rarityData)[index]].length; subindex++) {
                    if (!names_filter.includes(rarityData[Object.keys(rarityData)[index]][subindex]["pokemon_name"])) {
                        let pokemon = {
                            name: null,
                            type: null,
                            rarity: null,
                            id: null
                        }
                        pokemon.name = rarityData[Object.keys(rarityData)[index]][subindex]["pokemon_name"]
                        names_filter.push(rarityData[Object.keys(rarityData)[index]][subindex]["pokemon_name"])
                        pokemon.id = rarityData[Object.keys(rarityData)[index]][subindex]["pokemon_id"]
                        pokemon.type = getPokemonByType(null, pokemon.id, typesData, rarityData)
                        pokemon.rarity = rarityData[Object.keys(rarityData)[index]][subindex]["rarity"]

                        returnResults.push(pokemon)
                    }
                }
            }
        } else {
            for (let subindex = 0; subindex < rarityData[Object.keys(rarityData)[index]].length; subindex++) {
                if (rarityData[Object.keys(rarityData)[index]][subindex]["pokemon_id"]===id) {
                    return rarityData[Object.keys(rarityData)[index]][subindex]["rarity"]
                }
            }
        }
    }

    if (returnResults.length > 0) {
        sendRef(returnResults)
    }
}

function getAllPokemon() {
    return null
}
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function turnObjToArray(object) {
    let newArray = []
    for (let index = 0; index < Object.keys(object).length-2; index++) {
        console.log(newArray);
        newArray.push(object[index])
    }
    return newArray
}

function loadCoins() {
    document.getElementById("poke-coin-inv").innerHTML = '<img src="./assets/images/pokecoin-logo.png" alt="pokecoin logo" class="">'+localStorage.getItem("poke-shop:coins")
}

function loadCandies() {
    if (localStorage.getItem("poke-shop:candy-normal")===null) {
        localStorage.setItem("poke-shop:candy-normal", 0)
        $("#poke-candy-normal").text(localStorage.getItem("poke-shop:candy-normal"))
    } else {
        $("#poke-candy-normal").text(localStorage.getItem("poke-shop:candy-normal"))
    }
    if (localStorage.getItem("poke-shop:candy-large")===null) {
        localStorage.setItem("poke-shop:candy-large", 0)
        $("#poke-candy-large").text(localStorage.getItem("poke-shop:candy-large"))
    } else {
        $("#poke-candy-large").text(localStorage.getItem("poke-shop:candy-large"))
    }
    if (localStorage.getItem("poke-shop:candy-xlarge")===null) {
        localStorage.setItem("poke-shop:candy-xlarge", 0)
        $("#poke-candy-xlarge").text(localStorage.getItem("poke-shop:candy-xlarge"))
    } else {
        $("#poke-candy-xlarge").text(localStorage.getItem("poke-shop:candy-xlarge"))
    }

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
    loadButtons();
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

function loadButtons() {
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
}

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
    })
})

// $("<img>").attr("src", "./assets/images/pokecoin.png")

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//functional candies and money button counter
var count = 0;
var count2 = 0;
var count3 = 0;
var count4= 0;
function increaseNormalCandy1() { 
    document.getElementById("normal").innerHTML = count+=1;
}




function decreaseNormalCandy2(){ 

    if (document.getElementById("normal").innerHTML > 0) { document.getElementById("normal").innerHTML = count-=1;
    }
}



function increaseLargeCandy3(){ 
    document.getElementById("large").innerHTML = count2-=-2;
}



function decreaseLargCandy4(){ 
   if (document.getElementById("large").innerHTML > 0) { document.getElementById("large").innerHTML = count2-=2;
    }
}




function increaseXlargeCandy5(){ document.getElementById("xlcandy").innerHTML = count3+=3;
}



function decreaseXlargeCandy6(){ 
   if (document.getElementById("xlcandy").innerHTML > 0) { document.getElementById("xlcandy").innerHTML = count3-=3;
    }
}



function increaseMoney7(){ document.getElementById("poke-money").innerHTML = count4+=5;
}




function decreaseMoney8(){ 
   if (document.getElementById("poke-money").innerHTML > 0) { document.getElementById("poke-money").innerHTML = count4-=5;
    }
}



