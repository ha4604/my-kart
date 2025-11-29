// PRODUCT DATA (you can add more)
const products = [
  {
    id: 1,
    name: "Samsung Galaxy S23 5G",
    brand: "Samsung",
    category: "Mobiles",
    price: 54999,
    originalPrice: 74999,
    discount: "26% off",
    rating: 4.5,
    description: "Flagship 5G smartphone with dynamic AMOLED display and pro-grade camera.",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Redmi Note 13 Pro",
    brand: "Redmi",
    category: "Mobiles",
    price: 18999,
    originalPrice: 22999,
    discount: "17% off",
    rating: 4.3,
    description: "Powerful mid-range phone with 120Hz display and fast charging.",
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Apple MacBook Air M2",
    brand: "Apple",
    category: "Electronics",
    price: 104999,
    originalPrice: 119900,
    discount: "12% off",
    rating: 4.8,
    description: "Ultra-thin laptop with Apple M2 chip and all-day battery life.",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Sony WH-1000XM5 Headphones",
    brand: "Sony",
    category: "Electronics",
    price: 25999,
    originalPrice: 32999,
    discount: "21% off",
    rating: 4.7,
    description: "Industry-leading noise cancelling wireless over-ear headphones.",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "Men's Running Shoes",
    brand: "Nike",
    category: "Fashion",
    price: 2999,
    originalPrice: 4999,
    discount: "40% off",
    rating: 4.2,
    description: "Comfortable and lightweight running shoes for everyday use.",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "Women's Stylish Handbag",
    brand: "Lavie",
    category: "Fashion",
    price: 1499,
    originalPrice: 2999,
    discount: "50% off",
    rating: 4.1,
    description: "Trendy handbag with spacious compartments and premium finish.",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 7,
    name: "Wooden Study Table",
    brand: "HomeCraft",
    category: "Home",
    price: 4999,
    originalPrice: 8999,
    discount: "44% off",
    rating: 4.0,
    description: "Strong wooden table suitable for study and work from home.",
    image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 8,
    name: "Cotton Double Bedsheet",
    brand: "Bombay Dyeing",
    category: "Home",
    price: 999,
    originalPrice: 1999,
    discount: "50% off",
    rating: 4.3,
    description: "Soft cotton bedsheet with two pillow covers.",
    image:
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 9,
    name: "Daily Essentials Combo Pack",
    brand: "SmartKart",
    category: "Grocery",
    price: 699,
    originalPrice: 999,
    discount: "30% off",
    rating: 4.1,
    description: "Combo of pulses, rice, oil and masalas for monthly needs.",
    image:
      "https://images.unsplash.com/photo-1515446134809-993c501ca304?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 10,
    name: "Amul Butter 500g",
    brand: "Amul",
    category: "Grocery",
    price: 265,
    originalPrice: 290,
    discount: "9% off",
    rating: 4.6,
    description: "Rich and creamy butter pack.",
    image:
      "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&w=600&q=80",
  },
];

// STATE
let filteredProducts = [...products];
let cart = [];

// HELPERS
function saveCart() {
  localStorage.setItem("mykart-cart", JSON.stringify(cart));
}

function loadCart() {
  const data = localStorage.getItem("mykart-cart");
  if (data) {
    cart = JSON.parse(data);
  } else {
    cart = [];
  }
}

