import React from 'react';

class PlayGame extends React.Component {
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
          <p>{cardDescription}</p>
          <p>{`Atributo 1 ..............${cardAttr1}`}</p>
          <p>{`Atributo 2 ..............${cardAttr2}`}</p>
          <p>{`Atributo 3 ..............${cardAttr3}`}</p>
          <p>{cardRare}</p>
          {cardTrunfo ? <p data-testid="trunfo-card">Super Trunfo</p> : ''}
        </div>,
      ]
    );
  }
}

export default PlayGame;
