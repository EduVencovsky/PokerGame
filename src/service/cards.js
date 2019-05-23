export const cardsDisplay = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A"
];

export const suits = {
  club: "♣️",
  heart: "♥️",
  spade: "♠️",
  diamond: "♦️"
};

class Cards {
  constructor(value, suit) {
    this.value = value;
    this.suit = suit;
    this.display = cardsDisplay[value - 2];
  }

  toString = () => {
    return `${this.display}${suits[this.suit]}`;
  };
}

export const generateCards = () => {
  let cards = [];
  Object.keys(suits).forEach(suit => {
    for (let i = 2; i <= 14; i++) {
      cards.push(new Cards(i, suit));
    }
  });
  return cards;
};

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const shuffleCards = cards => {
  for (let i = 0; i < cards.length; i++) {
    let randomInt = getRandomInt(0, cards.length - 1);
    let temp = cards[i];
    cards[i] = cards[randomInt];
    cards[randomInt] = temp;
  }
  return cards;
};

export const generateShuffledCards = () => {
  return shuffleCards(generateCards());
};
