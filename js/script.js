let imgID = 1; // IMG src counter.
let similarCnt = 0;

//////////////////// ON LOAD - EventListener /////////////////

window.addEventListener('load', event => {
    setAccordionStateOnLoad();
})

// //////////////////EventListener Mobile BTN //////////////////

// -------Going to the next IMG
document.querySelector('.pictures-next').addEventListener('click', event => {
    imgID++;
    if (imgID === 6) imgID = 1;
    document.querySelector('.pictures-img').src = `/img/canard-jaune-${imgID}-l.png`;
})

// -------Coming back to the previous IMG.
document.querySelector('.pictures-prev').addEventListener('click', event => {
    imgID--;
    if (imgID === 0) imgID = 5;
    document.querySelector('.pictures-img').src = `/img/canard-jaune-${imgID}-l.png`;
})

// ------- Previous BTN Similar Section

document.querySelector('.similar').addEventListener('click', event => {
    if (!event.target.classList.contains('similar-btn-prev')) return;

    let list = document.querySelectorAll('.similar-itm');

    if (similarCnt <= 3 && similarCnt > 1) {
        list[similarCnt].classList.toggle('mobile-hidden');
        list[similarCnt - 1].classList.toggle('mobile-hidden');
        list[similarCnt - 1].classList.add('slide-right');
        list[similarCnt - 1].classList.remove('slide-left');
        similarCnt--;
        document.querySelector('.similar-btn-next').classList.remove('hidden')
    } else if (similarCnt === 1) {
        list[similarCnt].classList.toggle('mobile-hidden');
        list[similarCnt - 1].classList.toggle('mobile-hidden');
        list[similarCnt - 1].classList.add('slide-right');
        list[similarCnt - 1].classList.remove('slide-left');

        similarCnt--;
        event.target.classList.toggle('hidden');
    }
    return;
})

// ------- Next BTN Similar Section

document.querySelector('.similar').addEventListener('click', event => {
    if (!event.target.classList.contains('similar-btn-next')) return;

    let list = document.querySelectorAll('.similar-itm');

    if (similarCnt === 2) {
        list[similarCnt].classList.toggle('mobile-hidden');
        list[similarCnt + 1].classList.toggle('mobile-hidden');
        list[similarCnt + 1].classList.remove('slide-right');
        list[similarCnt + 1].classList.add('slide-left')
        similarCnt++;
        event.target.classList.add('hidden')
    } else if (similarCnt >= 0 && similarCnt < 2) {
        list[similarCnt].classList.toggle('mobile-hidden');
        list[similarCnt + 1].classList.toggle('mobile-hidden');
        list[similarCnt + 1].classList.remove('slide-right');
        list[similarCnt + 1].classList.add('slide-left')
        similarCnt++;
        document.querySelector('.similar-btn-prev').classList.remove('hidden')
    } return;
});

//  ////////////////// EventListener Desktop //////////////////

// -------Img hovering
document.querySelector('.thumbs').addEventListener('mouseover', event => {
    if (!event.target.classList.contains('thumbs-img')) return;
    document.querySelector('.pictures-img').src = event.target.dataset.imgLargeSrc;
});

// -------Clic on ADD button

document.querySelector('.add-cta').addEventListener('click', event => {
    if (event.target.classList.contains('add-cta')) {
        addItemToCart();
        changeCtaStyle(event.target);
    }
})

// -------Accordions

document.querySelector('.page-txt').addEventListener('click', event => {
    if (event.target.id !== 'advantages-accordion' && event.target.id !== 'features-accordion') return;
    displayAccordion(event.target);
})



////////////////// Functions //////////////////

// -------Display cart item number from 1 to 99+ 
function addItemToCart() {
    let quantity = parseInt(document.querySelector('.add-qty').value);
    quantity > 99 ? document.querySelector('.cart-nb').textContent = '99+' : document.querySelector('.cart-nb').textContent = quantity;
}

// -------Disable add-cta and change display
function changeCtaStyle(node) {
    node.classList.remove('add-cta');
    node.classList.add('add-cta-clicked');
    node.textContent = 'Déjà au panier';
}

// -------Toggle hidden class for accordions
function displayAccordion(node) {
    node.nextElementSibling.classList.toggle('hidden');
    saveAccordionState();
}
// -------Local Store the accordion state
function saveAccordionState() {
    let advantagesClasses = document.querySelector('.product-advantages').classList;
    localStorage.setItem('advantages', advantagesClasses.toString())
    let featuresClasses = document.querySelector('.product-car').classList;
    localStorage.setItem('features', featuresClasses.toString())
}

// ------- Load Accordion state from Local Storage
function setAccordionStateOnLoad() {
    let advantagesClasses = (localStorage.getItem('advantages')).split(' ');
    let featuresClasses = localStorage.getItem('features').split(' ');

    advantagesClasses.map(item => document.querySelector('.product-advantages').classList.add(item));
    featuresClasses.map(item => document.querySelector('.product-car').classList.add(item));
}

function toggleMobileHiddenClass(node) {
    node.classList.toggle('mobile-hidden');
}