// RENDER PRODUCTS
function renderProducts(list) {
  const grid = document.getElementById("productGrid");
  const countEl = document.getElementById("productCount");
  grid.innerHTML = "";
  countEl.textContent = list.length;

  if (!list.length) {
    grid.innerHTML = "<p>No products found. Try changing filters or search.</p>";
    return;
  }

  list.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-image-wrapper">
        <img src="${product.image}" alt="${product.name}" />
      </div>
      <div class="product-name">${product.name}</div>
      <div class="product-brand">${product.brand}</div>
      <div class="product-price-row">
        <span class="product-price">₹${product.price}</span>
        <span class="product-original-price">₹${product.originalPrice}</span>
        <span class="product-discount">${product.discount}</span>
      </div>
      <div class="product-rating">${product.rating} ★</div>
      <div class="card-bottom-row">
        <span style="font-size:0.78rem; color:#555;">${product.category}</span>
        <button class="add-to-cart-btn" data-id="${product.id}">ADD</button>
      </div>
    `;

    // card click -> open modal
    card.addEventListener("click", (e) => {
      // if click is on ADD button, handle separately in below listener
      if (e.target.matches(".add-to-cart-btn")) return;
      openProductModal(product.id);
    });

    grid.appendChild(card);
  });

  // Add-to-cart button listeners
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // stop card click
      const id = parseInt(btn.getAttribute("data-id"), 10);
      addToCart(id);
    });
  });
}

// CART LOGIC
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, qty: 1 });
  }

  saveCart();
  updateCartUI();
}

function changeQty(productId, delta) {
  const item = cart.find((c) => c.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter((c) => c.id !== productId);
  }
  saveCart();
  updateCartUI();
}

function removeFromCart(productId) {
  cart = cart.filter((c) => c.id !== productId);
  saveCart();
  updateCartUI();
}

function updateCartUI() {
  const cartCountEl = document.getElementById("cartCount");
  const cartItemsEl = document.getElementById("cartItems");
  const cartItemCountEl = document.getElementById("cartItemCount");
  const cartSubtotalEl = document.getElementById("cartSubtotal");
  const cartDeliveryEl = document.getElementById("cartDelivery");
  const cartTotalEl = document.getElementById("cartTotal");

  let totalItems = 0;
  let subtotal = 0;

  cartItemsEl.innerHTML = "";

  cart.forEach((item) => {
    const product = products.find((p) => p.id === item.id);
    if (!product) return;

    totalItems += item.qty;
    subtotal += product.price * item.qty;

    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <div class="cart-item-img">
        <img src="${product.image}" alt="${product.name}" />
      </div>
      <div class="cart-item-main">
        <div class="cart-item-title">${product.name}</div>
        <div class="cart-item-price-row">
          <span class="product-price">₹${product.price * item.qty}</span>
          <span class="product-original-price">₹${product.originalPrice}</span>
        </div>
        <div class="cart-item-actions">
          <div class="qty-controls">
            <button class="qty-btn" data-action="dec" data-id="${product.id}">-</button>
            <span>${item.qty}</span>
            <button class="qty-btn" data-action="inc" data-id="${product.id}">+</button>
          </div>
          <button class="remove-btn" data-id="${product.id}">Remove</button>
        </div>
      </div>
    `;
    cartItemsEl.appendChild(row);
  });

  // Delivery logic: free above 500
  const delivery = subtotal === 0 ? 0 : subtotal >= 500 ? 0 : 49;
  const total = subtotal + delivery;

  cartCountEl.textContent = totalItems;
  cartItemCountEl.textContent = totalItems;
  cartSubtotalEl.textContent = subtotal;
  cartDeliveryEl.textContent = delivery;
  cartTotalEl.textContent = total;

  // Add listeners for qty buttons and remove
  document.querySelectorAll(".qty-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.getAttribute("data-id"), 10);
      const action = btn.getAttribute("data-action");
      changeQty(id, action === "inc" ? 1 : -1);
    });
  });

  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.getAttribute("data-id"), 10);
      removeFromCart(id);
    });
  });
}

// CART DRAWER & OVERLAY
function openCart() {
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("overlay").classList.add("show");
}

function closeCart() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("overlay").classList.remove("show");
}

// PRODUCT MODAL
function openProductModal(id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;

  document.getElementById("modalImage").src = product.image;
  document.getElementById("modalName").textContent = product.name;
  document.getElementById("modalBrand").textContent = product.brand;
  document.getElementById("modalRating").textContent = `${product.rating} ★`;
  document.getElementById("modalCategory").textContent = product.category;
  document.getElementById("modalPrice").textContent = `₹${product.price}`;
  document.getElementById("modalOriginalPrice").textContent = `₹${product.originalPrice}`;
  document.getElementById("modalDiscount").textContent = product.discount;
  document.getElementById("modalDescription").textContent = product.description;

  const addBtn = document.getElementById("modalAddToCartBtn");
  addBtn.setAttribute("data-id", product.id);

  document.getElementById("productModal").classList.add("show");
  document.getElementById("overlay").classList.add("show");
}

