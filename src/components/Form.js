import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  render() {
    const { cardName, cardDescription, cardAttr1, cardAttr2,
      cardAttr3, cardImage, cardRare, cardTrunfo, hasTrunfo,
      isSaveButtonDisabled, onInputChange, onSaveButtonClick } = this.props;
    return (
      <form className="form">
        <label htmlFor="name">
          Nome
          <input
            id="name"
            data-testid="name-input"
            type="text"
            name="cardName"
            value={ cardName }
            onChange={ onInputChange }
            required
          />
        </label>
        <label htmlFor="textArea">
          Descrição
          <textarea
            id="textArea"
            data-testid="description-input"
            name="cardDescription"
            value={ cardDescription }
            onChange={ onInputChange }
            required
          />
        </label>
        <label htmlFor="attr1">
          Força
          <input
            id="attr1"
            data-testid="attr1-input"
            type="number"
            name="cardAttr1"
            value={ cardAttr1 }
            onChange={ onInputChange }
            required
            min="0"
            max="90"
          />
        </label>
        <label htmlFor="attr2">
          Velocidade
          <input
            id="attr2"
            data-testid="attr2-input"
            type="number"
            name="cardAttr2"
            value={ cardAttr2 }
            onChange={ onInputChange }
            required
            min="0"
            max="90"
          />
        </label>
        <label htmlFor="atrr3">
          Inteligência
          <input
            id="atrr3"
            data-testid="attr3-input"
            type="number"
            name="cardAttr3"
            value={ cardAttr3 }
            onChange={ onInputChange }
            required
            min="0"
            max="90"
          />
        </label>
        <label htmlFor="image">
          Imagem
          <input
            id="image"
            data-testid="image-input"
            type="text"
            name="cardImage"
            value={ cardImage }
            onChange={ onInputChange }
            required
          />
        </label>
        <label htmlFor="rare">
          Raridade
          <select
            id="rare"
            data-testid="rare-input"
            name="cardRare"
            value={ cardRare }
            onChange={ onInputChange }
            required
          >
            <option>normal</option>
            <option>raro</option>
            <option>muito raro</option>
          </select>
        </label>
        {hasTrunfo ? (<p>Você já tem um Super Trunfo em seu baralho</p>
        ) : (
          <label id="check" htmlFor="checkbox">
            <input
              id="checkbox"
              type="checkbox"
              data-testid="trunfo-input"
              name="cardTrunfo"
              checked={ cardTrunfo }
              onChange={ onInputChange }
            />
            <label id="check" htmlFor="checkbox"></label>
            Super Trybe Trunfo
          </label>)}
        <button
          data-testid="save-button"
          type="submit"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
        >
          Salvar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.string,
  cardAttr2: PropTypes.string,
  cardAttr3: PropTypes.string,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.boolean,
  hasTrunfo: PropTypes.boolean,
  isSaveButtonDisabled: PropTypes.boolean,
  onInputChange: PropTypes.callback,
  onSaveButtonClick: PropTypes.callback,
}.isRequired;
export default Form;
