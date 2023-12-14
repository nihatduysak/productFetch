const container = document.querySelector('.container');
const productsList = document.querySelector('.products');
const showMoreBtn = document.querySelector('.plusBtn');
const showComment = document.querySelectorAll('.showComment');

let products = [];
let limit = 20;

async function fetchProduct(){
    const productList = await fetch(`https://dummyjson.com/products?limit=${limit}`).then(r => r.json())

    products = productList.products

    renderProduct();
}

function limitUp() {

    if(limit <= 100) {

        limit += 10;
        fetchProduct();
        return limit;
    } 
    alert('Gösterilecek ürün kalmadı :(')
}

function renderProduct() {
    container.innerHTML = '';
    products.map(item => {
        container.innerHTML += `
            <div class="products">
                <img src=${item.thumbnail} alt="">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>`
    })
}

function bindEvents() {
showMoreBtn.addEventListener('click', limitUp);

}

function init() {
    fetchProduct();
    renderProduct();
    bindEvents();
}

init();