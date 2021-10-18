(()=>{
    "use strict";
    
    const ratingInput = document.getElementById("rating");
    const ratingButton = document.getElementById("ratingBtn");

    ratingButton.addEventListener("click", () => {
        const ratingInputValue = parseInt(ratingInput.value);
        const ratings = document.querySelectorAll("[data-rating]");
        ratings.forEach(rating => {
            rating.style.display = parseFloat(rating.getAttribute("data-rating")) >= ratingInputValue ? "" : "none";
            
        })
    });

})()