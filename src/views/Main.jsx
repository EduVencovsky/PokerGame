import React, { useState } from "react";
import { Game } from "../service/game";
import { Player } from "../service/players";
import { Card } from "../service/cards";

export default function Main() {
  const [game, setGame] = useState(null);

  const startGame = () => {
    const player1 = new Player("player1");
    const player2 = new Player("player2");
    const game = new Game([player1, player2]);
    setGame(game);
    game.givePlayersCards();
  };

  return (
    <div>
      {!game ? (
        <div>
          <h1>Hey</h1>
          <button onClick={startGame}>Start</button>
        </div>
      ) : (
        game.players.map(player => (
          <div>
            <h1>{player.name} </h1>
            <h3>
              {player.cards.map(card => (
                <span>{card.toString()}</span>
              ))}
            </h3>
          </div>
        ))
      )}
    </div>
  );
}
