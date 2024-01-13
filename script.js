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

const pizzaContainer = document.querySelector(".pizza");
const bestSellers = document.querySelector(".bestsellers");
const extras = document.querySelector(".extras");

    // * Category Buttons
    const buttons = document.querySelectorAll('.categories button'); 

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            document.querySelector('.categories .active').classList.remove('active'); 
            button.classList.add('active');
        })
    })

fetch("./pizzas.json")
  .then((res) => res.json())
  .then((data) => {
    const pizzaItems = data.filter((pizza) => {
      return pizza.category && pizza.category.includes("pizza");
    });

    // console.log(pizzaItems);

    pizzaItems.forEach((pizzaItem) => {
      pizzaContainer.innerHTML += `
  <div class='pizzaItem'>
    <div class="pizza-img-container">
      <img class="pizzaPic" src="${pizzaItem.img}" alt="${pizzaItem.title}">
    </div>
    <div class="pizza-text-container">
      <p class='title'>${pizzaItem.title}</p>
      <p class='description'>${pizzaItem.description}</p>
        <div class="price-container">
            <div class='price'>
                <p>P${pizzaItem.price.small}</p>
                <span>${pizzaItem.price.large? '|' : ''}</span>
                <p class='large'>${pizzaItem.price.large? 'P' + pizzaItem.price.large : ''}</p>
            </div>
            <button>Choose</button>
        </div>
    </div>
  </div>`;
    });
  });

