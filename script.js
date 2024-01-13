// slider

const slides = document.querySelectorAll('.slides'); 
let counter = 0; 
const goNext = document.querySelector('.next-btn'); 
const goPrev = document.querySelector('.prev-btn'); 

slides.forEach( (slide, index) => {
    slide.style.left = `${index * 100}%`; 
})

goNext.addEventListener('click', () => {
    counter += 1; 
    if(counter > slides.length - 1){
        counter = 0; 
    }
    slide(); 
})

goPrev.addEventListener('click', () => {
    counter -= 1;
    if(counter < 0){
        counter = slides.length - 1; 
    } 
    slide(); 
})

const slide = () => {
    slides.forEach( (slide) => {
        slide.style.transform = `translateX(-${counter * 100}%)`; 
    })
}

// banner custom cursor
const bannerCursor = document.querySelector('.bannerCursor'); 
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

gsap.set(bannerCursor,{opacity: 0, xPercent: -50, yPercent: -50}); 

document.addEventListener('mousemove', (e) => {
    gsap.to(bannerCursor, 0.5, {x: e.clientX, y: e.clientY});  
}); 

// console.log(mouseX); 


const enter = (e, image) => {
    gsap.to(bannerCursor, 0.5, {opacity: 1, x:e.clientX, y:e.clientY, ease: 'power2'}); 
    bannerCursor.style.backgroundImage = `url('${image}')`; 
}

const leave = (e) => {
    gsap.to(bannerCursor, 0.5, {opacity: 0, x:e.clientX, y:e.clientY, ease: 'power2'}); 
}

nextBtn.addEventListener('mouseenter', (e) => {
    enter(e, 'imgs/arrows-right.png'); 
})

nextBtn.addEventListener('mouseleave', (e) => {
    leave(e); 
})

prevBtn.addEventListener('mouseenter', (e) => {
    enter(e, 'imgs/arrows-left.png'); 
})

prevBtn.addEventListener('mouseleave', (e) => {
    leave(e); 
})


