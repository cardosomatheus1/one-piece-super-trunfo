import React from 'react';
import Card from './components/Card';
import Form from './components/Form';
import './App.css';

class App extends React.Component {
  state ={
    cardName: '',
    cardDescription: '',
    cardAttr1: '0',
    cardAttr2: '0',
    cardAttr3: '0',
    cardImage: '',
    cardRare: 'normal',
    cardTrunfo: '',
    hasTrunfo: false,
    isSaveButtonDisabled: true,
    savedCard: [],
    filterName: '',
    filterAble: false,
    filterRare: 'todas',
    filterTrunfo: false,
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, () => this.testValueMax());
  }

  testValueMax = () => {
    const maxValue = 210;
    const maxNumber = 90;
    const minNumber = 0;
    const { cardAttr1, cardAttr2, cardAttr3, cardName,
      cardDescription, cardImage } = this.state;
    const sumValue = parseInt(cardAttr1, 10)
    + parseInt(cardAttr2, 10) + parseInt(cardAttr3, 10);
    if (cardAttr3 > maxNumber
      || cardAttr1 > maxNumber
      || cardAttr2 > maxNumber
      || cardAttr3 < minNumber
      || cardAttr1 < minNumber
      || cardAttr2 < minNumber
      || sumValue > maxValue
      || !cardName
      || !cardDescription
      || !cardImage) {
      this.setState({
        isSaveButtonDisabled: true,
      });
    } else {
      this.setState({
        isSaveButtonDisabled: false,
      });
    }
  }

  onSaveButtonClick = (event) => {
    event.preventDefault();
    const { cardAttr1, cardAttr2, cardAttr3, cardName, cardDescription,
      cardRare, cardTrunfo, cardImage, hasTrunfo, savedCard } = this.state;
    const newCard = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
    };
    this.setState({
      savedCard: [...savedCard, newCard],
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: '',
    });
    if (cardTrunfo) {
      this.setState({
        hasTrunfo: true,
      });
    }
  }

  filterCardsByName = ({ target }) => {
    this.setState({ filterName: target.value.toLowerCase() });
  }

  filterCardsByRare = ({ target }) => {
    this.setState({ filterRare: target.value });
  }

   filterCardsByTrunfo = ({ target }) => {
     const { filterTrunfo } = this.state;
     this.setState({ filterTrunfo: target.checked });
     if (filterTrunfo === true) {
       this.setState({ filterAble: false });
     } else {
       this.setState({ filterAble: true });
     }
   }

  onDeletedButtonClick = ({ target }) => {
    const { savedCard } = this.state;
    const trunfo = savedCard.find((save) => save.cardName === target.name);
    console.log(trunfo);
    if (trunfo.cardTrunfo === true) {
      this.setState({ hasTrunfo: false });
    }
    const filterCard = savedCard.filter((save) => save.cardName !== target.name);
    this.setState({ savedCard: filterCard });
  }

  render() {
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3,
      cardImage, cardRare, cardTrunfo, hasTrunfo, isSaveButtonDisabled,
      savedCard, filterName, filterRare, filterTrunfo, filterAble } = this.state;
    return (
      <div>
        <h1>Tryunfo</h1>
        <div className="container">
          <Form
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
            hasTrunfo={ hasTrunfo }
            isSaveButtonDisabled={ isSaveButtonDisabled }
            onInputChange={ this.onInputChange }
            onSaveButtonClick={ this.onSaveButtonClick }
          />
          <div className="card">
            <Card
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardImage={ cardImage }
              cardRare={ cardRare }
              cardTrunfo={ cardTrunfo }
              hasTrunfo={ hasTrunfo }
            />
          </div>
        </div>
        <div className="card1">
          <input
            disabled={ filterAble }
            type="text"
            data-testid="name-filter"
            placeholder="Nome da carta"
            onChange={ this.filterCardsByName }
          />
          <select
            disabled={ filterAble }
            onChange={ this.filterCardsByRare }
            data-testid="rare-filter"
          >
            <option>todas</option>
            <option>normal</option>
            <option>raro</option>
            <option>muito raro</option>
          </select>
          <label htmlFor="trunfo">
            <input
              type="checkbox"
              id="trunfo"
              data-testid="trunfo-filter"
              onChange={ this.filterCardsByTrunfo }
            />
            Super Trunfo
          </label>
          {savedCard.filter((nameCards) => nameCards.cardName.toLowerCase()
            .includes(filterName))
            .filter((rareCards) => (filterRare === 'todas'
              ? rareCards : rareCards.cardRare === filterRare))
            .filter((trunfoCards) => (filterTrunfo === false ? trunfoCards
              : trunfoCards.cardTrunfo === true))
            .map((card) => (
              <div key={ card.cardName }>
                <Card
                  cardName={ card.cardName }
                  cardDescription={ card.cardDescription }
                  cardAttr1={ card.cardAttr1 }
                  cardAttr2={ card.cardAttr2 }
                  cardAttr3={ card.cardAttr3 }
                  cardImage={ card.cardImage }
                  cardRare={ card.cardRare }
                  cardTrunfo={ card.cardTrunfo }
                  hasTrunfo={ card.hasTrunfo }
                />
                <button
                  type="button"
                  data-testid="delete-button"
                  onClick={ this.onDeletedButtonClick }
                  name={ card.cardName }
                >
                  Remover
                </button>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default App;
