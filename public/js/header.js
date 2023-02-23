const overlay = document.getElementById("overlay");
function openNav() {
    console.log('open !');
    document.getElementById("overlay").classList.add("isVisible")
    
    document.getElementById("sidenav").style.transform = "translateX(0px)"
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

window.onscroll = function () {
    const header=document.getElementById('head');
    if (window.pageYOffset <100){
        header.style.transform="translateY(0)";
        console.log("B");
    } else {
        header.style.transform ="translateY(-100%)";
        console.log("A");
    }
};

const block = document.getElementById("overlay");

block.addEventListener("mouseenter", function() {
  document.body.style.overflow = "hidden";
});

block.addEventListener("mouseleave", function() {
  document.body.style.overflow = "scroll";
});

