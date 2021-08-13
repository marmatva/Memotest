const gameButton = document.querySelector('.start');
const gameContainer = document.querySelector('.main-container.game');
let userSelection=[];

function startApp(){
    asignImages();
    gameButton.onclick=startGame;
}

function startGame(){
    gameButton.textContent="Reiniciar";
    gameButton.onclick=restart;
    userSelection=[];
    unblockUserInput();
}

function restart(){
    cleanCards();
    asignImages();
    if(gameContainer.classList.contains('invisible')){
        gameContainer.classList.remove('invisible');
    }
    userSelection=[];
    unblockUserInput();
}

function userWon(){
    const div= document.querySelector('.game-result');

    const result=document.createElement('H2');
    result.textContent="Ganaste!";
    
    setTimeout(()=>{
        gameContainer.classList.add('invisible');
        div.appendChild(result);
        gameButton.textContent="Empezar de Nuevo!"
    },500);
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
    img=e.target.firstElementChild;
    userSelection.push(img);
    img.classList.remove('transparent');
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
                    img.classList.add('transparent')
                })
                userSelection=[];
                unblockUserInput();
            },1000);
            
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

document.addEventListener('DOMContentLoaded', ()=>{
    startApp();
})