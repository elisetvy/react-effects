import { useState, useEffect } from "react";
import Card from "./Card";

/**Component for rendering and tracking a deck of playing cards.
 * State:
 *  -deck
 *  -hand
 *
 * Props:
 *  -none
 * App -> Deck -> Card
 */
function Deck() {
  const [deck, setDeck] = useState(null);
  const [hand, setHand] = useState([]);

  /** Fetches new deck on render. */
  useEffect(function fetchDeckOnRender() {
    async function fetchDeck() {
      const resp = await fetch("https://deckofcardsapi.com/api/deck/new/");
      const data = await resp.json();
      setDeck(data.deck_id);
    }
    fetchDeck();
  }, []);

  /**Get another card from deck using unique deck ID. */
  async function drawCard() {
    const resp = await fetch(
      `https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`
    );
    const data = await resp.json();
    setHand((h) => [...h, data.cards[0]]);
  }

  let isDisabled = false;

  async function shuffleDeck() {
    isDisabled = true;
    console.log(isDisabled, "BEFORE FETCH")
    await fetch(
      `https://deckofcardsapi.com/api/deck/${deck}/shuffle/`
      );
    isDisabled = false;
    console.log(isDisabled, "AFTER FETCH")
    setHand([]);
  }

  return (
    <>
      {hand.length === 52 ? (
        <h1>No more cards!</h1>
      ) : (
        <div>
          <button onClick={shuffleDeck} disabled={isDisabled}>Shuffle Deck</button>
          <button onClick={drawCard}>GIMME A CARD!</button>
        </div>
      )}
      <br></br>
      {hand.map((c) => (
        <Card card={c} key={c.code} />
      ))}
    </>
  );
}

export default Deck;
