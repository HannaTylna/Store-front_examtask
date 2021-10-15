const productsAPIURL = "https://mock-data-api.firebaseio.com/webb21/products.json";
const total = document.getElementById ("total");
const shoppingContainer = document.getElementById("shoppingCart");
const productContainer = document.getElementById("products");

const totalParagragh = document.createElement("p");
const header = document.createElement("h3");
const purchaseParagragh = document.createElement("p");

totalParagragh.innerHTML = "Total: 0";
header.innerText = "";
purchaseParagragh.innerText = "";

total.appendChild(totalParagragh);


function createNameOfProduct(productItem){
    const nameOfElement = document.createElement("h2");
    /* nameOfElement.setAttribute('id', 'name'); */
    nameOfElement.innerHTML = productItem.name;
    return nameOfElement
}

function createImageOfProduct(productItem){
    const imageOfElement = document.createElement("img");
    imageOfElement.setAttribute('id', 'image');
    imageOfElement.setAttribute('data-price', productItem.price);
    imageOfElement.setAttribute('data-name', productItem.name);
    imageOfElement.src = productItem.images[0].src["small"];
    imageOfElement.alt = productItem.images[0]["alt"];
    return imageOfElement
}

function createDescriptionOfElement(productItem){
    const descriptionOfElement = document.createElement("p");
    descriptionOfElement.innerHTML = productItem.description;
    return descriptionOfElement
}

function createPriceOfElement(productItem){
    const priceOfElement = document.createElement("p");
    /* priceOfElement.setAttribute('id', 'price'); */
    priceOfElement.innerHTML = `Price: ${productItem.price}`
    return priceOfElement
}

function createRatingOfElement(productItem){
    const ratingOfElement = document.createElement("p");
    ratingOfElement.innerHTML = `Raiting: ${productItem.rating || "No information"}`;
    return ratingOfElement
}

function createStockOfElement(productItem){
    const stockOfElement = document.createElement("p");
    stockOfElement.innerHTML = `Stock: ${productItem.stock}`;
    return stockOfElement
}

function createButtonBuy(productItem){
    const button = document.createElement("button");
    button.innerText = "Buy";

    button.addEventListener("click", () => {
        customer.addPurchase({name: productItem.name, price: productItem.price});
        customer.outputPurchaseInformation();
    })

    return button
}

function renderProductItem(productItem){
    const productItemElement = document.createElement("div");
    const br = document.createElement("br");

    productItemElement.appendChild(createNameOfProduct(productItem));
    productItemElement.appendChild(createImageOfProduct(productItem));
    productItemElement.appendChild(createDescriptionOfElement(productItem));
    productItemElement.appendChild(br);
    productItemElement.appendChild(createPriceOfElement(productItem));
    productItemElement.appendChild(createRatingOfElement(productItem));
    productItemElement.appendChild(createStockOfElement(productItem));
    productItemElement.appendChild(createButtonBuy(productItem));

    productContainer.appendChild(productItemElement);
}

function renderProductList(data) {
    data.forEach(productItem => {
        renderProductItem(productItem);
    })
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
        const purchase = this.getLatestPurchase();

        totalParagragh.innerHTML = `Total: ${this.getTotalSpent()}`
        header.innerText = "Cart";
        purchaseParagragh.innerHTML = purchaseParagragh.innerHTML + `${purchase.name} - ${purchase.price} <br> <br>`;
        
        totalParagragh.appendChild(header);
        shoppingContainer.appendChild(purchaseParagragh);
    }
}

const customer = new Customer();


