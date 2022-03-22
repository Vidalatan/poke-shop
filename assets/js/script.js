var trainerName = document.getElementById("input-name");
var gymName = document.getElementById("input-gym");
var type = document.getElementById("input-type");
var savedGym = document.getElementById("saved-gym");
var letsGoBtn = document.querySelector("#first-time-popup-submit");
var input = document.querySelector(".form-control")
// save last trainer information 
function saveTrainerInfo() {

    var trainerInfo = {
        trainerName: trainerName.value,
        gymName: gymName.value,
        type: type.value,
    };
    localStorage.setItem("trainerInfo", JSON.stringify(trainerInfo));
}


function renderLastTrainer() {
    var lastTrainer = JSON.parse(localStorage.getItem("trainerInfo"));

    if (lastTrainer !== null) {
        document.getElementById("saved-gym").innerHTML = lastTrainer.gymName + " " + lastTrainer.type;
        document.getElementById("saved-name").innerHTML = lastTrainer.trainerName;
    } else {
        return;
    }
}


window.addEventListener("load", function () {
    if (localStorage.getItem("pokeHome:visited") === "true") {
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

letsGoBtn.addEventListener("click", function (event) {
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
    for (let index = 0; index < Object.keys(object).length - 2; index++) {
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
                complete: function (anim) {
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
                        $(event.currentTarget).attr("style", "pointer-events: initial;")
                    }
                })
            },
        })
    }
})

$("#poke-coin-inv").on("click", increaseMoney)

// $("<img>").attr("src", "./assets/images/pokecoin.png")

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



function increaseMoney() {
    console.log(document.getElementById("poke-coin-inv").innerText);
    let newCount = parseInt(document.getElementById("poke-coin-inv").innerText) + 5
    document.getElementById("poke-coin-inv").innerHTML = '<img src="./assets/images/pokecoin-logo.png" alt="pokecoin logo" class="" ></img>'+newCount;
    localStorage.setItem("poke-shop:coins", document.getElementById("poke-coin-inv").innerText)
}



