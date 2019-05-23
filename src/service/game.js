import { generateShuffledCards } from "./cards";

export class Game {
  constructor(players) {
    this.players = players;
    this.cards = generateShuffledCards();
    this.pot = 0;
  }

  givePlayersCards = () => {
    this.players.map(player => player.receiveCards(this.cards.splice(-2)));
  };
}
