
// * Loader
const loader = document.querySelector(".loader");

window.addEventListener("load", () => {
  loader.classList.add("loader-hidden");
  // console.log('Wellow Horld');
});

// * Slider

const slides = document.querySelectorAll(".slides");
let counter = 0;
const goNext = document.querySelector(".next-btn");
const goPrev = document.querySelector(".prev-btn");

slides.forEach((slide, index) => {
  slide.style.left = `${index * 100}%`;
});

goNext.addEventListener("click", () => {
  counter += 1;
  if (counter > slides.length - 1) {
    counter = 0;
  }
  slide();
});

goPrev.addEventListener("click", () => {
  counter -= 1;
  if (counter < 0) {
    counter = slides.length - 1;
  }
  slide();
});

const slide = () => {
  slides.forEach((slide) => {
    slide.style.transform = `translateX(-${counter * 100}%)`;
  });
};

// * Banner Custom Cursor

const bannerCursor = document.querySelector(".bannerCursor");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

gsap.set(bannerCursor, { opacity: 0, xPercent: -50, yPercent: -50 });

document.addEventListener("mousemove", (e) => {
  gsap.to(bannerCursor, 0.5, { x: e.clientX, y: e.clientY });
});

const enter = (e, image) => {
  gsap.to(bannerCursor, 0.5, {
    opacity: 1,
    x: e.clientX,
    y: e.clientY,
    ease: "power2",
  });
  bannerCursor.style.backgroundImage = `url('${image}')`;
};

const leave = (e) => {
  gsap.to(bannerCursor, 0.5, {
    opacity: 0,
    x: e.clientX,
    y: e.clientY,
    ease: "power2",
  });
};

nextBtn.addEventListener("mouseenter", (e) => {
  enter(e, "imgs/arrows-right.png");
});

nextBtn.addEventListener("mouseleave", (e) => {
  leave(e);
});

prevBtn.addEventListener("mouseenter", (e) => {
  enter(e, "imgs/arrows-left.png");
});

prevBtn.addEventListener("mouseleave", (e) => {
  leave(e);
});

// * Menu

const menuContainer = document.querySelector(".menu");

// * Category Buttons
const buttons = document.querySelectorAll(".categories button");

buttons.forEach((button) => {
  button.addEventListener("click", async (e) => {
    const prevActiveButton = document.querySelector(".categories .active");
    prevActiveButton && prevActiveButton.classList.remove("active");
    button.classList.add("active");

    const selectedCategory = e.target.dataset.category.toLowerCase();
    // console.log(selectedCategory);

    try {
      const response = await fetch("./pizzas.json");
      const data = await response.json();
      const filteredMenuItems = data.filter((menuItem) =>
        Array.isArray(menuItem.category)
          ? menuItem.category.includes(selectedCategory)
          : menuItem.category === selectedCategory
      );

      menuContainer.innerHTML = "";
      filteredMenuItems.forEach((menuItem) => {
        menuContainer.innerHTML += `
      <div class='menuItem'>
        <div class="menu-img-container">
          <img class="menuPic" src="${menuItem.img}" alt="${menuItem.title}">
        </div>
        <div class="menu-text-container">
          <p class='title'>${menuItem.title}</p>
          <p class='description'>${menuItem.description}</p>
            <div class="price-container">
                <div class='price'>
                    <p>P${
                      menuItem.price.small
                        ? menuItem.price.small
                        : menuItem.price
                    }</p>
                    <span>${menuItem.price.large ? "|" : ""}</span>
                    <p class='large'>${
                      menuItem.price.large ? "P" + menuItem.price.large : ""
                    }</p>
                </div>
                <button class='chooseButton' data-menu-item='${JSON.stringify(menuItem)}'>Choose</button>
            </div>
        </div>
      </div>`;
      });
    } catch (error) {
      console.error("Error fetching menu items: ", error.message);
    }
  });
});

const defaultCategoryButton = document.querySelector(".pizzas-cat");
defaultCategoryButton.click();

// * Modal

