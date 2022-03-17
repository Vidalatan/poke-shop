window.addEventListener("load", function(){
    setTimeout(
        function open(event){
            document.querySelector(".popup").style.display = "block";
        },
        1000 
    )
});


document.querySelector("#first-time-popup-close").addEventListener("click", function(){
    document.querySelector(".popup").style.display = "none";
});


// fetch("https://pokemon-go1.p.rapidapi.com/pokemon_names.json", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "pokemon-go1.p.rapidapi.com",
// 		"x-rapidapi-key": "04a8eac5c0msh3aca5db7c42a8e3p196c9djsn168c1f1439af"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.error(err);
// });



function pokemonRequest(searchedName){
	var requestUrl = "https://pokemon-go1.p.rapidapi.com/pokemon_names.json"



	fetch(requestUrl, {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "pokemon-go1.p.rapidapi.com",
			"x-rapidapi-key": "04a8eac5c0msh3aca5db7c42a8e3p196c9djsn168c1f1439af"
		}
	})
	.then(response => {
		console.log(response);
		return response.json();


	})
	.then(namesData=>{
		console.log(namesData);
		var pokemonId = function(){
			for(index=0; index < Object.keys(namesData).length; index++){
				if(namesData[index].name.toLowerCase()===searchedName){
					return namesData[index].id;
				}
			}
		}
		var pokemonType = getPokemonType(pokemonId) 
		var pokemonRarity = getPokemonRarity(pokemonId) 
		
	})
	.catch(err => {
		console.error(err);
	});
}


function getPokemonType(pokemonId){
	fetch("https://pokemon-go1.p.rapidapi.com/pokemon_types.json", {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "pokemon-go1.p.rapidapi.com",
			"x-rapidapi-key": "04a8eac5c0msh3aca5db7c42a8e3p196c9djsn168c1f1439af"
		}
	})
	.then(response => {
		console.log(response);
		return response.json();


	})
	.then(typesData => {
		var arrayRestrictor = 2
		for(index=0;index<arrayRestrictor;index++){
			for(subindex=0;subindex<typesData[index][subindex].length;subindex++){
				if (typesData[index][subindex]["pokemon_id"]=== pokemonId){
					return typesData[index][subindex]["type"]
				}		
			}
		}
		
		
	})
}

// started get pokemon rarity funtion 

// function getPokemonRarity(pokemonId){
// 	fetch("https://pokemon-go1.p.rapidapi.com/pokemon_rarity.json", {
// 		"method": "GET",
// 		"headers": {
// 			"x-rapidapi-host": "pokemon-go1.p.rapidapi.com",
// 			"x-rapidapi-key": "04a8eac5c0msh3aca5db7c42a8e3p196c9djsn168c1f1439af"
// 		}
// 	})
// 	.then(response => {
// 		console.log(response);
// 		return response.json();


// 	})
// 	.then(rarityData=>{

// 	})
// }
