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
const header=document.getElementsByClassName('content');
window.addEventListener('scroll', () => {
    
    const scrolled = window.scrollY;
    if(scrolled>=150.0) {
        header.classList.add(menu);
    } else {
        header.classList.remove(menu);
    }
});

