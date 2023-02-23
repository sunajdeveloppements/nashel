let slideIndex = 0;
let already=false;


setInterval(function showSlides() {
  if(already=false){
    already=true;
  }
  let i;
  let slides = document.getElementsByClassName("slides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
, 4000);



function hoverProjects(e){
    document.getElementById("text "+e.className.split(" ")[1]).style.display="block";
}

function notHoverProjects(e){
    document.getElementById("text "+e.className.split(" ")[1]).style.display="none";
}






