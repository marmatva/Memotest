const URL = "http://127.0.0.1:8080/game.html";
const CARDS_NUMBER=12;

describe('Checks the status of the page', ()=>{
    it('Visit the page', ()=>{
        cy.visit(URL);

        cy.get('.game-overlay').should('be.visible');

        cy.contains('Start!').click();
    })

    it('Check the randomness of the images', ()=>{
        let originalPositions =[];
        
        cy.get('img.transparent').then(images=>{
            images.each(function(i, img){
                originalPositions.push(img.src);
            })
        })

        cy.visit(URL);
        cy.contains('Start!').click();

        let newPositions =[];
        
        cy.get('img.transparent').then(images=>{
            images.each(function(i, img){
                newPositions.push(img.src);
            })
        })

        cy.wrap(originalPositions).should('not.deep.equal', newPositions);
    })
    
    describe('Plays the game', ()=>{
        let pairsMap, pairsList;
        it('Select a wrong pair', ()=>{
            cy.get('img.transparent').then(images => {
                pairsMap = obtainPairs(images);
                pairsList = Object.values(pairsMap);

                pairsList[0][0].click();
                pairsList[1][0].click();

                cy.get('img.transparent').should('have.length', CARDS_NUMBER);
            })
        })

        it('Solves the game', ()=>{

            pairsList.forEach(pair=>{
                pair[0].click();
                pair[1].click();
            })

            cy.get('div.found').should('have.length',CARDS_NUMBER);
            cy.get('img.transparent').should('have.length',0);

            cy.get('.game-overlay').should('be.visible');

            cy.get('.userWon-p').should('have.text', 'Ganaste!')
            
        })

        it('Tries to Play Again', ()=>{
            cy.contains('Empezar de Nuevo').click();
            cy.get('.game-overlay').should('not.be.visible');
            cy.get('div.found').should('have.length',0);
            cy.get('img.transparent').should('have.length', CARDS_NUMBER);
        })
    })

})


function obtainPairs(images){
    const pairs={};

    images.each((i, img)=>{
        let src = img.src.replace('http://127.0.0.1:8080/build/', '').replace('.jpg', '').replace('/', '-');
        if(pairs[src]){
            pairs[src].push(img);
        } else{
            pairs[src]=[img];
        }
    })

    return pairs;
}