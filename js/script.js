
let imgID = 1; // IMG src counter.

// EventListener Boutons Mobile

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

// Clic on ADD button

document.querySelector('.add-cta').addEventListener('click', event => {
    if (event.target.classList.contains('add-cta')) {
        addItemToCart();
        changeCtaStyle(event.target);
    }
})


// Display cart item number from 1 to 99+ 
function addItemToCart() {
    let quantity = parseInt(document.querySelector('.add-qty').value);
    quantity > 99 ? document.querySelector('.cart-nb').textContent = '99+' : document.querySelector('.cart-nb').textContent = quantity;
}

// Change CTA Css to display unavailable click.
function changeCtaStyle(node) {
    node.classList.remove('add-cta');
    node.classList.add('add-cta-clicked');
    node.textContent = 'Déjà au panier';
}