import React from "react";

export default function Card(props) {
  const { card } = props;
  return <div className="border border-dark">{card.toString()}</div>;
}
