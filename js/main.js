/* Util functions */
function baseUrl(){
    return window.location.origin;
}

function getUrl(pathname){
    return baseUrl() +"/"+ pathname;
}

/* hero image slider */

var heroImageSlide;
var cloneSlide;
var heroSlide = {
    height: 0,
    width: 0,
    capacity: 0,
    autoplay: true,
    autoplayTimer: null,
    autoplayPause: false
}
var heroPos_x = 0;
var currentItem;
var effectDelay = 300;
var heroItem = {
    width: 0,
    height: 0,
    count: 0,
    current: 0
}

function heroSliderControl(direction){
    if(direction == 1){
        // Next
        if(heroItem.current == (heroItem.count - heroSlide.capacity)-1){
            setTimeout(function(){
                heroPos_x = -(heroItem.width * heroSlide.capacity);
                heroItem.current = heroSlide.capacity;
                moveSlide(heroPos_x, false);
                updateCurrentClass(heroItem.current);
            }, effectDelay);
        }
        heroPos_x -= heroItem.width;
        heroItem.current++;
        updateCurrentClass(heroItem.current);
    }
    else{
        // Previous
        if(heroItem.current == heroSlide.capacity){
            setTimeout(function(){
                heroPos_x = -(heroItem.width * (heroItem.count - heroSlide.capacity - 1));
                heroItem.current = heroItem.count - heroSlide.capacity - 1;
                moveSlide(heroPos_x, false);
                updateCurrentClass(heroItem.current);
            }, effectDelay);
        }
        heroPos_x += heroItem.width;
        heroItem.current--;
        updateCurrentClass(heroItem.current);
    }

    pauseAutoplay();
    moveSlide(heroPos_x, true);
    
    document.getElementsByClassName("hero-image-bg")[0].style.transition = "opacity "+effectDelay+"ms ease 0s";
    document.getElementsByClassName("hero-image-bg")[0].style.opacity = 0;

    setTimeout(function(){
        let bgImageUrl = heroImageSlide.children[heroItem.current].children[0].children[0].src;
        document.getElementsByClassName("hero-image-bg")[0].style.backgroundImage = "url("+bgImageUrl+")"
        document.getElementsByClassName("hero-image-bg")[0].style.opacity = 100;
    }, effectDelay);
}

function updateCurrentClass(index){
    let classname = "current-hero-item"
    heroImageSlide.getElementsByClassName(classname)[0].classList.remove(classname);
    heroImageSlide.children[index].className = classname;
}

function moveSlide(pos_x, effect){
    if(effect){
        heroImageSlide.style.transition = "transform "+effectDelay+"ms ease 0s";
    }
    heroImageSlide.style.transform = "translate3d("+heroPos_x+"px, 0px, 0px)";
    setTimeout(function(){
        heroImageSlide.style.transition = null;
    }, effectDelay);
}

function HeroSetAutoplay(enable, interval){
    if(enable){
        heroSlide.autoplayTimer = setInterval(function(){
            if(!heroSlide.autoplayPause){
                heroSliderControl(1)
            }
        }, interval);
    }
    else{
        heroSlide.autoplayTimer = null;
    }
}

function pauseAutoplay(){
    heroSlide.autoplayPause = true;
    setTimeout(function(){
        heroSlide.autoplayPause = false;
    }, 3000);
}

function heroSlideSetup(){
    heroImageSlide = document.getElementsByClassName("hero-image-slider")[0];
    
    heroImageSlide.children[0].className = "current-hero-item";

    currentItem = this.document.getElementsByClassName("current-hero-item")[0];
    heroItem.width = currentItem.offsetWidth;
    heroItem.height = currentItem.offsetHeight;
    heroItem.count = heroImageSlide.childElementCount;

    heroSlide.capacity = Math.floor(heroImageSlide.offsetWidth / heroItem.width)

    for(let i = 0; i <= heroSlide.capacity; i++){
        let tempElm = cloneSlide.childNodes[(heroItem.count - (i + 1))].cloneNode(true);
        let tempElm2 = cloneSlide.childNodes[i].cloneNode(true);
        heroImageSlide.insertBefore(tempElm, heroImageSlide.childNodes[0]);
        heroImageSlide.appendChild(tempElm2);
    }

    heroPos_x += -((heroSlide.capacity + 1) * heroItem.width);
    heroItem.count += heroSlide.capacity * 2;
    heroItem.current += heroSlide.capacity + 1;
    moveSlide(heroPos_x);

    let bgImageUrl = heroImageSlide.children[heroItem.current].children[0].children[0].src;
    document.getElementsByClassName("hero-image-bg")[0].style.backgroundImage = "url("+bgImageUrl+")"
    document.getElementsByClassName("hero-image-bg")[0].style.opacity = 100;
}

function heroSlideInit(){
    cloneSlide = document.getElementsByClassName("hero-image-slider")[0].cloneNode(true);

    document.getElementById("heroprevious").addEventListener("click", () => {heroSliderControl(0)}, false);
    document.getElementById("heronext").addEventListener("click", () => {heroSliderControl(1)}, false);
    console.log("Success loaded");

    heroSlideSetup();
    HeroSetAutoplay(true, 3000);
}
