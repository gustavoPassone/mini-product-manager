const form = document.getElementById('productForm');
const productList = document.querySelector('.cards-grid');
let products = JSON.parse(localStorage.getItem('products')) || [];

// Renderiza produtos salvos ao carregar
products.forEach(renderProduct);

form.addEventListener('submit', e => {
  e.preventDefault();

  const file = document.getElementById('pImage').files[0];
  if (!file) return alert('Selecione uma imagem');

  const reader = new FileReader();
  reader.onload = function (event) {
    const product = {
      image: event.target.result,
      name: document.getElementById('pName').value.trim(),
      price: document.getElementById('pPreco').value.trim(),
      description: document.getElementById('pDesc').value.trim()
    };

    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));

    renderProduct(product);
    form.reset();
  };
  reader.readAsDataURL(file);
});

function renderProduct(product) {
  const card = document.createElement('div');
  card.classList.add('product-card');

  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" class="product-img">
    <div class="product-info">
      <p class="product-name">${product.name}</p>
      <p class="product-price">R$ ${Number(product.price).toFixed(2)}</p>
      <p class="product-desc">${product.description}</p>
    </div>
  `;

  productList.appendChild(card);
}