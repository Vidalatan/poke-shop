var trainerName = document.getElementById("input-name");
var gymName = document.getElementById("input-gym");
var type = document.getElementById("input-type");
var savedGym = document.getElementById("saved-gym");
var letsGoBtn = document.querySelector("#first-time-popup-submit");
var input = document.querySelector(".form-control")
// save last trainer information 
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

} else {
		setTimeout(function open(event){
				document.querySelector(".popup").style.display = "block";
			},
			0000 
		)
	};
})

letsGoBtn.addEventListener("click", function(event){
	event.preventDefault();
    
	localStorage.setItem("pokeHome:visited", "true");
	
	saveTrainerInfo();
	renderLastTrainer();
	// document.getElementById("trainer-form").reset();
	document.getElementById("trainer-form").style.display = "none";
 
 });











// ------------------------------------------------------------------------------------------

// API handling

// Image URL Refrence: https://img.pokemondb.net/sprites/sword-shield/icon/{pokemon_name}.png

function sendRef(results) {
    results.forEach(pokemon => {
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
};
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
