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
