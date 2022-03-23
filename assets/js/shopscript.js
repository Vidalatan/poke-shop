// API handling
// Image URL Refrence: https://img.pokemondb.net/sprites/sword-shield/icon/{pokemon_name}.png

var results;

function loadCoins() {
    document.getElementById("poke-coin-inv").innerHTML = '<img src="./assets/images/pokecoin-logo.png" alt="pokecoin logo" class="">'+localStorage.getItem("poke-shop:coins")
}

loadCoins()

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

function parsePokeId(pokeId) {
    num = pokeId.toString();
    while (num.length < 3) {
        num = "0" + num
    }
    return num
}

$(".poke-buy-btn").on("click", event => {
    event.preventDefault()
    var contAnime = true

    anime({
        targets: event.currentTarget.parentNode.parentNode.previousElementSibling,
        begin: function() {
            try {
                // Get the data we will be pulling from at random
                switch (event.currentTarget.id) {
                    case "poke-standard":
                        if (parseInt(document.getElementById("poke-coin-inv").innerText)>=5) {
                            decreaseMoney(5)
                            document.getElementById("poke-coin-inv").innerHTML = '<img src="./assets/images/pokecoin-logo.png" alt="pokecoin logo" class="" >' + localStorage.getItem("poke-shop:coins")
                            pokemonRequestBy("Standard")
                            // Reset all of this upon animation's full completion
                            $(event.currentTarget.parentNode.parentNode.parentNode).prop("style", "width: 15rem; height: 25rem; z-index: 10; position: relative;")
                            $(".poke-buy-btn").attr("style", "pointer-events: none;")
                            $("body").prepend($("<div>").attr("id", "masking-div").attr("style", "position: fixed; background-color: black; width: 100%; height: 100%; z-index: 10; opacity: 50%;"))
                        } else {
                            throw new Error("stopped animation")
                        }
                        break;
                
                    case "poke-legendary":
                        if (parseInt(document.getElementById("poke-coin-inv").innerText)>=250) {
                            decreaseMoney(250)
                            document.getElementById("poke-coin-inv").innerHTML = '<img src="./assets/images/pokecoin-logo.png" alt="pokecoin logo" class="" >' + localStorage.getItem("poke-shop:coins")
                            pokemonRequestBy("Legendary")
                            $(event.currentTarget.parentNode.parentNode.parentNode).prop("style", "width: 15rem; height: 25rem; z-index: 10; position: relative;")
                            $(".poke-buy-btn").attr("style", "pointer-events: none;")
                            $("body").prepend($("<div>").attr("id", "masking-div").attr("style", "position: fixed; background-color: black; width: 100%; height: 100%; z-index: 10; opacity: 50%;"))
                        } else {
                            throw new Error("stopped animation")
                        }    
                        break;
                
                    case "poke-mythic":
                        if (parseInt(document.getElementById("poke-coin-inv").innerText)>=500) {
                            decreaseMoney(500)
                            document.getElementById("poke-coin-inv").innerHTML = '<img src="./assets/images/pokecoin-logo.png" alt="pokecoin logo" class="" >' + localStorage.getItem("poke-shop:coins")
                            pokemonRequestBy("Mythic")
                            $(event.currentTarget.parentNode.parentNode.parentNode).prop("style", "width: 15rem; height: 25rem; z-index: 10; position: relative;")
                            $(".poke-buy-btn").attr("style", "pointer-events: none;")
                            $("body").prepend($("<div>").attr("id", "masking-div").attr("style", "position: fixed; background-color: black; width: 100%; height: 100%; z-index: 10; opacity: 50%;"))
                        } else {
                            throw new Error("stopped animation")
                        }
                        break;
                }
            } catch (error) {
                contAnime = false
                anime.remove(event.currentTarget.parentNode.parentNode.previousElementSibling)
                alert("You don't have enough money!\nTo make more money, simply click on your Poke-Coins")
            }
        },
        translateX: (window.innerWidth/2)-event.currentTarget.parentNode.parentNode.parentNode.getBoundingClientRect().x-125,
        scale: 1.5,
        easing: 'cubicBezier(.5, 0, .5, 1)',
        duration: 1500,
        complete: function() {
            if (contAnime) {
                anime({
                    targets: event.currentTarget.parentNode.parentNode.previousElementSibling,
                    rotate: [
                        {value: 25},
                        {value: -25}
                    ],
                    duration: 250,
                    loop: 6,
                    complete: function() {
                        var randomPoke = results[Math.floor(Math.random()*results.length)];
                        let urlId = parsePokeId(randomPoke.id)
                        console.log(urlId);
                        randomPoke.imgURL = "assets.pokemon.com/assets/cms2/img/pokedex/detail/"+urlId+".png"
                        $("#poke-cards-container").append($("<img>")
                                    .attr("id", "random-pokemon")
                                    .attr("src", "https://"+randomPoke.imgURL)
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
                                        localStorage.setItem("poke-shop:!"+randomPoke.givenName, JSON.stringify(randomPoke))  // Purchased pokemon will get the '$' prefixed to them to represent they were bought
    
    
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
        }
    })
})

$("#poke-candy-buy-normal").on("click", event => {
    event.preventDefault()
    let contAnime = true;
    anime({
        targets: event.currentTarget.parentNode.parentNode.parentNode.children[0],
        begin: function() {
            try {
                if (parseInt(document.getElementById("poke-coin-inv").innerText)>2) {
                    decreaseMoney(2)
                    if (localStorage.getItem("poke-shop:candy-normal")===null) {
                        localStorage.setItem("poke-shop:candy-normal", 1)
                    } else {
                        localStorage.setItem("poke-shop:candy-normal", parseInt(localStorage.getItem("poke-shop:candy-normal"))+1)
                    }
                } else {
                    throw new Error("not enough money")
                }
            } catch (error) {
                contAnime = false
                alert("You don't have enough money!\nTo make more money, simply click on your Poke-Coins")
            }
        },
        scale: 3,
        opacity: 0,
        duration: 250,
        complete: function() {
            anime({
                targets: event.currentTarget.parentNode.parentNode.parentNode.children[0],
                scale: 1,
                opacity: 1,
                duration: 0
            })
        }
    })
})
$("#poke-candy-buy-large").on("click", event => {
    event.preventDefault()
    let contAnime = true;
    anime({
        targets: event.currentTarget.parentNode.parentNode.parentNode.children[0],
        begin: function() {
            try {
                if (parseInt(document.getElementById("poke-coin-inv").innerText)>10) {
                    decreaseMoney(10)
                    if (localStorage.getItem("poke-shop:candy-large")===null) {
                        localStorage.setItem("poke-shop:candy-large", 1)
                    } else {
                        localStorage.setItem("poke-shop:candy-large", parseInt(localStorage.getItem("poke-shop:candy-large"))+1)
                    }
                } else {
                    throw new Error("not enough money")
                }
            } catch (error) {
                contAnime = false
                alert("You don't have enough money!\nTo make more money, simply click on your Poke-Coins")
            }
        },
        scale: 3,
        opacity: 0,
        duration: 250,
        complete: function() {
            anime({
                targets: event.currentTarget.parentNode.parentNode.parentNode.children[0],
                scale: 1,
                opacity: 1,
                duration: 0
            })
        }
    })
})
$("#poke-candy-buy-xlarge").on("click", event => {
    event.preventDefault()
    anime({
        targets: event.currentTarget.parentNode.parentNode.parentNode.children[0],
        begin: function() {
            try {
                if (parseInt(document.getElementById("poke-coin-inv").innerText)>50) {
                    decreaseMoney(50)
                    if (localStorage.getItem("poke-shop:candy-xlarge")===null) {
                        localStorage.setItem("poke-shop:candy-xlarge", 1)
                    } else {
                        localStorage.setItem("poke-shop:candy-xlarge", parseInt(localStorage.getItem("poke-shop:candy-xlarge"))+1)
                    }
                } else {
                    throw new Error("not enough money")
                }
            } catch (error) {
                contAnime = false
                alert("You don't have enough money!\nTo make more money, simply click on your Poke-Coins")
            }
        },
        scale: 3,
        opacity: 0,
        duration: 250,
        complete: function() {
            anime({
                targets: event.currentTarget.parentNode.parentNode.parentNode.children[0],
                scale: 1,
                opacity: 1,
                duration: 0
            })
        }
    })
})

$("#poke-coin-inv").on("click", event => {
    increaseMoney()
})

$("#link-home").on("click", event => {
    event.preventDefault()
    location.assign("./index.html")
})



// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// Counter functions

function decreaseMoney(amount) {
    if (parseInt(document.getElementById("poke-coin-inv").innerText) >= amount) {
        console.log(parseInt(document.getElementById("poke-coin-inv").innerText));
        document.getElementById("poke-coin-inv").innerHTML = '<img src="./assets/images/pokecoin-logo.png" alt="pokecoin logo" class="" ></img>'+(parseInt(document.getElementById("poke-coin-inv").innerText) - amount)
        localStorage.setItem("poke-shop:coins", parseInt(document.getElementById("poke-coin-inv").innerText))
    }
}

function increaseMoney(incAmount=5) {
    let newCount = parseInt(document.getElementById("poke-coin-inv").innerText) + incAmount
    document.getElementById("poke-coin-inv").innerHTML = '<img src="./assets/images/pokecoin-logo.png" alt="pokecoin logo" class="" ></img>'+newCount;
    localStorage.setItem("poke-shop:coins", document.getElementById("poke-coin-inv").innerText)
}
