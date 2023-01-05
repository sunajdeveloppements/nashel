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

window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.documentElement.scrollTop >= 290) {
    document.getElementById('head').style.height='75px';
    document.getElementById('logo').style.backgroundSize='40%';
    document.getElementById('menu').style.display='none';
    document.getElementById('side-menu').style.display='none';
    document.getElementById('head').style.justifyContent='center';
  } else {
    document.getElementById('head').style.height='150px';
    document.getElementById('logo').style.backgroundSize='90%';
    document.getElementById('menu').style.display='block';
    document.getElementById('side-menu').style.display='block';
    document.getElementById('head').style.justifyContent='space-between';
  }
}

