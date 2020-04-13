const cards = document.querySelectorAll('.memory-card');

//when player clicks a card we want to know if it's the first or second card. Set those variables. Lock if it's not a match until unflipping is done.
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    //console.log('clicked!');
    //console.log('this')
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;
        //console.log({hasFlippedCard, firstCard});
        return;
    }

    // else second click false
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
    // if it's a match, remove event listener. If no match, we won't flip cards with 1500 set timeout to see flipping.  
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

// loop through list and attach event listenter to each card and execute flicCard function.
cards.forEach(card => card.addEventListener('click', flipCard));

/*
1. query selector
2. loop through cards
3. access classList of memory card and toggle(if there remove, if not, add it) the flip class. Add css to memory-card.flip
4. store cards after player clicks to know if it's the first or second card. 
5. add data attribute and call it data-framework on html. The data attribute will be applied in the checkForMatch function
6. set flipping
7. Refactor. Have functions: flipCard, checkForMatch, disableCards, unflipCards. Ternary operator in the checkForMatch.
8. If not match, lock board until cards finish unflipping. Unlock it after cards have been flipped
9. Add a condition to flip card to avoid matching if one card is clicked twice. Set firstCard and secondCard to null in resetBoard method.
10. Shuffle cards. Will use flex box property order. Order defaults to 0. Generate a random number from 0-11 to assign it to the cards. Wrap it 
     in the paraenthesis of resetBoard to invoke Iife.*/