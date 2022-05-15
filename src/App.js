import React from 'react';
import Card from './components/Card';
import Form from './components/Form';
import './App.css';

class App extends React.Component {
  cardList =localStorage.getItem('saveCard')?JSON.parse(localStorage.getItem('saveCard')):[];
  temTrunfo = localStorage.getItem('trunfo')?JSON.parse(localStorage.getItem('trunfo')):false;
  state ={
    cardName: '',
    cardDescription: '',
    cardAttr1: '0',
    cardAttr2: '0',
    cardAttr3: '0',
    cardImage: '',
    cardRare: 'normal',
    cardTrunfo: '',
    hasTrunfo: this.temTrunfo,
    isSaveButtonDisabled: true,
    savedCard: this.cardList,
    filterName: '',
    filterAble: false,
    filterRare: 'todas',
    filterTrunfo: false,
    sortCard: [],
    positionCard: 0,
    numberOfCards: this.cardList.length -1,
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
      cardDescription, cardImage} = this.state;
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

  localStore = (save) => {
   
    const stringArray = JSON.stringify(save);
    localStorage.setItem('saveCard', stringArray);
  }

  localStoreTrunfo = (save) => {
   
    const stringArray = JSON.stringify(save);
    localStorage.setItem('trunfo', stringArray);
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

  onSortCardClick = () => {
    const {savedCard} = this.state;
    const sorted = savedCard.sort(() => Math.random() - 0.5)
    this.setState({ sortCard: sorted });
  }

  nextCardClick = () => {
    const { sortCard, positionCard } = this.state;
    if (positionCard<sortCard.length-1) {
    this.setState((estadoAnterior, _props) => ({
      positionCard: estadoAnterior.positionCard + 1
    }))
    this.setState((estadoAnterior, _props) => ({
      numberOfCards: estadoAnterior.numberOfCards - 1
    }))
  }
  }

  randomizeCard = () => {
    const { savedCard } = this.state;
    const sorted = savedCard.sort(() => Math.random() - 0.5)
    this.setState({ sortCard: sorted });
    this.setState({ positionCard: 0 });
    this.setState({ numberOfCards: this.cardList.length -1});;
  }


  render() {
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3,
      cardImage, cardRare, cardTrunfo, hasTrunfo, isSaveButtonDisabled,
      savedCard, filterName, filterRare, filterTrunfo, filterAble,sortCard,positionCard,numberOfCards } = this.state;
      this.localStore(savedCard)
      this.localStoreTrunfo(hasTrunfo)
      let cardList = []
      let temTrunfo = false
      if (localStorage.getItem('saveCard')) {
        cardList = JSON.parse(localStorage.getItem('saveCard'));
        temTrunfo = JSON.parse(localStorage.getItem('trunfo'));
      }
    return (
      <div>
        <div className="header">
        <div className="title">
        <h1>One Piece Trunfo</h1>
        <button onClick={this.onSortCardClick} type="button">Jogar</button>
        </div>
        <img className="logo1" src={"https://i.pinimg.com/564x/ec/78/f1/ec78f19f19347ffcf86c2f57177ecc30.jpg"}></img>
        </div>
        {sortCard.length>0?
        <div className="game">
        <div className="game1">
        <Card
              cardName={ sortCard[positionCard].cardName }
              cardDescription={ sortCard[positionCard].cardDescription }
              cardAttr1={ sortCard[positionCard].cardAttr1 }
              cardAttr2={ sortCard[positionCard].cardAttr2 }
              cardAttr3={ sortCard[positionCard].cardAttr3 }
              cardImage={ sortCard[positionCard].cardImage }
              cardRare={ sortCard[positionCard].cardRare }
              cardTrunfo={ sortCard[positionCard].cardTrunfo }
              hasTrunfo={ sortCard[positionCard].hasTrunfo }
            />
            {positionCard<sortCard.length-1?
            <button className="nextCard" type="button" onClick={this.nextCardClick}>Proxima carta</button>:
            <button  className="nextCard" type="button" onClick={this.randomizeCard}>Embaralhar</button>}
            </div>
            <div className="game2">
            <div className="cart">
              <h2>One Piece Trunfo</h2>
              <img className="logo" src={"https://i.pinimg.com/564x/ec/78/f1/ec78f19f19347ffcf86c2f57177ecc30.jpg"}></img>
            </div>
              <p>{`Numero de cards: ${numberOfCards}`}</p>
              </div>       
          </div>:
        <div>
        <div className="container">
          <div className="formulario">
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
          </div>
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
          <div className="filters">
            <div className="containerFilters">
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
          <div className="trunfo1">
            <input
              type="checkbox"
              id="trunfo"
              data-testid="trunfo-filter"
              onChange={ this.filterCardsByTrunfo }
            />
             <label htmlFor="trunfo">
            Super Trunfo
          </label>
          </div>
          </div>
          </div>
          <div className="showCards">
          {cardList.filter((nameCards) => nameCards.cardName.toLowerCase()
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
        </div>}
  </div>
    );
  }
}

export default App;
