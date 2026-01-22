
let vegMeals = [
  { id: 1, name: "Vegetable Biryani", price: 180, category: "veg", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400", description: "Aromatic rice with mixed vegetables" },
  { id: 2, name: "Paneer Butter Masala", price: 220, category: "veg", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400", description: "Creamy paneer in rich tomato gravy" },
  { id: 3, name: "Masala Dosa", price: 120, category: "veg", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400", description: "Crispy dosa with potato filling" },
  { id: 4, name: "Chole Bhature", price: 150, category: "veg", image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=400", description: "Spicy chickpeas with bread" }
];

let nonVegMeals = [
  { id: 5, name: "Chicken Biryani", price: 280, category: "nonveg", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400", description: "Fragrant rice with chicken" },
  { id: 6, name: "Butter Chicken", price: 320, category: "nonveg", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400", description: "Creamy tomato curry" }
];

let desserts = [
  { id: 9, name: "Gulab Jamun", price: 80, category: "dessert", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400", description: "Sweet milk dumplings" },
  { id: 10, name: "Rasmalai", price: 100, category: "dessert", image: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=400", description: "Soft cheese in milk" }
];


//    ALL MENU ITEMS & CART

let allMenuItems = [...vegMeals, ...nonVegMeals, ...desserts];
let cart = [];


//    DISPLAY MENU


let menuGrid = document.getElementById("menuGrid");

let displayMenu = (items) => {
  menuGrid.innerHTML = "";

  items.forEach(item => {
    menuGrid.innerHTML += `
      <div class="menu-item fade-in">
        <img src="${item.image}" class="menu-item-img">
        <div class="menu-item-content">
          <h3 class="menu-item-name">${item.name}</h3>
          <p class="menu-item-desc">${item.description}</p>
          <div class="menu-item-footer">
            <span class="menu-item-price">₹${item.price}</span>
            <button class="add-to-cart-btn" onclick="addToCart(${item.id})">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  });
};

displayMenu(allMenuItems);




// displayMenu(allMenuItems);

//    ADD TO CART


let addToCart = (id) => {
  let item = allMenuItems.find(i => i.id === id);
  let exists = cart.find(c => c.id === id);

  if (exists) {
    exists.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  updateCart();
};


//    UPDATE CART

let updateCart = () => {
  let cartItems = document.getElementById("cartItems");
  let cartCount = document.getElementById("cartCount");
  let cartTotal = document.getElementById("cartTotal");

  cartItems.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    count += item.qty;

    cartItems.innerHTML += `
      <div class="cart-item slide-in">
        <img src="${item.image}" class="cart-item-img">
        <div class="cart-item-details">
          <p><strong>${item.name}</strong></p>
          <p>₹${item.price}</p>
          <div class="quantity-controls">
            <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
            <span>${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
          </div>
        </div>
      </div>
    `;
  });

  cartCount.innerText = count;
  cartTotal.innerText = "₹" + total;
};


//    CHANGE QUANTITY

let changeQty = (index, value) => {
  cart[index].qty += value;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  updateCart();
};


//    CART SIDEBAR

let toggleCart = () => {
  let sidebar = document.getElementById("cartSidebar");
  sidebar.classList.toggle("open");
};


//    SCROLL ANIMATIONS

let observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(
  ".fade-in, .slide-left, .slide-right, .scale-in"
).forEach(el => observer.observe(el));


//    NAVBAR SCROLL EFFECT

window.addEventListener("scroll", () => {
  let navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
