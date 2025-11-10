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
const imageObj = document.querySelector("#carousel > img");
const imageCaption = document.querySelector("#textfield > #caption");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const playstatebtn = document.getElementById("playstate");
const errorField = document.getElementById("error");

const newPath = document.getElementById("path");
const newCap = document.getElementById("uploadcaption");
const finalUploadBtn = document.getElementById("upload");

const uploadBox = document.getElementById("newimageform");

const showUpload = document.getElementById("sup");
const hideUpload = document.getElementById("uploadClose");

let isPaused = true;
let intervalHandle = undefined;
let index = 0;

showUpload.addEventListener("click", () => {
    uploadBox.style.display = "flex";
});

finalUploadBtn.addEventListener("click", () => {
    images.push({"img": newPath.value, "caption": newCap.value});
    newPath.value = newCap.value = "";
    uploadBox.style.display = "none";
    setImageIndex(index);
});


hideUpload.addEventListener("click", () => {
    uploadBox.style.display = "none";
});




function showSlide(img, caption) {
    imageObj.setAttribute("src", img);
    imageObj.setAttribute("alt", caption);
    imageCaption.innerHTML = caption;
}

playstatebtn.addEventListener("click", function(){
    if (intervalHandle === undefined)
        intervalHandle = setInterval(interval, 1000 * 3);
    isPaused = !isPaused;
    if (isPaused)
        playstatebtn.innerHTML = "Play";
    else
        playstatebtn.innerHTML = "Pause"; 
});

function setImageIndex(index){
    if (index < 0) {
        errorField.innerHTML = "This is the first slide";
        return 0;
    }
    if (index === images.length) {
        errorField.innerHTML = "This is the last slide";
        return images.length - 1;
    }
    if (index > images.length) {
        errorField.innerHTML = "Invalid slide index";
        return images.length - 1;
    }
    else {
        showSlide(images[index].img, `${images[index].caption} [${index + 1}/${images.length}]`);
        errorField.innerHTML = "";
        return index;
    }
}

function interval() {
    if (index >= images.length - 1) {
        clearInterval(intervalHandle);
        playstatebtn.innerHTML = "Auto Play";
        intervalHandle = undefined;
        isPaused = !isPaused;
        return;
    };
    if (isPaused) return;
    index = setImageIndex(++index);
}

index = setImageIndex(index);

next.addEventListener("click", function(){
    if (intervalHandle !== undefined){
        clearInterval(intervalHandle);
        intervalHandle = setInterval(interval, 1000 * 3);
    }
    index = setImageIndex(++index);
});

prev.addEventListener("click", function(){
    if (intervalHandle !== undefined){
        clearInterval(intervalHandle);
        intervalHandle = setInterval(interval, 1000 * 3);
    }
    index = setImageIndex(--index);
});