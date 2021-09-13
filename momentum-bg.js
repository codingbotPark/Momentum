const body = document.querySelector("body");

const IMG_NUMBER = 3;

function painImage(imgNumber){
    const image = new Image();
    image.src = `/images/${imgNumber}.jpg`;
    image.classList.add("bgImage");
    body.appendChild(image);
}

function genRandom() {
    //Math.random()을 활용해 랜덤적인 수를 만들 수 있다 
    //Math.random() * 5 를 한다면 5까지의 수중 랜덤한 수를 만들 수 있다
    //Math.floor() 는 값을 내림, Math.ceil() 은 값을 올림
    const number = Math.ceil(Math.random() * 6);
    return number;
}

function init() {
    const randomNumber = genRandom();
    painImage(randomNumber);
}

init();