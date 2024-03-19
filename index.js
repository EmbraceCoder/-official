// 轮播设置
const glide = new Glide(".glide")
const captionsEL = document.querySelectorAll(".slide-caption");

glide.on(["mount.after", "run.after"], () => {
    const caption = captionsEL[glide.index];
    console.log(caption.children)
    anime({
        targets: caption.children,
        opacity: [0, 1],
        duration: 400,
        easing: "spring(1, 80, 10, 0)",
        delay: anime.stagger(400, { start: 300 }),
        translateY: [anime.stagger([40, 10]), 0],
    });
});
glide.on("run.before", () => {
    document.querySelectorAll(".slide-caption > *").forEach((el) => {
        el.style.opacity = 0;
    });
});

glide.mount();









const isotope = new Isotope(".cases", {
    layoutMode: "fitRows",
    itemSelector: ".case-item",
});


const filterBtns = document.querySelector('.filter-btns');

filterBtns.addEventListener("click", (e) => {
    let { target } = e;
    const filterOption = target.getAttribute("data-filter");
    if (filterOption) {
        document
            .querySelectorAll(".filter-btn.active")
            .forEach((btn) => btn.classList.remove("active"));
        target.classList.add("active");

        isotope.arrange({ filter: filterOption });
    }
});









const headerEl = document.querySelector("#header")
const scrollToTop = document.querySelector(".scrollToTop")
window.addEventListener("scroll", () => {
    let height = headerEl.getBoundingClientRect().height;
    if (window.pageYOffset - height > 800) {
        if (!headerEl.classList.contains("sticky")) {
            headerEl.classList.add("sticky")
            scrollToTop.style.display = 'block'
        }
    } else {
        headerEl.classList.remove("sticky")
        scrollToTop.style.display = 'none'

    }
})


const staggeringOption = {
    delay: 300,
    distance: "50px",
    duration: 500,
    easing: "ease-in-out",
    origin: 'bottom'
}
ScrollReveal().reveal(".feature", { ...staggeringOption, interval: 300 })
ScrollReveal().reveal(".service-item", { ...staggeringOption, interval: 300 })
ScrollReveal().reveal(".data-section", {
    beforeReveal: () => {
        anime({
            targets: ".data-piece .num",
            innerHTML: (el) => {
                return [0, el.innerHTML];
            },
            duration: 1500,
            round: 1,
            easinge: "easeInExpo",
        });
    },
});

// 实现视差滚动
// 获取页面高
let winHeight = $(window).height()
// 获取div的高
let dataSectionElHeight = $('.data-section').height()
// 获取div距离html顶部的高度
let dataSectionElOffsetTop = $('.data-section').offset().top;

let prevTop = dataSectionElOffsetTop


$(window).on('scroll', () => {
    let winTop = $(window).scrollTop(); //滚动条滚动高度
    if (winTop + winHeight > dataSectionElOffsetTop && winTop < dataSectionElOffsetTop + dataSectionElHeight) { //判断div是否出现在屏幕
        if (winTop >= prevTop) { //滚动条往下
            $('.data-section').finish().animate({
                backgroundPositionY: '-=0.5px'
            }, 250);
        } else { //滚动条往上
            $('.data-section').finish().animate({
                backgroundPositionY: '+=0.5px'
            }, 250);
        }
        prevTop = $(window).scrollTop();
    }
})



const scroll = new SmoothScroll('nav a[href*="#"], .scrollToTop a[href*="#"]', {
    header: 'header',
    offset: 80
})

const exploreBtns = document.querySelectorAll('.explore-btn');
exploreBtns.forEach(el => {
    el.addEventListener("click", () => {
        scroll.animateScroll(document.querySelector("#about-us"))
    })
})








document.addEventListener("scrollStart", () => {
    if (headerEl.classList.contains("open")) {
        headerEl.classList.remove("open");
    }
})


//折叠按钮处理
const burgerEl = document.querySelector(".burger");
burgerEl.addEventListener("click", () => {
    headerEl.classList.toggle("open");
})