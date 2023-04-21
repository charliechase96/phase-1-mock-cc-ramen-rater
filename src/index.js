// write your code here
document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/ramens")
    .then(response => response.json())
    .then(data => data.forEach(renderRamen))

    function renderRamen(ramens) {
        let ramenMenu = document.getElementById("ramen-menu");
        let ramenImg = document.createElement("img");
        ramenImg.src = `${ramens.image}`;
        ramenImg.id = `${ramens.id}`;
        ramenMenu.appendChild(ramenImg);

        ramenImg.addEventListener("click", () => updateRamenDetails(event));

        function updateRamenDetails(event) {
            let ramen = event.target;

            const name = document.querySelector(".name");
            const restaurant = document.querySelector(".restaurant");
            const image = document.querySelector(".detail-image");
            const rating = document.getElementById("rating-display");
            const comment = document.getElementById("comment-display");

            image.src = ramen.src;
            name.textContent = `${ramens.name}`;
            restaurant.textContent = `${ramens.restaurant}`;
            rating.textContent = `${ramens.rating}`;
            comment.textContent = `${ramens.comment}`;
        }

    }

    const ramenForm = document.getElementById("new-ramen");

    ramenForm.addEventListener("submit", () => addNewRamen(event));

    function addNewRamen(event) {
        event.preventDefault();
        const name = document.getElementById("new-name").value;
        const restaurant = document.getElementById("new-restaurant").value;
        const image = document.getElementById("new-image").value;
        const rating = document.getElementById("new-rating").value;
        const comment = document.getElementById("new-comment").value;

        const ramenObj = {
            "name": name,
            "restaurant": restaurant,
            "image": image,
            "rating": rating,
            "comment": comment
        }
        
        fetch("http://localhost:3000/ramens", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ramenObj)
        })
        .then(response => response.json())
        .then(data => renderRamen(data))
    }
})
