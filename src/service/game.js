import { generateShuffledCards } from "./cards";

export class Game {
  constructor(players) {
    this.players = players;
    this.cards = generateShuffledCards();
    this.tableCards = [];
    this.pot = 0;
    this.burnCards = [];
  }

  burnCard = () => {
    this.burnCards.push(this.popCards());
  };

  popCards = (quantity = null) => {
    return quantity ? this.cards.splice(-quantity) : this.cards.pop();
  };

  givePlayersCards = () => {
    for (let i = 0; i < 2; i++) {
      this.players.map(player => player.receiveOneCard(this.popCards()));
      this.tableCards.push(this.popCards());
      this.burnCard();
    }
    this.popCards(3).map(card => this.tableCards.push(card));
  };
}
