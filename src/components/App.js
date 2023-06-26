import { useState, useEffect } from 'react';
import '../styles/App.scss';
//import callToApi from '../services/api';
import logo from '../images/friends_logo_1x.png'

function App() {

  const [ quoteList, setQuoteList] = useState([]);
  const [quoteSearch, setQuoteSearch] = useState('');
  const [characterSearch, setCharacterSearch] = useState('all');
  const [ newQuote, setNewQuote] = useState (
    {
      quote: '',
      character: ''
    }
  );


  useEffect ( () => {
    fetch('https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json')
    .then((response) => response.json())
    .then((dataQuotes) => {
      setQuoteList(dataQuotes);
    });
  }, []);


  const renderQuotes = () => {
    const filteredQuoteList = 
    quoteList
    .filter ( (quote) => quote.quote.toLowerCase().includes(quoteSearch.toLowerCase()))
    .filter( (quote) => {
      if (characterSearch === 'all') {
        return quote;
      } else if (characterSearch === quote.character) {
        return quote;
      } 
    })
    return filteredQuoteList.map((eachQuote, ind) => (
        <li className="quotes__elem" key={ind}>
          <p className="quotes__elem--text">
            {eachQuote.quote} -
            <p className="quotes__elem--char"> {eachQuote.character}</p>
          </p>
        </li>
      ));
    };

    const handleQuoteSearch = (ev) => {
      setQuoteSearch(ev.target.value);
    }

    const handleCharacterSearch = (ev) => {
      setCharacterSearch(ev.target.value);
    }

    const handleAddQuote = (ev) => {
      const cloneNewQuote = {...newQuote};
      cloneNewQuote[ev.target.id]=ev.target.value;
      setNewQuote(cloneNewQuote);
    };

    const handleClickAddQuote = (ev) => {
      ev.preventDefault();
      setQuoteList ( [...quoteList, newQuote]);
      setNewQuote (
        {
      quote: '',
      character: ''
    }
    )};
    const handleSubmit = (ev) => {
      ev.preventDefault();
    };


  return (
    <div className="App">
        <header className="header">
          <img src={logo} alt="Logo de Friends" />
          <h1 className='header__title'>
            Quotes
          </h1>
          <h3 className='header__subtitle'>
          </h3>
        </header>
        <main className='main'>
          <section className="main__search">
            <form className="search" onSubmit={handleSubmit}>
                <label className="search__label" htmlFor="text">
                  Filtar por frase
                  <input
                    className="input__search"
                    autoComplete="off"
                    type="search"
                    name="search"
                    onChange={handleQuoteSearch}
                    value={quoteSearch}
                  />
                </label>
                <label className="search__label" htmlFor="text">
                Filtar por personaje
                <select name="" id="" onChange={handleCharacterSearch} value={characterSearch}>
                  <option value="all">Todos</option>
                  <option value="Ross">Ross</option>
                  <option value="Monica">Mónica</option>
                  <option value="Joey">Joey</option>
                  <option value="Phoebe">Phoebe</option>
                  <option value="Chandler">Chandler</option>
                  <option value="Rachel">Rachel</option>
                </select>
              </label>
            </form>
          </section>

          <section className="quotes">
            <ul className="quotes__list">{renderQuotes()}</ul>
          </section>

          <section className="main__addquotes">
             <form className="addquotes">
          <h2 className="addquotes__title">Añade una nueva frase</h2>
          <label className="addquotes__label" htmlFor="text">
            Frase
            <input
              className="addquotes__input"
              type="text"
              name="quote"
              id="quote"
              placeholder="La frase de la serie a añadir"
              value={newQuote.quote}
              onChange={handleAddQuote}
            />
          </label>
          <label className="addquotes__label" htmlFor="text">
            Personaje
            <input
              className="addquotes__input"
              type="text"
              name="character"
              id="character"
              placeholder="Personaje que la ha dicho"
              value={newQuote.character}
              onChange={handleAddQuote}
            />
          </label>

          <input
            className="addquotes__btn"
            type="submit"
            value="Añadir nueva frase"
            onClick={handleClickAddQuote}
          />
        </form>
          </section>

        </main>
        <footer className='footer'>
          <p className="footer__text">Adalab 2023 © Trótula promotion</p>
        </footer>
    </div>
  );
}

export default App;
