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
      this.players.forEach(player => {
        let card = this.popCards();
        card.place = "player";
        player.receiveOneCard(card);
      });
      let card = this.popCards();
      card.place = "table";
      this.tableCards.push(card);
      this.burnCard();
    }
    this.popCards(3).forEach(card => {
      card.place = "table";
      this.tableCards.push(card);
    });
  };
}
