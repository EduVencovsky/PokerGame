export class Player {
  constructor(name, chips = 1000) {
    this.name = name;
    this.chips = chips;
    this.cards = [];
    this.cardsRank = null;
  }

  setHandRank = rank => (this.cardsRank = rank);
  receiveOneCard = card => this.cards.push(card);
}
