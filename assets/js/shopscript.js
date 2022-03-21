


// Add more logic based code above
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Animation area

$(".poke-buy-btn").on("click", event => {
    event.preventDefault()

    anime({
        targets: event.currentTarget.parentNode.parentNode.previousElementSibling,
        begin: function(anim) {
            // Reset all of this upon animation's full completion
            $(event.currentTarget.parentNode.parentNode.parentNode).prop("style", "width: 15rem; height: 25rem; z-index: 10; position: relative;")
            $(".poke-buy-btn").attr("style", "pointer-events: none;")
            $("body").prepend($("<div>").attr("id", "masking-div").attr("style", "position: fixed; background-color: black; width: 100%; height: 100%; z-index: 10; opacity: 50%;"))
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
                    $("#poke-cards-container").append($("<img>")
                                .attr("id", "random-pokemon")
                                .attr("src", "https://img.pokemondb.net/sprites/sword-shield/icon/pikachu.png")  // Currently only using pikachu to test
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

// $(".poke-buy-btn").attr("style", "pointer-events: initial;")