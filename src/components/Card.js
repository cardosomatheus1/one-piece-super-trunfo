import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
  render() {
    const { cardName, cardDescription, cardAttr1, cardAttr2,
      cardAttr3, cardImage, cardRare, cardTrunfo } = this.props;
    return (
      [
        <div key={ cardDescription } className="cart">
          <h1 data-testid="name-card">{cardName}</h1>
          <img
            className="imagem"
            data-testid="image-card"
            src={ cardImage }
            alt={ cardName }
          />
          <p data-testid="description-card">{cardDescription}</p>
          <p data-testid="attr1-card">{`Força  ..................${cardAttr1}`}</p>
          <p data-testid="attr2-card">{`Velocidade ..............${cardAttr2}`}</p>
          <p data-testid="attr3-card">{`Inteligencia ............${cardAttr3}`}</p>
          <p data-testid="rare-card">{cardRare}</p>
          {cardTrunfo ? <p data-testid="trunfo-card">Super Trunfo</p> : ''}
        </div>,
      ]
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.string,
  cardAttr2: PropTypes.string,
  cardAttr3: PropTypes.string,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.boolean,
}.isRequired;

export default Card;
