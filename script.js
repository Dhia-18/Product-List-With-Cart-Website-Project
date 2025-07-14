// Loading Data
async function loadJson(filePath){
    try{
        const response = await fetch(filePath);
        if(!response.ok){
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error){
        throw new Error(`Error loading JSON: ${error.message}`);
    }
}

// Adding functionality to add-to-cart button
function toggleButton(){
    const itemsList = document.getElementById("items-list");

    itemsList.addEventListener("click", (e)=>{
        const addCartButton = e.target.closest(".add-cart-btn");

        if(addCartButton){
            const cartPlusMinus = addCartButton.nextElementSibling;

            if(cartPlusMinus){
                if(!addCartButton.classList.contains("hidden")){
                    addCartButton.classList.add("hidden");
                    cartPlusMinus.classList.remove("hidden");

                    const item = addCartButton.closest(".item-container");
                    item.querySelector(".item-container img").classList.add("border");
                    addToCart(item);
                }
            }
        }
    });
}

function addToCart(item){
    // Get item details
    const itemPhoto = item.querySelector(".item-container img").src;
    const itemName = item.querySelector(".item-name").innerText;
    const itemPrice = parseFloat(item.querySelector(".item-price").innerText.replace("$",""));
    let currentQuantity = 1;

    // Creating the new cart item
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.setAttribute("data-label", `${itemName}`);
    cartItem.innerHTML = `
                    <div class="item-description">
                        <h3>${itemName}</h3>
                        <div class="item-quantity-price">
                            <p class="quantity">${currentQuantity}</p>
                            <p class="unit-price">@ $${itemPrice.toFixed(2)}</p>
                            <p class="total-price">$${itemPrice.toFixed(2)}</p>
                        </div>
                    </div>
                    <button class="remove-btn" aria-label="Remove Button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
                            <path fill="currentColor" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/>
                        </svg>
                    </button>
                `;

    // Creating the new cart popover item
    const cartItemPopover = document.createElement("div");
    cartItemPopover.classList.add("order-item");
    cartItemPopover.setAttribute("data-label", `${itemName}`);
    cartItemPopover.innerHTML = `
                    <img src="${itemPhoto}" alt="${itemName}">
                    <div class="item-description">
                        <h3>${itemName}</h3>
                        <div class="item-quantity-price">
                            <p class="quantity">${currentQuantity}</p>
                            <p class="unit-price">@ $${itemPrice.toFixed(2)}</p>
                        </div>
                    </div>
                    <p class="total-price">$${itemPrice.toFixed(2)}</p>
                    `;

    // Adding the new cart item
    const cartList = document.getElementById("cart-list");
    const popoverList = document.getElementById("order-list");
    if(cartList){
        cartList.appendChild(cartItem);
        popoverList.appendChild(cartItemPopover);
        updateCartVisibilitiy();
    }

    const cartButton = item.querySelector(".add-cart-btn");
    const cartPlusMinus = item.querySelector(".plus-minus-btn");
    const listItemQuantity = item.querySelector(".item-quantity");
    const dataItemName = item.dataset.label;
    const dataCartName = cartItem.dataset.label;
    updateCartItemCount();

    const removeButton = cartItem.querySelector(".remove-btn");
    const itemQuantity = cartItem.querySelector(".quantity");
    const itemTotal = cartItem.querySelector(".total-price");
    const itemQuantityPopover = cartItemPopover.querySelector(".quantity");
    const itemTotalPopover = cartItemPopover.querySelector(".total-price");

    removeButton.addEventListener("click", ()=>{
        cartList.removeChild(cartItem);
        popoverList.removeChild(cartItemPopover);
        updateCartItemCount();

        if(dataItemName == dataCartName){
            cartPlusMinus.classList.add("hidden");
            cartButton.classList.remove("hidden");
            item.querySelector(".item-container img").classList.remove("border");
            listItemQuantity.innerHTML = 1;
            updateCartVisibilitiy();
        }
    });

    // Add functionality for increment and decrement quantity
    const incrementButton = item.querySelector(".increment-btn");
    const decrementButton = item.querySelector(".decrement-btn");

    incrementButton.addEventListener("click", ()=>{
        currentQuantity++;
        itemQuantity.innerText = `${currentQuantity}x`;
        itemTotal.innerText = `$${(itemPrice * currentQuantity).toFixed(2)}`;
        itemQuantityPopover.innerText = `${currentQuantity}x`;
        itemTotalPopover.innerText = `$${(itemPrice * currentQuantity).toFixed(2)}`;
        updateCartItemCount();
    });

    decrementButton.addEventListener("click", ()=>{
        if(currentQuantity > 1){
            currentQuantity--;
            itemQuantity.innerText = `${currentQuantity}x`;
            itemTotal.innerText = `$${(itemPrice * currentQuantity).toFixed(2)}`;
            itemQuantityPopover.innerText = `${currentQuantity}x`;
            itemTotalPopover.innerText = `$${(itemPrice * currentQuantity).toFixed(2)}`;
            updateCartItemCount();
        }
    });
}

function updateCartVisibilitiy(){
    const cartList = document.getElementById("cart-list");
    const emptyCart = document.querySelector(".empty-cart");
    const fullCart = document.querySelector(".full-cart");

    if (cartList && cartList.children.length > 0) {
        emptyCart.classList.add("hidden");
        fullCart.classList.remove("hidden");
    } else {
        emptyCart.classList.remove("hidden");
        fullCart.classList.add("hidden");
    }
}

// Functionality to increment and decrement the item quantity in the cart.
function setupCartPlusMinus(){
    const itemsList = document.getElementById("items-list");

    itemsList.addEventListener("click", (e)=>{
        const decrementBtn = e.target.closest(".decrement-btn");
        const incrementBtn = e.target.closest(".increment-btn");

        if(decrementBtn){
            const itemQuantity = decrementBtn.nextElementSibling;
            if(itemQuantity && itemQuantity.classList.contains("item-quantity")){
                let quantity = parseInt(itemQuantity.innerText);
                if(quantity > 1){
                    itemQuantity.innerText = quantity - 1;
                }
            }
        }

        if(incrementBtn){
            const itemQuantity = incrementBtn.previousElementSibling;
            if(itemQuantity && itemQuantity.classList.contains("item-quantity")){
                let quantity = parseInt(itemQuantity.innerText);
                itemQuantity.innerText = quantity + 1;
            }
        }
    });
}

function updateCartItemCount(){
    const cartItems = document.querySelectorAll(".cart-item");
    const cartCountElement = document.querySelector(".cart-count");
    const cartTotalAmount = document.querySelector(".total");
    const cartTotalAmountPopover = document.querySelector(".total-popover");
    let totalQuantity = 0;
    let totalAmount = 0;

    cartItems.forEach(item => {
        const quantityText = item.querySelector(".quantity").innerText;
        const quantity = parseInt(quantityText);
        totalQuantity += quantity;

        const totalAmountText = item.querySelector(".total-price").innerText.replace("$", "");
        const total = parseFloat(totalAmountText);
        totalAmount += total;
    });

    if(cartCountElement){
        cartCountElement.innerText = totalQuantity;
    }

    if(cartTotalAmount){
        cartTotalAmount.innerHTML = `$${totalAmount.toFixed(2)}`;
        cartTotalAmountPopover.innerHTML = `$${totalAmount.toFixed(2)}`;
    }
}

// Adding functionality to clear button
function clearCart(){
    const clearCartBtn = document.getElementById("clear-btn");
    const popover = document.getElementById("popover");

    clearCartBtn.addEventListener("click", ()=>{
        const cartItems = document.querySelectorAll(".cart-item");
        const cartItemPopovers = document.querySelectorAll(".order-item");
        
        if(cartItems.length >= 1){
            cartItems.forEach(item => item.remove());
            cartItemPopovers.forEach(item => item.remove());
        }

        const dessertItems = document.querySelectorAll(".item-container");
        dessertItems.forEach(item => {
            const cartButton = item.querySelector(".add-cart-btn");
            const cartPlusMinus = item.querySelector(".plus-minus-btn");
            const itemQuantity = item.querySelector(".item-quantity");

            cartButton.classList.remove("hidden");
            cartPlusMinus.classList.add("hidden");
            itemQuantity.innerHTML = 1;
            item.querySelector(".item-container img").classList.remove("border");
        });

        updateCartItemCount();
        updateCartVisibilitiy();
        popover.classList.toggle("hidden");
    })
}

// Adding functionality to confirm order button
function confirmOrder(){
    const cartBtn = document.getElementById("confirm-btn");

    cartBtn.addEventListener("click", ()=>{
        const popover = document.getElementById("popover");
        const popupSound = document.getElementById("popup-sound");

        setTimeout(() => {
            popover.classList.toggle("hidden");
            popupSound.play();
        }, 150);
    });
}

document.addEventListener("DOMContentLoaded", ()=>{
    loadJson("data.json")
        .then((data)=>{
            const itemsList = document.getElementById("items-list");
            data.forEach(item => {
                itemsList.innerHTML +=`
                        <div class="item-container" data-label="${item.name}">
                            <div class="img-btn-container">
                                <picture>
                                    <source media="(min-width: 768px)" srcset="${item.image.desktop}">
                                    <source media="(min-width: 480px)" srcset="${item.image.tablet}">
                                    <img src="${item.image.mobile}" alt="${item.name}">
                                </picture>
                                <div class="cart-btn">
                                    <div class="add-cart-btn">
                                        <img src="assets/images/icon-add-to-cart.svg" alt="Cart Icon">
                                        <p>Add to Cart</p>
                                    </div>
                                    <div class="plus-minus-btn hidden">
                                        <button class="decrement-btn" aria-label="Decrease quantity">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2">
                                            <path fill="currentColor" d="M0 .375h10v1.25H0V.375Z"/>
                                        </svg>
                                        </button>
                                        <span class="item-quantity">1</span>
                                        <button class="increment-btn" aria-label="Increase quantity">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
                                            <path fill="currentColor" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/>
                                        </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="item-description-container">
                                <p class="item-category">${item.category}</p>
                                <p class="item-name">${item.name}</p>
                                <p class="item-price">$${(item.price).toFixed(2)}</p>
                            </div>
                        </div>    
                            `
            });
            toggleButton();
            setupCartPlusMinus();
            updateCartItemCount();
            confirmOrder();
            clearCart();
        })
        .catch((error)=>{
            console.error("Error loading JSON data: ", error);
        })
});