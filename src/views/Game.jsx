import React, { useState, useEffect } from "react";
import CardDisplay from "../components/Card";
import io from "socket.io-client";

const API = "http://localhost:8080/";
const socket = io(API);

const playerName = "Edu" + Math.random();

export default function Game() {
  const [playerCards, setPlayerCards] = useState([]);
  const [table, setTable] = useState([]);
  const [playerId, setPlayerId] = useState(null);
  const [tableId, setTableId] = useState(null);

  const setCards = ({ cards, tableCards }) => {
    console.log(cards);
    console.log(tableCards);
    setTable(tableCards);
    setPlayerCards(cards);
  };

  useEffect(() => {
    console.log(JSON.stringify({ playerName }));
    fetch(API + "joinPlayer", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ playerName })
    })
      .then(res => res.json())
      .then(({ id }) => setPlayerId(id));
  }, []);

  useEffect(() => {
    if (playerId) {
      fetch(API + "joinTable", {
        method: "POST",
        body: JSON.stringify({ playerId }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(({ id }) => setTableId(id));
    }
  }, [playerId]);

  useEffect(() => {});

  useEffect(() => {
    if (tableId && playerId) {
      socket.on(playerId, setCards);
      return () => {
        socket.off(playerId, setCards);
      };
    }
  }, [tableId, playerId]);

  return (
    <div>
      <h1>Table cards</h1>
      <div>
        {table.map(card => (
          <CardDisplay key={card.display.toString()} card={card} />
        ))}
      </div>
      <h1>Hand cards</h1>
      <div>
        {playerCards.map(card => (
          <CardDisplay key={card.display.toString()} card={card} />
        ))}
      </div>
    </div>
  );
}
