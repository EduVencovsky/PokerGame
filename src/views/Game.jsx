import React, { useState, useEffect } from "react";
import CardDisplay from "../components/Card";
import io from "socket.io-client";

const socket = io("http://localhost:8080");

const playerName = "Edu" + Math.random();

export default function Game() {
  const [playerCards, setPlayerCards] = useState([]);
  const [playerId, setPlayerId] = useState(null);
  const [gameId, setGameId] = useState(null);
  const handlePlayerId = ({ id }) => setPlayerId(id);
  const handleGameId = ({ id }) => setGameId(id);

  useEffect(() => {
    socket.emit("playerConnection", { playerName });
    socket.on("playerId", handlePlayerId);
    return () => {
      socket.off("playerId", handlePlayerId);
    };
  }, []);

  useEffect(() => {
    if (playerId) {
      socket.emit("gameConnection", { playerId });
      socket.on("gameId", handleGameId);
      return () => {
        socket.off("gameId", handleGameId);
      };
    }
  });

  useEffect(() => {
    socket.on(gameId + "#" + playerId, ({ cards, tableCards }) => {
      console.log(cards);
      setPlayerCards(cards);
    });
  }, [gameId, playerId]);

  return (
    <div>
      <div>
        {playerCards.map(card => (
          <CardDisplay key={card.toString()} card={card} />
        ))}
      </div>
    </div>
  );
}
