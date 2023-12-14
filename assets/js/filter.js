const filteredData = document.querySelector('.filteredData');
const filterForm = document.querySelector('#filterForm');
const brandList = document.querySelector('#brand-list');
const categoryList = document.querySelector('#category-list');

let products;

function render({brand = "", category = ""}) {
    filteredData.innerHTML = 
    products.filter(x => x.brand.includes(brand) && x.category.includes(category)).map(
        product => 
        `<li>${product.title}</li>`
    ).join('')
    
    const brands = new Set(products.map(x => `<option>${x.brand}</option>`));
    brandList.innerHTML = Array.from(brands).join('');

    const categories =  new Set(products.map(x => `<option>${x.category}</option>`));
    categoryList.innerHTML = Array.from(categories).join('');
}

function handleFilterFormSubmit(e) {
    e.preventDefault();
    const filterData = Object.fromEntries(new FormData(filterForm));
    render(filterData);
}

async function init() {
    const data = await fetch('https://dummyjson.com/products?limit=100').then(r => r.json())
    products = data.products;
    render({});

    filterForm.addEventListener('submit', handleFilterFormSubmit)
}

init();
