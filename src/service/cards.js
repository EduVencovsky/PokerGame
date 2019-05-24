export const pokerHands = [
  "Royal Flush",
  "Straight Flush",
  "Four of a Kind",
  "Full House",
  "Flush",
  "Straight",
  "Three of a Kind",
  "Two Pair",
  "Pair",
  "High Card"
];

export const cardsValue = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14
};

export const suits = {
  c: "♣️",
  h: "♥️",
  s: "♠️",
  d: "♦️"
};

export class Cards {
  constructor(value, suit) {
    this.value = cardsValue[value];
    this.suit = suit;
    this.display = value + suits[suit];
  }

  toString = () => this.display;
}

export const generateCards = () => {
  let cards = [];
  Object.keys(suits).forEach(suit => {
    Object.keys(cardsValue).forEach(x => cards.push(new Cards(x, suit)));
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

export const checkHand = (playerCards, tableCards = []) => {
  let cards = [...playerCards, ...tableCards];
  if (cards.length < 5) {
    return "Invalid";
  }
  let flushCards = checkFlush(cards);
  if (flushCards) {
    let topFlushCards = flushCards
      .sort((a, b) => b.value - a.value)
      .splice(0, 5); //get first 5 biggest flush cards
    if (checkRoyalFlush(topFlushCards)) {
      console.log(pokerHands[0], topFlushCards);
      return pokerHands[0];
    }
    if (checkStraight(flushCards)) {
      console.log(pokerHands[1], flushCards);
      return pokerHands[1];
    }
    console.log(pokerHands[4], topFlushCards);
    return pokerHands[4];
  }
};

// Check A K 6 5 4 3 2 Flush case
export const checkAceEqualsOne = cards => {
  cards.sort((a, b) => {
    let valueA = a.value === 14 ? 1 : a.value;
    return b.value - valueA;
  });
  let count = 0;
  for (let i = 0; i < cards.length - 1; i++) {
    let valueI = cards[i].value === 14 ? 1 : cards[i].value;
    let valueI1 = cards[i + 1].value === 14 ? 1 : cards[i + 1].value;
    count = valueI - valueI1 === 1 ? count + 1 : 0;
  }
  return count >= 4;
};

export const checkStraight = cards => {
  cards.sort((a, b) => b.value - a.value);
  // Check A K 6 5 4 3 2 Straight case
  if (cards[0].value === 14 && cards[1].value !== 13 && cards[2].value !== 12) {
    return checkAceEqualsOne(cards);
  }
  let count = 0;
  for (let i = 0; i < cards.length - 1; i++) {
    count = cards[i].value - cards[i + 1].value === 1 ? count + 1 : 0;
  }
  return count >= 4;
};

export const checkRoyalFlush = cards =>
  cards[0].value === 14 &&
  cards[1].value === 13 &&
  cards[2].value === 12 &&
  cards[3].value === 11 &&
  cards[4].value === 10;

export const checkFlush = cards => {
  let suitsCount = {
    c: [],
    h: [],
    s: [],
    d: []
  };

  cards.forEach(card => {
    suitsCount[card.suit].push(card);
  });
  let flushSuit = Object.keys(suitsCount).filter(
    suit => suitsCount[suit].length >= 5
  )[0];
  return flushSuit ? suitsCount[flushSuit] : false;
};
