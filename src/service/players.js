export class Player {
  constructor(name, chips = 1000) {
    this.name = name;
    this.chips = chips;
    this.cards = [];
  }

  receiveOneCard = card => this.cards.push(card);
}
