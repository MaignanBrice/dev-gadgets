let imgID = 1; // IMG src counter.
let similarCnt = 0; // Similar Mobile Counter

//////////////////// ON LOAD - EventListener /////////////////

window.addEventListener('load', event => {
    setAccordionStateOnLoad(); // Load accordion state
    setImgId(document.querySelectorAll('.thumbs-img')); // Create thumbnail img IDs
});

// //////////////////EventListener Mobile BTN //////////////////

// -------Going to the next IMG
document.querySelector('.pictures-next').addEventListener('click', event => {
    imgID++;
    if (imgID === 6) imgID = 1;
    document.querySelector('.pictures-img').src = `/img/canard-jaune-${imgID}-l.png`;
});

// -------Coming back to the previous IMG.
document.querySelector('.pictures-prev').addEventListener('click', event => {
    imgID--;
    if (imgID === 0) imgID = 5;
    document.querySelector('.pictures-img').src = `/img/canard-jaune-${imgID}-l.png`;
});

// ------- Previous BTN Similar Section

document.querySelector('.similar').addEventListener('click', event => {
    if (!event.target.classList.contains('similar-btn-prev')) return;
    let list = document.querySelectorAll('.similar-itm');

    if (similarCnt <= 3 && similarCnt > 1) {

        toggleMobileHiddenClass(list[similarCnt - 1]);
        addLeftRemoveRight(list[similarCnt - 1]);

        //Animate
        animationTimeOutPrev(list[similarCnt])

        document.querySelector('.similar-btn-next').classList.remove('hidden')

    } else if (similarCnt === 1) {

        toggleMobileHiddenClass(list[similarCnt - 1]);
        addLeftRemoveRight(list[similarCnt - 1])

        //Animate
        animationTimeOutPrev(list[similarCnt])

        event.target.classList.toggle('hidden');


    } return;
});

// ------- Next BTN Similar Section

document.querySelector('.similar').addEventListener('click', event => {
    if (!event.target.classList.contains('similar-btn-next')) return;
    let list = document.querySelectorAll('.similar-itm');
        if (similarCnt === 2) {
            toggleMobileHiddenClass(list[similarCnt + 1]);
            addRightRemoveLeft(list[similarCnt + 1])

            // Animate
            animationTimeOutNext(list[similarCnt]);
            event.target.classList.add('hidden');

        } else if (similarCnt >= 0 && similarCnt < 2) {
            toggleMobileHiddenClass(list[similarCnt + 1]);
            addRightRemoveLeft(list[similarCnt + 1]);

            //Animate
            animationTimeOutNext(list[similarCnt]);
            document.querySelector('.similar-btn-prev').classList.remove('hidden');
        } return;
});

//  ////////////////// EventListener Desktop //////////////////

// -------Img hovering
document.querySelector('.thumbs').addEventListener('mouseover', event => {
    if (!event.target.classList.contains('thumbs-img')) return;
    document.querySelector('.pictures-img').src = event.target.dataset.imgLargeSrc;
    imgID = event.target.dataset.imgId;
});

// -------Clic on ADD button

document.querySelector('.add-cta').addEventListener('click', event => {
    if (event.target.classList.contains('add-cta')) {
        addItemToCart();
        changeCtaStyle(event.target);
    };
});

// -------Accordions

document.querySelector('.page-txt').addEventListener('click', event => {
    if (event.target.id !== 'advantages-accordion' && event.target.id !== 'features-accordion') return;
    displayAccordion(event.target);
});



////////////////// Functions //////////////////

function setImgId(nodelist) {
    nodelist.forEach((node, index) => {
        node.dataset.imgId = index + 1;
    });
};

// -------Display cart item number from 1 to 99+ 
function addItemToCart() {
    let quantity = parseInt(document.querySelector('.add-qty').value);
    quantity > 99 ? document.querySelector('.cart-nb').textContent = '99+' : document.querySelector('.cart-nb').textContent = quantity;
};

// -------Disable add-cta and change display
function changeCtaStyle(node) {
    node.classList.remove('add-cta');
    node.classList.add('add-cta-clicked');
    node.textContent = 'Déjà au panier';
};

// -------Toggle hidden class for accordions
function displayAccordion(node) {
    node.nextElementSibling.classList.toggle('hidden');
    saveAccordionState();
};

// -------Local Store the accordion state
function saveAccordionState() {
    let advantagesClasses = document.querySelector('.product-advantages').classList;
    localStorage.setItem('advantages', advantagesClasses.toString())
    let featuresClasses = document.querySelector('.product-car').classList;
    localStorage.setItem('features', featuresClasses.toString())
};

// ------- Load Accordion state from Local Storage
function setAccordionStateOnLoad() {
    if (localStorage.getItem('advantages') === null && localStorage.getItem('features') === null) return;
    let advantagesClasses = (localStorage.getItem('advantages')).split(' ');
    let featuresClasses = localStorage.getItem('features').split(' ');

    advantagesClasses.map(item => document.querySelector('.product-advantages').classList.add(item));
    featuresClasses.map(item => document.querySelector('.product-car').classList.add(item));
};

// ------- Toggle 'mobile-hidden' class
function toggleMobileHiddenClass(node) {
    node.classList.toggle('mobile-hidden');
};

// ------- Add 'slide-in-left' Remove 'slide-in-right'
function addLeftRemoveRight(node) {
    node.classList.add('slide-in-left');
    node.classList.remove('slide-in-right');
};

// ------- Remove 'slide-in-left' Add 'slide-in-right'
function addRightRemoveLeft(node) {
    node.classList.remove('slide-in-left');
    node.classList.add('slide-in-right');
};

// ------- Animate the movement

function animationTimeOutNext(node) {

    node.classList.add('slide-out-right');

    setTimeout(() => {
        toggleMobileHiddenClass(node);
        node.classList.remove('slide-out-right');
        similarCnt++;
    }, 500);
};

function animationTimeOutPrev(node) {

    node.classList.add('slide-out-left');

    setTimeout(() => {
        toggleMobileHiddenClass(node);
        node.classList.remove('slide-out-left');
        similarCnt--;
    }, 500);
}