document.addEventListener("DOMContentLoaded", () => {
  const menuContainer = document.querySelector(".menu");
  const modalContainer = document.querySelector(".modal-container");
  const modal = document.querySelector(".modal"); 
  const modalContent = document.querySelector(".modalContent"); 
  const exitModal = document.querySelector('.modal span'); 
  let  isModalOpen = false; 
  const form = document.querySelector('.custom-pizza .addToBagBtn'); 

  const pizzaOrder = {
    size: '', 
    dough: '' 
  };

  const submit = () => {
    const sizeSelection = document.querySelector('.custom-pizza .size-selection'); 
    const doughSelection = document.querySelector('.custom-pizza .dough-selection'); 

    form.addEventListener('submit', (e) => {
      e.preventDefault(); 
      pizzaOrder.size = sizeSelection.value;
      pizzaOrder.dough = doughSelection.value;

      console.log('Selected Pizza Size:', pizzaOrder.size);
      console.log('Selected Dough Thickness:', pizzaOrder.dough);

      closeModal(); 

    })
  }

  const displayModal = (selectedMenuItem) => {

    modalContent.innerHTML = `
      <div class='menuItemImgContainer'>
        <img src="${selectedMenuItem.img}" alt="${selectedMenuItem.title}">
      </div>
      <div class='menuItemTextContainer'>
        <h2>${selectedMenuItem.title}</h2>
        <p>${selectedMenuItem.description}</p>
        <form class='custom-pizza'>
          <div class='form-container'>
            <label for="size-selection">Pizza Size</label>
            <select id="size-selection">
              <option value="${selectedMenuItem.price.small}">Small</option>
              ${selectedMenuItem.price.large? `<option value="${selectedMenuItem.price.large}">Large</option>` : ''}
            </select>
          </div>
          <div class='form-container'>
            <label for="dough-selection">Dough Thickness</label>
            <select id="dough-selection">
              <option value="Traditional">Traditional</option>
              <option value="Thin">Thin</option>
            </select>
          </div>
          <button class="addToBagBtn">Add to Bag</button>
        </form>
      </div>
      `; 
    isModalOpen = true; 
    modalContainer.style.display = 'grid'; 

    modalContainer.addEventListener('click', (e) => {
      const submitBtn = e.target.closest(".custom-pizza");
      
      if(submitBtn) {
        // submit(); 
      }
    })
  }  
  
  const closeModal = () => {
    isModalOpen = false; 
    modalContainer.style.display = 'none'; 
  }
  menuContainer.addEventListener("click", (event) => {
    if(isModalOpen) return; 
    const chooseButton = event.target.closest(".chooseButton");
    
    if (chooseButton) {
      const selectedMenuItem = JSON.parse(chooseButton.dataset.menuItem);
      // console.log(selectedMenuItem);    

      // Check if menu item's category has pizza
      // since we only want to display the modal if the item has the
      // category pizza
      if(selectedMenuItem.category.includes('pizza')){
        displayModal(selectedMenuItem); 
      }
      
    }
  });

 

  exitModal.addEventListener('click', () => {
    closeModal(); 
  })
});



// * Footer

const cursor = document.querySelector(".uruta-cursor");
const copyright = document.querySelector(".copyright span");
const footer = document.querySelector("footer");

gsap.set(cursor, { xPercent: -100, yPercent: -200, opacity: 0 });

footer.addEventListener("mousemove", (e) => {
  gsap.to(cursor, 0.5, { x: e.clientX, y: e.clientY, delay: 0.1 });
});

copyright.addEventListener("mouseenter", () => {
  gsap.to(cursor, 0.6, { scale: 1, opacity: 1, ease: "power4.inOut" });
});

copyright.addEventListener("mouseleave", (e) => {
  gsap.to(cursor, 0.6, { scale: 0, opacity: 0, ease: "power4.inOut" });
});

// * Responsive Nav

const burger = document.querySelector(".burger");
const nav = document.querySelector(".navlinks");
const exitNav = document.querySelector(".exit-nav");

burger.addEventListener("click", () => {
  nav.style.right = "0%";
  document.body.style.overflow = "hidden";
});

exitNav.addEventListener("click", () => {
  nav.style.right = "-100%";
  document.body.style.overflow = "auto";
});

document.querySelectorAll(".navlinks li a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.style.right = "-100%";
    document.body.style.overflow = "auto";
  });
});
