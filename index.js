
// Responsive Navbar

const mobile_nav = document.querySelector(".mobile-navbar-btn");
const headerEle = document.querySelector(".header");

mobile_nav.addEventListener('click', () => {
    headerEle.classList.toggle("active");
})


// portfolio buttons

const p_btns = document.querySelector(".p-btns");
const p_btn = document.querySelectorAll(".p-btn");
const p_img_ele = document.querySelectorAll(".img-overlay");

p_btns.addEventListener('click', (e) => {
    const p_btn_clicked = e.target;

    p_btn.forEach((ele)=>{
        ele.classList.remove("p-btn-active")
    });

    if(!p_btn_clicked.classList.contains('p-btn')) return ;
    
    p_btn_clicked.classList.add("p-btn-active");

    const btn_num = p_btn_clicked.dataset.btnNum;
    
    const img_active = document.querySelectorAll(`.p-btn--${btn_num}`);

    p_img_ele.forEach((ele) => ele.classList.add("p-image-not-active"));

    img_active.forEach((ele) => ele.classList.remove("p-image-not-active"));


});


// Swiper
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 2,
    spaceBetween: 30,
    autoplay: {
        delay: 2500,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
});

const newSlider = (widthSize) => {
    if(widthSize.matches){
        new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 30,
        });
    }else{
        new Swiper(".mySwiper", {
            slidesPerView: 2,
            spaceBetween: 30,
        });
    }
}

const widthSize = window.matchMedia("(max-width: 780px)");

newSlider(widthSize);

widthSize.addEventListener('change', newSlider);


// --------Scroll top-to-bottom--------------

const footerEle = document.querySelector(".section-footer");

const scrollEle = document.createElement("div");
scrollEle.classList.add("scrollTop-style");

scrollEle.innerHTML = `<ion-icon name="arrow-up-sharp" class="scroll-top"></ion-icon>`
footerEle.after(scrollEle);

scrollEle.addEventListener("click", () =>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // header.scrollIntoView({ behavior: "smooth" });
});



// -------------Animate Counter----------


const workSection = document.querySelector(".section-work-data");
const workObserver = new IntersectionObserver((entries, observer) => {
    const [entry] = entries;

    if(!entry.isIntersecting) return ;

    const counterNum = document.querySelectorAll(".counter-numbers");

    const speed = 200;

    counterNum.forEach((ele) => {
        const updateNumber = () => {
            const targetNumber = parseInt(ele.dataset.number);
            const initialNumber = parseInt(ele.innerText);

            const increment = Math.trunc(targetNumber/speed);

            if(initialNumber<targetNumber){
                ele.innerText = `${initialNumber + increment}+`;

                setTimeout(updateNumber, 8);
            }
        };

        updateNumber();
    })

    observer.unobserve(workSection);

}, {
    root: null,
    threshold: 0,
});

workObserver.observe(workSection);

