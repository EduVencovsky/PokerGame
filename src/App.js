import React from "react";
import logo from "./logo.svg";
import "./App.css";

const cardsDisplay = [
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

const suits = {
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

const generateCards = () => {
  let cards = [];
  Object.keys(suits).forEach(suit => {
    for (let i = 2; i <= 14; i++) {
      cards.push(new Cards(i, suit));
    }
  });
  return cards;
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const shuffleCards = cards => {
  for (let i = 0; i < cards.length; i++) {
    let randomInt = getRandomInt(0, cards.length - 1);
    let temp = cards[i];
    cards[i] = cards[randomInt];
    cards[randomInt] = temp;
  }
};

function App() {
  const cards = generateCards();
  shuffleCards(cards);
  console.log(cards)
  return (
    <div>
        {cards.map(card => card.toString())}
    </div>
  );
}

export default App;
