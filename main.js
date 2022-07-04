
var image_links = getLinks();

var slideIndex = 1;
updateSlideIndex(slideIndex);


function updateSlideIndex(n) {
    if (n > 6) {
        n = 1;
        slideIndex = 1;
    }    
    if (n <= 0) {
        n = 6;
        slideIndex = 6;
    }
    showSlide();
    updateButtons();
    toggleCaption();
}

function plusDivs(n) {
    updateSlideIndex(slideIndex += n);
}

function currentDiv(n) {
    updateSlideIndex(slideIndex = n);
}

function showSlide() {
    document.getElementById('slide1').src = image_links[slideIndex];
}


function updateButtons() {
    var slide_buttons = document.getElementsByClassName("slide_btn");  

    for (i = 0; i < 6; i++) {
        slide_buttons[i].className = slide_buttons[i].className.replace(" w3-red", " w3-dark-gray");
    }    

    slide_buttons[slideIndex-1].className = slide_buttons[slideIndex-1].className.replace(" w3-dark-gray", " w3-red"); 
}

function toggleCaption() {
    if (slideIndex == 6) 
        document.getElementById("caption1").textContent = getCaption();
    else 
        document.getElementById("caption1").textContent = " ";
}
