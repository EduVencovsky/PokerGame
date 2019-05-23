import React, { useState } from "react";
import { Game } from "../service/game";
import { Player } from "../service/players";
import Card from "../components/Card";

export default function Main() {
  const [game, setGame] = useState(null);

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
        <button onClick={startGame}>{game ? "Restart" : "Start"}</button>
      </div>

      {game ? (
        <div>
          <h1>{game.pot}</h1>
          <div className="row">
            {game.tableCards.map(card => (
              <Card key={card.toString()} card={card} />
            ))}
          </div>
          {game.players.map(player => (
            <div key={player.name} className="row">
              <h1>{player.name} </h1>
              <button>Bet 10</button>
              <div>
                {player.cards.map(card => (
                  <Card key={card.toString()} card={card} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}