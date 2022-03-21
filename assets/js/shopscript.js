// API handling
// Image URL Refrence: https://img.pokemondb.net/sprites/sword-shield/icon/{pokemon_name}.png

var results;

// function sendRef(results) {
//     results.forEach(pokemon => {
//         console.log(pokemon);
//         console.log("https://img.pokemondb.net/sprites/sword-shield/icon/"+ pokemon.name.toLowerCase() +".png");
//     });  // This is where we handle the results retrieved from our fetches
// }

// Filter will include: "searchedName", "searchedType", or "searchedRarity" or "searchedAll"
async function pokemonRequestBy( input){
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
        getPokemonByRarity(input, rarityData, typesData)
    })
}


// Returns all pokemon matched by type
function getPokemonType(id, typesData){  // Add Id variant condition
    for(let index=0; index < typesData.length; index++){
        if (typesData[index]["pokemon_id"] === id) {
            return typesData[index]["type"]
        } 
    }
}

// Returns all pokemon matched by Rarity. Because this requests from another api, and is refrenced in other functions,
// first value can be passed in as null if searching rarity by id instead.
// searchedRarity must be "Legendary", "Mythic", or "Standard" case sensitive
function getPokemonByRarity(searchedRarity, rarityData, typesData){
    let returnResults = []
    let names_filter = []  // Include a name filter since the api has multiple itterations of a same pokemon
    for(let index=0; index < Object.keys(rarityData).length; index++){
        if (searchedRarity !== null) {
            if (Object.keys(rarityData)[index]===searchedRarity) {
                for(let subindex = 0; subindex < rarityData[Object.keys(rarityData)[index]].length; subindex++) {
                    if (!names_filter.includes(rarityData[Object.keys(rarityData)[index]][subindex]["pokemon_name"])) {
                        let pokemon = {
                            name: null,
                            givenName: null,
                            type: null,
                            rarity: null,
                            id: null,
                            storageId: null,
                            pointsTillEvolved: null
                        }
                        pokemon.name = rarityData[Object.keys(rarityData)[index]][subindex]["pokemon_name"]
                        names_filter.push(rarityData[Object.keys(rarityData)[index]][subindex]["pokemon_name"])
                        pokemon.id = rarityData[Object.keys(rarityData)[index]][subindex]["pokemon_id"]
                        pokemon.type = getPokemonType(pokemon.id, typesData)
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

    results = returnResults;
}



// Add more logic based code above
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Animation area

$(".poke-buy-btn").on("click", event => {
    event.preventDefault()

    anime({
        targets: event.currentTarget.parentNode.parentNode.previousElementSibling,
        begin: function() {
            // Reset all of this upon animation's full completion
            $(event.currentTarget.parentNode.parentNode.parentNode).prop("style", "width: 15rem; height: 25rem; z-index: 10; position: relative;")
            $(".poke-buy-btn").attr("style", "pointer-events: none;")
            $("body").prepend($("<div>").attr("id", "masking-div").attr("style", "position: fixed; background-color: black; width: 100%; height: 100%; z-index: 10; opacity: 50%;"))
            // Get the data we will be pulling from at random
            switch (event.currentTarget.id) {
                case "poke-standard":
                    pokemonRequestBy("Standard")
                    break;
            
                case "poke-legendary":
                    pokemonRequestBy("Legendary")
                    break;
            
                case "poke-mythic":
                    pokemonRequestBy("Mythic")
                    break;

            }
        },
        translateX: (window.innerWidth/2)-event.currentTarget.parentNode.parentNode.parentNode.getBoundingClientRect().x-125,
        scale: 1.5,
        easing: 'cubicBezier(.5, 0, .5, 1)',
        duration: 1500,
        complete: function() {
            anime({
                targets: event.currentTarget.parentNode.parentNode.previousElementSibling,
                rotate: [
                    {value: 25},
                    {value: -25}
                ],
                duration: 250,
                // direction: "alternate",
                loop: 6,
                complete: function() {
                    var randomPoke = results[Math.floor(Math.random()*results.length)];
                    $("#poke-cards-container").append($("<img>")
                                .attr("id", "random-pokemon")
                                .attr("src", "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/"+randomPoke.id+".png")
                                .attr("style", "position: absolute; top: 15%; left: 50%; transform: translate(-50%, -50%); width: 300px; height: 300px; z-index: 20; opacity: 0"))

                    anime({
                        targets: event.currentTarget.parentNode.parentNode.previousElementSibling,
                        keyframes: [
                            {
                                rotate: 0
                            },
                            {
                                translateY: 250,
                                scale: .75
                            }

                        ],
                        easing: "linear",
                        duration: 1000
                    })
                    anime({
                        targets: event.currentTarget.parentNode.parentNode.parentNode.parentNode.lastElementChild,
                        opacity: 1,
                        duration: 1000,
                        endDelay: 1500,
                        complete: function() {
                            randomPoke.givenName = prompt("Congratulations! You got a "+randomPoke.name+"!\nPlease enter a name:");
                            if (randomPoke.givenName === "" || randomPoke.givenName === null) {
                                randomPoke.givenName = randomPoke.name;
                            }
                            let storageNextId = 0
                            for (item in localStorage) {
                                let parsedPoke = JSON.parse(localStorage.getItem(item))
                                if (item.includes("poke-shop:!")) {
                                    if (parsedPoke.storageId <= storageNextId) {
                                        storageNextId = parsedPoke.storageId+1
                                    }
                                }
                            }
                            randomPoke.storageId = storageNextId
                            anime({
                                targets: event.currentTarget.parentNode.parentNode.previousElementSibling,
                                translateX: 0,
                                translateY: 0,
                                scale: 1,
                                easing: "linear"
                            })
                            anime({
                                targets: event.currentTarget.parentNode.parentNode.parentNode.parentNode.lastElementChild,
                                translateX: -250,
                                opacity: 0,
                                
                                complete: function() {
                                    // Add pokemon to local storage
                                    localStorage.setItem("poke-shop:!"+randomPoke.givenName, JSON.stringify(randomPoke))


                                    $(event.currentTarget.parentNode.parentNode.parentNode).prop("style", "width: 15rem; height: 25rem; position: relative;")
                                    $("#masking-div").remove()
                                    $("#random-pokemon").remove()
                                    $(".poke-buy-btn").attr("style", "pointer-events: initial;")
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})