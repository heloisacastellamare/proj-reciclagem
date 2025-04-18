const items = ['Lata', 'Lata', 'Alimento', 'Alimento', 'Plástico', 'Plástico', 'Potes', 'Potes', 'Jornais', 'Jornais', 'Garrafas', 'Garrafas']; // Pares de cartas
let gameBoard = document.getElementById('game-board');
let firstCard, secondCard;
let isBoardLocked = false;

// Função para embaralhar as cartas
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function createCards() {
  shuffle(items);
  items.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-item', item);
    card.innerHTML = '?';
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (isBoardLocked) return;

  this.classList.add('flip');
  this.innerHTML = this.getAttribute('data-item');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;

  checkMatch();
}

function checkMatch() {
  isBoardLocked = true;

  const match = firstCard.getAttribute('data-item') === secondCard.getAttribute('data-item');
  setTimeout(() => {
    if (match) {
      firstCard.style.pointerEvents = 'none';
      secondCard.style.pointerEvents = 'none';
    } else {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      firstCard.innerHTML = '?';
      secondCard.innerHTML = '?';
    }
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  isBoardLocked = false;
}

// Inicializa o jogo
createCards();
