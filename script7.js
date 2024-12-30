// Emojis for the memory game cards (pairs of 8 cards)
const emojis = ['😊', '😎', '🥰', '😇', '😊', '😎', '🥰', '😇'];
let flippedCards = [];
let matchedCards = [];
let score = 0;
const cardGrid = document.getElementById('card-grid');
const scoreDisplay = document.getElementById('score');
const restartBtn = document.getElementById('restartBtn');

// Shuffle the array of emojis
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

// Create and display the cards
function createCards() {
    shuffleArray(emojis); // Shuffle the emoji array
    cardGrid.innerHTML = ''; // Clear existing cards

    emojis.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', index);

        const front = document.createElement('div');
        front.classList.add('front');

        const back = document.createElement('div');
        back.classList.add('back');
        back.textContent = emoji;

        card.appendChild(front);
        card.appendChild(back);
        card.addEventListener('click', flipCard);

        cardGrid.appendChild(card);
    });
}

// Handle card flip
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped') && !matchedCards.includes(this)) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

// Check if the flipped cards match
function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;
    const firstEmoji = firstCard.querySelector('.back').textContent;
    const secondEmoji = secondCard.querySelector('.back').textContent;

    if (firstEmoji === secondEmoji) {
        matchedCards.push(firstCard, secondCard);
        score++;
        scoreDisplay.textContent = score;

        flippedCards = [];

        // Check if all pairs are matched
        if (matchedCards.length === emojis.length) {
            setTimeout(() => {
                alert('Congratulations! You won the game!');
            }, 500);
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// Restart the game
function restartGame() {
    score = 0;
    scoreDisplay.textContent = score;
    matchedCards = [];
    flippedCards = [];
    createCards();
}

// Initialize the game
createCards();

// Event listener for the restart button
restartBtn.addEventListener('click', restartGame);
