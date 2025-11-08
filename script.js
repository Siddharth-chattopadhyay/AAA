const images = [
    {
        "img": "images/galaxy.jpg",
        "caption": "Galaxy"
    },
    {
        "img": "images/bird.jpg",
        "caption": "Bird"
    },
    {
        "img": "images/japan-temple.jpg",
        "caption": "Japan Temple"
    }
];

function setImage(img, caption) {
    imageObj.setAttribute("src", img);
    imageObj.setAttribute("alt", caption);
    imageCaption.innerHTML = caption;
}

const imageObj = document.querySelector("#carousel > img");
const imageCaption = document.querySelector("#carousel > #caption");

let isPaused = false;

const playstatebtn = document.getElementById("playstate");
playstatebtn.addEventListener("click", function(){
    isPaused = !isPaused;
    if (isPaused)
        playstatebtn.innerHTML = "Play";
    else
        playstatebtn.innerHTML = "Pause"; 
});

let index = 0;
setImage(images[index].img, images[index++].caption);
setInterval(function () {
    if (isPaused) return;
    const select = images[index++ % images.length];
    setImage(select.img, select.caption);
}, 1000 * 3);