function closeProductModal() {
  document.getElementById("productModal").classList.remove("show");
  document.getElementById("overlay").classList.remove("show");
}

// SEARCH & FILTERS
function applyFilters() {
  const searchValue = document.getElementById("searchInput").value.trim().toLowerCase();
  const categoryValue = document.getElementById("categoryFilter").value;
  const ratingValue = parseFloat(document.getElementById("ratingFilter").value);
  const minPrice = parseInt(document.getElementById("minPrice").value || "0", 10);
  const maxPrice = parseInt(document.getElementById("maxPrice").value || "999999999", 10);
  const sortValue = document.getElementById("sortSelect").value;

  let list = products.filter((p) => {
    const matchesSearch =
      !searchValue ||
      p.name.toLowerCase().includes(searchValue) ||
      p.brand.toLowerCase().includes(searchValue) ||
      p.category.toLowerCase().includes(searchValue);

    const matchesCategory = categoryValue === "ALL" || p.category === categoryValue;
    const matchesRating = p.rating >= ratingValue;
    const matchesPrice = p.price >= minPrice && p.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesRating && matchesPrice;
  });

  // Sorting
  if (sortValue === "lowToHigh") {
    list.sort((a, b) => a.price - b.price);
  } else if (sortValue === "highToLow") {
    list.sort((a, b) => b.price - a.price);
  } else if (sortValue === "ratingHigh") {
    list.sort((a, b) => b.rating - a.rating);
  }

  filteredProducts = list;
  renderProducts(filteredProducts);
}

function clearFilters() {
  document.getElementById("searchInput").value = "";
  document.getElementById("categoryFilter").value = "ALL";
  document.getElementById("ratingFilter").value = "0";
  document.getElementById("minPrice").value = "";
  document.getElementById("maxPrice").value = "";
  document.getElementById("sortSelect").value = "relevance";

  // Remove category bar active
  document.querySelectorAll(".category-item").forEach((el) => el.classList.remove("active"));

  filteredProducts = [...products];
  renderProducts(filteredProducts);
}

// INIT
document.addEventListener("DOMContentLoaded", () => {
  // load cart from storage
  loadCart();
  updateCartUI();

  // initial products
  renderProducts(filteredProducts);

  // search
  document.getElementById("searchBtn").addEventListener("click", applyFilters);
  document.getElementById("searchInput").addEventListener("keyup", (e) => {
    if (e.key === "Enter") applyFilters();
  });

  // filters
  document.getElementById("categoryFilter").addEventListener("change", applyFilters);
  document.getElementById("ratingFilter").addEventListener("change", applyFilters);
  document.getElementById("minPrice").addEventListener("change", applyFilters);
  document.getElementById("maxPrice").addEventListener("change", applyFilters);
  document.getElementById("sortSelect").addEventListener("change", applyFilters);
  document.getElementById("clearFiltersBtn").addEventListener("click", clearFilters);

  // category bar click
  document.querySelectorAll(".category-item").forEach((item) => {
    item.addEventListener("click", () => {
      document.querySelectorAll(".category-item").forEach((el) => el.classList.remove("active"));
      item.classList.add("active");

      const category = item.getAttribute("data-category");
      document.getElementById("categoryFilter").value = category;
      applyFilters();
      // scroll to products
      document.querySelector(".layout").scrollIntoView({ behavior: "smooth" });
    });
  });

  // hero button
  document.getElementById("shopNowBtn").addEventListener("click", () => {
    document.querySelector(".layout").scrollIntoView({ behavior: "smooth" });
  });

  // cart open/close
  document.getElementById("cartBtn").addEventListener("click", openCart);
  document.getElementById("closeCart").addEventListener("click", closeCart);
  document.getElementById("overlay").addEventListener("click", () => {
    closeCart();
    closeProductModal();
  });

  // modal close
  document.getElementById("closeModalBtn").addEventListener("click", closeProductModal);

  // modal add to cart
  document.getElementById("modalAddToCartBtn").addEventListener("click", (e) => {
    const id = parseInt(e.target.getAttribute("data-id"), 10);
    if (!isNaN(id)) {
      addToCart(id);
    }
  });
});
