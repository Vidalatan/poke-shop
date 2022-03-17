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