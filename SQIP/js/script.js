const doc = document;
const container = doc.getElementsByClassName('container')[0]
const video = doc.getElementById('background-video');
const videoSource = doc.getElementById('video-source');
const listenButton = doc.getElementById('listen');
const listen = doc.getElementsByClassName('listen')[0];
const links = doc.getElementsByClassName('links')[0];
const quote = doc.getElementById('videoOverlay');

console.log(quote);

video.addEventListener('play', function () {
    quote.classList.remove('hidden');
})

video.addEventListener('ended', function () {
    if (listenButton.style.display != 'none') {
        video.style.opacity = '0.3';
        quote.classList.add('hidden');
    }
});

listenButton.addEventListener('click', () => {
    video.style.opacity = '0';
    quote.classList.add('hidden');
    setTimeout(() => { 
        listenButton.classList.add('hidden');
        setTimeout(() => {
            listen.style.display = 'none';
            console.log(listenButton.style.display);
            video.style.display = 'none';
            container.classList.add('visible');
            links.classList.remove('hidden');
        }, 1000);
    }, 1000);
});