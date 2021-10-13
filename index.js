const productsAPIURL = "https://mock-data-api.firebaseio.com/webb21/products.json";
const productContainer = document.getElementById("products");

function createNameOfProduct(productItem){
    const nameOfElement = document.createElement("h2");
    nameOfElement.setAttribute('id', 'name');
    nameOfElement.innerHTML = productItem.name;
    return nameOfElement
}

function createImageOfProduct(productItem){
    const imageOfElement = document.createElement("img");
    imageOfElement.setAttribute('id', 'image');
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
    priceOfElement.setAttribute('id', 'price');
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

function renderProductItem(productItem){
    const productItemElement = document.createElement("div");
    const br = document.createElement("br")

    productItemElement.appendChild(createNameOfProduct(productItem));
    productItemElement.appendChild(createImageOfProduct(productItem));
    productItemElement.appendChild(createDescriptionOfElement(productItem));
    productItemElement.appendChild(br);
    productItemElement.appendChild(createPriceOfElement(productItem));
    productItemElement.appendChild(createRatingOfElement(productItem));
    productItemElement.appendChild(createStockOfElement(productItem));

    productContainer.appendChild(productItemElement);
}

function renderProductList(data) {
    data.forEach(productItem => {
        renderProductItem(productItem);
    })
}

function getProductData (){
    /* productContainer.innerHTML = ""; */
    fetch(productsAPIURL)
    .then(res => res.json())
    .then(data => {
        renderProductList(data);
    })
}

getProductData();

class Customer{
    constructor(){
        this.transactions = [];
    }
    addTransaction(){
        this.transactions.push(transactionObject);
    }
    getTotalSpent(){
        let sum = 0;
        this.transactions.forEach(transaction =>{
            sum += transaction.total;
        })
        return sum
    }
    update
}

const customer = new Customer();
const imageButton = document.getElementById("image");


imageButton.addEventListener("click", () => {
    const price = productItem.price;
    let total = 0;
    total += parseInt(price);
})