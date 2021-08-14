const gameButton = document.querySelector('.start');
const gameContainer = document.querySelector('.main-container.game');
const gameOverlay = document.querySelector('.game-overlay');
let userSelection=[];

function startApp(){
    asignImages();
    window.addEventListener('DOMContentLoaded', ()=>{
        setTimeout(styleOverlay,500);
    })
    gameButton.onclick=startGame;
}

function startGame(){ //ACTUALIZAR!!
    styleOverlay();
    gameButton.onclick=restart;
    userSelection=[];
    unblockUserInput();
}

function restart(){
    cleanCards();
    asignImages();
    styleOverlay();
    userSelection=[];
    unblockUserInput();
}

function userWon(){
    if(!document.querySelector('.userWon-p')){
        const result=document.createElement('H2');
        result.textContent="Ganaste!";
        result.classList.add('userWon-p');
        gameOverlay.prepend(result);
    }
    gameButton.textContent="Empezar de Nuevo!";
    setTimeout(styleOverlay,500);
}


function blockUserInput(){
    const covers=document.querySelectorAll('.cover');
    covers.forEach( cover => {
        cover.onclick=()=>{}
    })
}

function unblockUserInput(){
    const covers=document.querySelectorAll('.cover');

    covers.forEach( cover => {
        if(cover.firstElementChild.classList.contains('transparent')){
            cover.onclick=manageInput;
        }
    })
}

function manageInput(e){
    let img=e.target;
    if(!e.target.tagName == 'IMG'){
        img=e.target.firstElementChild;
        console.log(img);
    }
    userSelection.push(img);
    img.classList.remove('transparent');
    img.classList.add('visible');
    testSelection();
}

function testSelection(){
    if (userSelection.length == 2){
        blockUserInput();
        if(userSelection[0].src==userSelection[1].src){
            userSelection=[];
            if(document.querySelectorAll('.transparent').length==0){
                userWon();
            }
            unblockUserInput();
        } else{
            setTimeout(()=>{
                userSelection.forEach( img =>{
                    img.classList.remove('visible');
                    img.classList.add('transparent');
                })
                userSelection=[];
                unblockUserInput();
            },500);
            
        }
    }
}

function asignImages(){
    const cards=document.querySelectorAll('.cover');
    const asigmentsCounter=[0,0,0,0,0,0];
    let i=0;
    while(i<cards.length){
        let j=Math.floor(Math.random()*(cards.length/2));
        if(!(asigmentsCounter[j]==2)){
            let img = document.createElement('IMG');
            img.src=`build/img/${j+1}.jpg`;
            img.classList.add('transparent');
            cards[i].appendChild(img);
            asigmentsCounter[j]++;
            i++;
        }
    }

}

function cleanCards(){
    const covers=document.querySelectorAll('.cover');
    covers.forEach( cover => {
        cover.firstElementChild.remove();
    })
}

function styleOverlay(){
    gameOverlay.classList.toggle('overlay-on');
}

document.addEventListener('DOMContentLoaded', ()=>{
    startApp();
})