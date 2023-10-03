/**Component representing an individual playing card.
 * State: none
 *
 * Props:
 *  -card
 * Deck -> Card
 */
function Card({ card }) {
  return <img src={card.image} width="100px" />;
}

export default Card;
