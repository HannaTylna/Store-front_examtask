(()=>{
    "use strict";
    
    const ratingInput = document.getElementById("rating");
    const ratingButton = document.getElementById("ratingBtn");

    ratingButton.addEventListener("click", () => {
        const ratingInputValue = parseInt(ratingInput.value);
        const ratings = document.querySelectorAll("[data-rating]");
        if(ratingInputValue > 0 && ratingInputValue <= 5) {
            ratings.forEach(rating => {
                rating.style.display = parseFloat(rating.getAttribute("data-rating")) >= ratingInputValue ? "" : "none";
                
            })
        } else {
            alert("Please enter a value from 0 to 5!")
        }
    });

})()