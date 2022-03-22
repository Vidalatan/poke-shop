var trainerName = document.getElementById("input-name");
var gymName = document.getElementById("input-gym");
var type = document.getElementById("input-type");
var savedGym = document.getElementById("saved-gym");
var letsGoBtn = document.querySelector("#first-time-popup-submit");
var input = document.querySelector(".form-control")

if (localStorage["poke-shop:coins"]) {
    localStorage.setItem("poke-shop:coins", location.search.substring(2,location.search.indexOf("&purchases=")))
}
document.getElementById("poke-coin-inv").innerHTML = '<img src="./assets/images/pokecoin-logo.png" alt="pokecoin logo" class="" >' + localStorage.getItem("poke-shop:coins")
loadPokemon();

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
    document.getElementById("poke-coin-inv").innerHTML = '<img src="./assets/images/pokecoin-logo.png" alt="pokecoin logo" class="" >'+500
});

function turnObjToArray(object) {
    let newArray = []
    for (let index = 0; index < Object.keys(object).length - 2; index++) {
        newArray.push(object[index])
    }
    return newArray
}

function loadPokemon() {
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

    for (item in localStorage) {
        if (item.includes("poke-shop:!")) {
            checkDouble = () => {
                if(JSON.parse(localStorage[item]).type.length === 2) {
                    console.log(JSON.parse(localStorage[item]).type.length);
                    return JSON.parse(localStorage[item]).type[1]
                } else {
                    return JSON.parse(localStorage[item]).type[0]
                }
            }
            console.log(JSON.parse(localStorage[item]).imgURL);
            $("#poke-cards-container").append($("<div>").addClass("card m-1 mb-3 d-inline-block").attr("id", "poke-info-card").attr("style", "width: 12rem; height: 24rem;")
                .append($("<img>").addClass("card-img-top").attr("src", "https://"+JSON.parse(localStorage[item]).imgURL).attr("alt", JSON.parse(localStorage[item]).givenName+"-Pokemon Inventory Card Image"))
                .append($("<div>").addClass("card-body")
                    .append($("<h5>").addClass("card-title").text(JSON.parse(localStorage[item]).givenName))
                    .append($("<p>").addClass("card-text").text(JSON.parse(localStorage[item]).name))
                    .append($("<p>").addClass("card-text").text(JSON.parse(localStorage[item]).type[0]+","))
                    .append($("<p>").addClass("card-text").text(checkDouble()))
                    .append($("<p>").addClass("card-text").text(JSON.parse(localStorage[item]).rarity))
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
}


$(".sell-pkm-btn").on("click", event => {
    event.preventDefault()
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
                complete: function() {
                    switch (event.currentTarget.parentNode.parentNode.children[4].innerText) {
                        case "Standard":
                            increaseMoney(2)
                            break;
                        case "Legendary":
                            increaseMoney(125)
                            break;
                        case "Mythic":
                            increaseMoney(250)
                            break;
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
})

console.log(document.getElementById("poke-coin-inv").innerText);

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