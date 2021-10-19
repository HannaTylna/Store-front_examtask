(()=>{
    "use strict";

    const productsAPIURL = "https://mock-data-api.firebaseio.com/webb21/products.json";

    const totalSum = document.getElementById("totalSum");
    const totalSumParagragh = document.getElementById("totalSumParagragh");
    const cartHeader = document.getElementById("cartHeader");
    const shoppingListContainer = document.getElementById("shoppingCartList");
    const productListContainer = document.getElementById("products");

    function createProductName(productItem){
        const elName = document.createElement("h2");
        elName.innerHTML = productItem.name;
        return elName
    }

    function createProductImage(productItem){
        const elImage = document.createElement("img");
        elImage.src = productItem.images[0].src["small"];
        elImage.alt = productItem.images[0]["alt"];
        return elImage
    }

    function createEl(html){
        const el = document.createElement("p");
        el.innerHTML = html;
        return el;
    } 

    function createElementDescription(productItem){
        return createEl(productItem.description);
    }

    function createElementPrice(productItem){
        const elPrice = `Price: ${productItem.price}`;
        return createEl(elPrice);
    }

    function createElementRating(productItem){
        const elRating = `Rating: ${productItem.rating || "0"}`;
        return createEl(elRating);
    }

    function createElementStock(productItem){
        const elStock = `Stock: ${productItem.stock}`;
        return createEl(elStock);
    }

    function createButtonBuy(productItem){
        const button = document.createElement("button");
        /* button.setAttribute("style", "border-style: none"); */ // required if the image acts as a button
        button.innerText = "Buy"; // Not required if the image acts as a button

        button.addEventListener("click", () => {
            cartHeader.innerText = "Shopping cart";
            if(productItem.stock > 0)
            customer.addPurchase({name: productItem.name, price: productItem.price});
            customer.outputPurchaseInformation();
        })
        /* button.appendChild(createProductImage(productItem)); */ // required if the image acts as a button
        
        return button
    }

    function renderProductItem(productItem){
        const productItemElement = document.createElement("div");
        productItemElement.setAttribute("data-rating", productItem.rating || 0);
        const br = document.createElement("br");

        productItemElement.appendChild(createProductName(productItem));
        /* productItemElement.appendChild(createButtonBuy(productItem));  */// required if the image acts as a button
        productItemElement.appendChild(createProductImage(productItem)); // Not required if the image acts as a button
        productItemElement.appendChild(createElementDescription(productItem));
        productItemElement.appendChild(br);
        productItemElement.appendChild(createElementPrice(productItem));
        productItemElement.appendChild(createElementRating(productItem));
        productItemElement.appendChild(createElementStock(productItem));
        productItemElement.appendChild(createButtonBuy(productItem));// Not required if the image acts as a button

        productListContainer.appendChild(productItemElement);
    }

    function renderProductList(data) {
        data.forEach(productItem => renderProductItem(productItem))
    }

    function getProductData (){
        fetch(productsAPIURL)
        .then(res => res.json())
        .then(data => {
            renderProductList(data);
        })
    }

    getProductData();

    class Customer{
        constructor(){
            this.purchases = [];
            this.total = 0;
        }

        addPurchase(purchaseObject){
            this.purchases.push(purchaseObject);
        }
        
        getTotalSpent(){
            let total = 0;
            this.purchases.forEach(purchase => {
                total += purchase.price;
            })
            return total
        }

        getLatestPurchase(){
            return this.purchases[this.purchases.length - 1]
        }
        
        outputPurchaseInformation(){
            const shoppingListParagragh = document.createElement("li");
            const purchase = this.getLatestPurchase();

            totalSumParagragh.innerHTML = `Total: ${this.getTotalSpent()}`
            shoppingListParagragh.innerHTML += `${purchase.name} - ${purchase.price} <br> <br>`;
            
            totalSum.appendChild(totalSumParagragh);
            shoppingListContainer.appendChild(shoppingListParagragh);
        }
    }

    const customer = new Customer();

})()

