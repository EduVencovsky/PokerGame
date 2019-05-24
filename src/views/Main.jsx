import React, { useState } from "react";
import { Game } from "../service/game";
import { Player } from "../service/players";
import { checkHand, Cards } from "../service/cards";
import CardDisplay from "../components/Card";

export default function Main() {
  const [game, setGame] = useState(null);
  const [sevenCards, setSevenCards] = useState("");
  const [pokerHand, setPokerHand] = useState("");

  const checkSevenCards = () => {
    let cards = sevenCards
      .split(" ")
      .map(txtCard => new Cards(...txtCard.split("-")));
    console.log(cards);
    console.log(checkHand(cards));
    setPokerHand(checkHand(cards));
  };

  const startGame = () => {
    const player1 = new Player("player1");
    const player2 = new Player("player2");
    const game = new Game([player1, player2]);
    game.givePlayersCards();
    setGame(game);
  };

  return (
    <div className="m-5">
      <div>
        <input
          value={sevenCards}
          onChange={e => setSevenCards(e.target.value)}
        />
        <button onClick={checkSevenCards}>Check 7 Cards</button>
      </div>
      <div>{pokerHand}</div>
      <div>
        <button onClick={startGame}>{game ? "Restart" : "Start"}</button>
      </div>
      {game ? (
        <div>
          <h1>{game.pot}</h1>
          <div className="row">
            {game.tableCards.map(card => (
              <CardDisplay key={card.toString()} card={card} />
            ))}
          </div>
          {game.players.map(player => (
            <div key={player.name} className="row">
              <h1>{player.name} </h1>
              <button>Bet 10</button>
              <button onClick={() => checkHand(player.cards, game.tableCards)}>
                Check Hand
              </button>
              <div>
                {player.cards.map(card => (
                  <CardDisplay key={card.toString()} card={card} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
