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

  try{
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
                    <p>P${menuItem.price.small? menuItem.price.small : menuItem.price}</p>
                    <span>${menuItem.price.large ? "|" : ""}</span>
                    <p class='large'>${
                      menuItem.price.large ? "P" + menuItem.price.large : ""
                    }</p>
                </div>
                <button>Choose</button>
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


// * Footer

const cursor = document.querySelector('.uruta-cursor'); 
const copyright = document.querySelector('.copyright span'); 
const footer = document.querySelector('footer'); 

gsap.set(cursor, {xPercent: -100, yPercent: -200, opacity: 0});

footer.addEventListener('mousemove', (e) => {
  gsap.to(cursor, 0.5, {x:e.clientX, y:e.clientY, delay:0.1})
})

copyright.addEventListener('mouseenter', () => {
  gsap.to(cursor, 0.6, {scale: 1, opacity: 1, ease: 'power4.inOut'}); 
})

copyright.addEventListener('mouseleave', (e) => {
  gsap.to(cursor, 0.6, {scale: 0, opacity: 0, ease: 'power4.inOut'}); 
})
