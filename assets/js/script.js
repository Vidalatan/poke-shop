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

letsGoBtn.addEventListener("click", function(event){
	event.preventDefault();
    
	localStorage.setItem("pokeHome:visited", "true");
	
	saveTrainerInfo();
	renderLastTrainer();
	// document.getElementById("trainer-form").reset();
	document.getElementById("trainer-form").style.display = "none";
    document.getElementById("backgroundReset").style.display = "none";
    
	
 
 });


function turnObjToArray(object) {
    let newArray = []
    for (let index = 0; index < Object.keys(object).length-2; index++) {
        console.log(newArray);
        newArray.push(object[index])
    }
    return newArray
}


$(".sell-pkm-btn").on("click", event => {
    event.preventDefault()
    anime({
        targets: event.currentTarget.parentNode.parentNode.parentNode,
        keyframes: [
            {
                zIndex: 100,
                duration: 0
            },
            {   
                translateX: (window.innerWidth/2)-event.currentTarget.parentNode.parentNode.parentNode.getBoundingClientRect().x-160,
                translateY: (window.innerHeight/2)-event.currentTarget.parentNode.parentNode.parentNode.getBoundingClientRect().y-250,
                scale: 1.5,
                duration: 2000
            },
            {
                translateX: window.innerWidth-event.currentTarget.parentNode.parentNode.parentNode.getBoundingClientRect().x-160,
                translateY: -(window.innerHeight-400),
                opacity: 0,
                easing: 'cubicBezier(1, 0, 1, 1)',
                duration: 1000
            }
        ],
        complete: function(anim) {
            $("#anime-pokecoin-sell").remove()
            event.currentTarget.parentNode.parentNode.parentNode.remove()
            let totalPokecoins = 8;    // Set how many coins to create.
            $("body").append($("<div>").attr("id", "anime-pokecoin-sell").attr("style", "display: flex; justify-content: end; position: fixed; z-index: 100; top: 0px; right: 0px; width: 5%; height: 5%; opacity: 1;")
            .append( () => {
                let pokeCoinImageArray = []
                for (let index = 0; index < totalPokecoins; index++) {
                    pokeCoinImageArray.push($("<img>").attr("src", "./assets/images/pokecoin.png").attr("style", "position: absolute; width: 32px; height: 32px;"))
                }
                return pokeCoinImageArray
            }))
            anime({
                targets: turnObjToArray($("#anime-pokecoin-sell").children()),
                translateX: anime.stagger(-35, {grid: [Math.sqrt(totalPokecoins),Math.sqrt(totalPokecoins)], axis: "x"}),
                translateY: anime.stagger(35, {grid: [Math.sqrt(totalPokecoins),Math.sqrt(totalPokecoins)], axis: "y"}),
                opacity: 0,
                duration: 1000,
                easing: "easeInOutQuad",
                complete: function(anim) {
                    if ($("#anime-pokecoin-sell")) {
                        return
                    } else {
                        $("#anime-pokecoin-sell").remove()
                    }
                }
            })
        }
    })
})

$(".feed-pkm-btn").on("click", event => {
    event.preventDefault()
    console.log(event.currentTarget);
    anime({
        targets: [event.currentTarget.children[0]],
        translateY: -200,
        opacity: 0,
        easing: "cubicBezier(1, 0, .75, 1)",
        duration: 1000,
        begin: function(anim) {
            $(event.currentTarget).attr("style", "pointer-events: none;")
        },
        complete: function(anim) {
            anime({
                targets: event.currentTarget.children[0],
                translateY: 0,
                opacity: 1,
                duration: 0,
                complete: function(anim) {
                    $(event.currentTarget).attr("style", "pointer-events: initial;")
                }
            })
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



