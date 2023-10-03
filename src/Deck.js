import { useState, useEffect } from "react";

function Deck() {
  const [ deck, setDeck ] = useState(null);
  const [ hand, setHand ] = useState([]);

  /** Fetches new deck on render. */
  useEffect(function fetchDeckOnRender() {
    async function fetchDeck() {
      const resp = await fetch("https://deckofcardsapi.com/api/deck/new/");
      const data = await resp.json();
      setDeck(data.deck_id);
    }
    fetchDeck();
  }, []);

  async function drawCard() {
    const resp = await fetch(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`);
    const data = await resp.json();
    setHand(h => [...h, data.cards[0]]);
  }

  return (
    <>
    <button onClick={drawCard}>GIMME A CARD!</button>
    {hand.map(h => <Card card={h} />)}
    </>
  )
}

export default Deck;