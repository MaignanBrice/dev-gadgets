
let imgID = 1; // IMG src counter.


// ON LOAD - EventListener

window.addEventListener('load', event => {
    setAccordionStateOnLoad();
})


// EventListener Mobile BTN

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

//  EventListener Desktop

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



// Functions

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
