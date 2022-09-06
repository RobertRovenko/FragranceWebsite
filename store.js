let cart = document.querySelectorAll("button");

let products = [
  {
    name: "Dior Sauvage",
    tag: "diorsauvage",
    price: 1100,
    inCart: 0,
  },
  {
    name: "Bleu De Chanel",
    tag: "bleudechanel",
    price: 1350,
    inCart: 0,
  },
  {
    name: "Prada Luna Rossa Ocean",
    tag: "pradalunarossaocean",
    price: 1000,
    inCart: 0,
  },
  {
    name: "Davidoff Cool Water",
    tag: "davidoffcoolwater",
    price: 260,
    inCart: 0,
  },
  {
    name: "Versace Eros",
    tag: "versaceeros",
    price: 915,
    inCart: 0,
  },
  {
    name: "Aqua Di Gio Profondo",
    tag: "aquadigioprofondo",
    price: 1150,
    inCart: 0,
  },
];

//klick funktion som räknar.
for (let i = 0; i < cart.length; i++) {
  cart[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

//funktion för att spara antal varor i korgen när man refreshar sidan
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.querySelector(".cart1 span").textContent = productNumbers;
  }
}

//kollar hur många produkter man har i korgen och lägger till, samt uppdaterar checkout siffran och blir kallad av klick eventet
function cartNumbers(products) {
  console.log(products);
  let productNumbers = localStorage.getItem("cartNumbers");

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart1 span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart1 span").textContent = 1;
  }

  setItems(products);
}

function setItems(products) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  //första klicket
  if (cartItems != null) {
    //för att kunna lägga in 2 olika varor!
    if (cartItems[products.tag] == undefined) {
      cartItems = {
        //restAPI
        ...cartItems,
        [products.tag]: products,
      };
    }
    cartItems[products.tag].inCart += 1;
  }
  //andra klick
  else {
    products.inCart = 1;
    cartItems = {
      [products.tag]: products,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

//parse switchar från string till int
function totalCost(products) {
  let cartCost = localStorage.getItem("totalCost");

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + products.price);
  } else {
    localStorage.setItem("totalCost", products.price);
  }
}

//-----------------------------------------------------------checkout items

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".product");
  let cartCost = localStorage.getItem("totalCost");
  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
      
      
        <img src="/images/${item.tag}.jpg">
        
        <span>${item.name}</span>
      
      <span>${item.price} SEK   </span>
      
      <span>${item.inCart} in your cart </span>  

      Total  ${item.inCart * item.price} SEK    
      `;
    });

    productContainer.innerHTML += `
    <div class="basketTotalContainer">
    <h4 class="basketTotalTitle">Total Cost</h4>
    <h4 class="basketTotal">${cartCost} SEK</h4></div>`;
  }
}

onLoadCartNumbers();
displayCart();
