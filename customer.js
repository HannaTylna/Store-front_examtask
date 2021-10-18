(()=>{
    "use strict";

    const productsAPIURL = "https://mock-data-api.firebaseio.com/webb21/products.json";

    const totalShoppingSum = document.getElementById ("totalSum");
    const shoppingListContainer = document.getElementById("shoppingCartList");
    const productListContainer = document.getElementById("products");

    function createProductName(productItem){
        const elementName = document.createElement("h2");
        elementName.innerHTML = productItem.name;
        return elementName
    }

    function createProductImage(productItem){
        const elementImage = document.createElement("img");
        /* elementImage.setAttribute("data-price", productItem.price);
        elementImage.setAttribute("data-name", productItem.name);*/
        elementImage.src = productItem.images[0].src["small"];
        elementImage.alt = productItem.images[0]["alt"];
        return elementImage
    }

    /* function createEl(html){
        const el = document.createElement("p");
        el.innerHTML = html;
        return item;
    } */

    function createElementDescription(productItem){
        const elementDescription = document.createElement("p");
        elementDescription.innerHTML = productItem.description;
        return elementDescription
    }

    function createElementPrice(productItem){
        const elementPrice = document.createElement("p");
        elementPrice.innerHTML = `Price: ${productItem.price}`
        return elementPrice
    }

    function createElementRating(productItem){
        const elementRating = document.createElement("p");
        elementRating.innerHTML = `Rating: ${productItem.rating || "0"}`;
        return elementRating
    }

    function createElementStock(productItem){
        const elementStock = document.createElement("p");
        elementStock.innerHTML = `Stock: ${productItem.stock}`;
        return elementStock
    }

    function createButtonBuy(productItem){
        const button = document.createElement("button");
        /* button.setAttribute("style", "border: 0 / none"); */ // required if the image acts as a button
        
        button.innerText = "Buy"; // Not required if the image acts as a button

        button.addEventListener("click", () => {
            
            customer.addPurchase({name: productItem.name, price: productItem.price});
            customer.outputPurchaseInformation();
        })
        /* button.appendChild(createImageOfProduct(productItem)); */ // required if the image acts as a button
        
        return button
    }

    function renderProductItem(productItem){
        const productItemElement = document.createElement("div");
        productItemElement.setAttribute("data-rating", productItem.rating || 0);
        const br = document.createElement("br");

        productItemElement.appendChild(createProductName(productItem));
        /* productItemElement.appendChild(createButtonBuy(productItem)); */ // required if the image acts as a button
        productItemElement.appendChild(createProductImage(productItem)); // Not required if the image acts as a button
        productItemElement.appendChild(createElementDescription(productItem));
        productItemElement.appendChild(br);
        productItemElement.appendChild(createElementPrice(productItem));
        productItemElement.appendChild(createElementRating(productItem));
        productItemElement.appendChild(createElementStock(productItem));
        productItemElement.appendChild(createButtonBuy(productItem));  // Not required if the image acts as a button

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

    const totalSumParagragh = document.getElementById("totalSumParagragh");
    const header = document.getElementById("cartHeader");

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
            header.innerText = "Shopping cart";
            shoppingListParagragh.innerHTML += `${purchase.name} - ${purchase.price} <br> <br>`;
            
            totalSumParagragh.appendChild(header);
            shoppingListContainer.appendChild(shoppingListParagragh);
        }
    }

    const customer = new Customer();

})()

