# Frontend Mentor - Product list with cart solution

This is a solution to the [Product list with cart challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)

## Overview

### The challenge

Users should be able to:

- Add items to the cart and remove them
- Increase/decrease the number of items in the cart
- See an order confirmation modal when they click "Confirm Order"
- Reset their selections when they click "Start New Order"
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./preview.jpg)

### Links

- Live Site URL: [Product List With Cart](https://product-list-with-cart-dhia.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- Javascript

### What I learned

- I learned how add a sound when a button is clicked. Simply use <audio> tag in the HTML file, and add some lines of code to the JavaScript file.

```html
    <audio id="popup-sound" src="assets/Submit-Sound.wav" preload="auto"></audio>
```

```js
    const cartBtn = document.getElementById("confirm-btn");

    cartBtn.addEventListener("click", ()=>{
        // const popover = document.getElementById("popover");
        const popupSound = document.getElementById("popup-sound");

        setTimeout(() => {
            // popover.classList.toggle("hidden");
            popupSound.play();
        }, 150);
    });
```

- I also learned how to add some animations in order to improve the User Experience (UX)

```html
      <div class="empty-cart">
        <img src="assets/images/illustration-empty-cart.svg" alt="Two pieces of cake">
        <p>Your added items will apear here</p>
      </div>
```

```css
      .empty-cart img{
          /* margin: 15px 0; */
          animation: float 3s ease-in-out infinite;
      }

      @keyframes float {
          0%   { transform: translateY(-5px); }
          50%  { transform: translateY(10px); }
          100% { transform: translateY(-5px); }
      }
```

- Finally, I understood the benefit of using ``Normalize.css`` in the project. The main reason is to make a website look consistent across all browsers by removing browser inconsistencies in default styles.


### Continued development

- Strengthen JavaScript skills through additional challenges.
- Deepen CSS knowledge by practicing more complex layouts and designs.
- Begin learning and building projects with the React framework.