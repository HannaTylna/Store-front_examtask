(()=>{
    "use strict";

    const productsAPIURL = "https://mock-data-api.firebaseio.com/webb21/products.json";

    const totalSum = document.getElementById("totalSum");
    const totalSumParagragh = document.getElementById("totalSumParagragh");
    const cartHeader = document.getElementById("cartHeader");
    const shoppingListContainer = document.getElementById("shoppingCartList");
    const productListContainer = document.getElementById("products");

    function createEl(html,idName){
        const el = document.createElement("p");
        el.setAttribute("class", idName);
        el.innerHTML = html;
        return el;
    } 

    function createElementDescription(productItem){
        const idName = "productDescription";
        return createEl(productItem.description, idName);
    }

    function createElementPrice(productItem){
        const idName = "productPrice";
        const elPrice = `Price: ${productItem.price}`;
        return createEl(elPrice, idName);
    }

    function createElementRating(productItem){
        const idName = "productRating";
        const elRating = `Rating: ${productItem.rating || "0"}`;
        return createEl(elRating, idName);
    }

    function createElementStock(productItem){
        const idName = "productStock";
        const elStock = `Stock: ${productItem.stock}`;
        return createEl(elStock, idName);
    }

    function createProductName(productItem){
        const elName = document.createElement("h2");
        elName.setAttribute("class", "productName");
        elName.innerHTML = productItem.name;
        return elName
    }


    function clickOn (html, productItem){
        html.addEventListener("click", () =>{
            if(productItem.stock > 0){
                cartHeader.innerText = "Shopping cart";
                cartHeader.style="align-items: center; display: flex; justify-content: center; align-items: center";
                customer.addPurchase({name: productItem.name, price: productItem.price});
                customer.outputPurchaseInformation();
            } else {
                alert("The product of stock out.")
            }
        })
    }

    function createProductImage(productItem){
        const elImage = document.createElement("img");
        elImage.setAttribute("class", "productImage");
        elImage.src = productItem.images[0].src["small"];
        elImage.alt = productItem.images[0]["alt"];
        elImage.width = "400";

        clickOn(elImage, productItem);
        
        return elImage
    }

    function createButtonBuy(productItem){
        const button = document.createElement("button");
        button.innerText = "Buy"; 

        clickOn(button, productItem);
        
        return button
    }

    function renderProductItem(productItem){
        const productItemElement = document.createElement("div");
        productItemElement.setAttribute("class", "product");
        productItemElement.setAttribute("data-rating", productItem.rating || 0);
        const br = document.createElement("br");
        const hr = document.createElement("hr");

        productItemElement.appendChild(createProductName(productItem));
        productItemElement.appendChild(createProductImage(productItem)); 
        productItemElement.appendChild(createElementDescription(productItem));
        productItemElement.appendChild(br);
        productItemElement.appendChild(createElementPrice(productItem));
        productItemElement.appendChild(createElementRating(productItem));
        productItemElement.appendChild(createElementStock(productItem));
        productItemElement.appendChild(createButtonBuy(productItem));
        productItemElement.appendChild(hr);

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
            shoppingListParagragh.innerHTML += `${purchase.name} - ${purchase.price} <br>`;
            
            totalSum.appendChild(totalSumParagragh);
            shoppingListContainer.appendChild(shoppingListParagragh);
        }
    }

    const customer = new Customer();

})()