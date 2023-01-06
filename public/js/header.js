const overlay = document.getElementById("overlay");
function openNav() {
    console.log('open !');
    document.getElementById("sidenav").style.transform = "translateX(0px)"
    document.getElementById("overlay").classList.add("isVisible")
    document.body.classList.add("notScrollable")
}



/* Set the width of the side navigation to 0 */
function closeNav() {
    console.log('close !');
    document.getElementById("sidenav").style.transform = "translateX(-100%)"
    document.getElementById("overlay").classList.remove("isVisible")
    document.body.classList.remove("notScrollable")
}



document.addEventListener("click", (e) => {
    console.log('closed');
    let clickedElem = e.target;
    let overlay = document.getElementById("overlay");
    if (clickedElem == overlay) {
        closeNav();
    }
});

const menu=document.getElementById('menu');
const header=document.getElementById('content');

$(window).scroll(function(){
  if($(document).scrollTop() > 0) {
      $('#head').addClass('small');
  } else {
      $('#head').removeClass('small');
  }
});

