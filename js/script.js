
let imgID = 1; // IMG src counter.

// EventListener Boutons Mobile

// -------Going to the next IMG
document.querySelector('.pictures-next').addEventListener('click', event => {
    imgID ++;
    if(imgID === 6) imgID = 1;
    document.querySelector('.pictures-img').src = `/img/canard-jaune-${imgID}-l.png`;
})

// -------Coming back to the previous IMG.
document.querySelector('.pictures-prev').addEventListener('click', event => {
    imgID --;
    if(imgID === 0) imgID = 5;
    document.querySelector('.pictures-img').src = `/img/canard-jaune-${imgID}-l.png`;
})

//  EventListener Desktop

// Img hovering
document.querySelector('.thumbs').addEventListener('mouseover', event => {
    if(!event.target.classList.contains('thumbs-img')) return;
    document.querySelector('.pictures-img').src = event.target.dataset.imgLargeSrc;
})