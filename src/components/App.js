import { useState, useEffect } from 'react';
import '../styles/App.scss';
import callToApi from '../services/api';
import logo from '../images/friends_logo_1x.png';

function App() {
  const [quoteList, setQuoteList] = useState([]);
  const [quoteSearch, setQuoteSearch] = useState('');
  const [characterSearch, setCharacterSearch] = useState('all');
  const [newQuote, setNewQuote] = useState({
    quote: '',
    character: '',
  });

  useEffect(() => {
    callToApi().then((response) => {
      setQuoteList(response);
    });
  }, []);

  const renderQuotes = () => {
    const filteredQuoteList = quoteList
      .filter((quote) =>
        quote.quote.toLowerCase().includes(quoteSearch.toLowerCase())
      )
      .filter((quote) => {
        if (characterSearch === 'all') {
          return true;
          // con true es lo mismo que poner: return quote;
        } else {
          //else if (characterSearch === quote.character) {return= quote;}
          return quote.character === characterSearch;
        }
      });
    return filteredQuoteList.map((eachQuote, ind) => (
      <li className="quotes__elem" key={ind}>
        <p className="quotes__elem--text">{eachQuote.quote}</p>
        <h3 className="quotes__elem--char"> {eachQuote.character}</h3>
      </li>
    ));
  };

  const handleQuoteSearch = (ev) => {
    setQuoteSearch(ev.target.value);
  };

  const handleCharacterSearch = (ev) => {
    setCharacterSearch(ev.target.value);
  };

  const handleAddQuote = (ev) => {
    const cloneNewQuote = { ...newQuote };
    cloneNewQuote[ev.target.id] = ev.target.value;
    setNewQuote(cloneNewQuote);
  };

  const handleClickAddQuote = (ev) => {
    ev.preventDefault();
    setQuoteList([...quoteList, newQuote]);
    setNewQuote({
      quote: '',
      character: '',
    });
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  // hacer un map de los personajes del array, y con ese nuevo array, habrá que crear los options. un map parecido a los de <li>. Función set de java script

  return (
    <div className="App">
      <header className="header">
        <img src={logo} alt="Logo de Friends" />
        <h1 className="header__title">Quotes</h1>
        <h3 className="header__subtitle"></h3>
      </header>
      <main className="main">
        <section className="main__search">
          <form className="search" onSubmit={handleSubmit}>
            <label className="search__label" htmlFor="text">
              Search quote
            </label>
            <input
              className="search__input"
              autoComplete="off"
              type="search"
              name="search"
              placeholder="e.g. Unagi"
              onChange={handleQuoteSearch}
              value={quoteSearch}
            />
            <label className="search__label" htmlFor="text">
              Select character
            </label>
            <select
              className="search__select"
              name=""
              id=""
              onChange={handleCharacterSearch}
              value={characterSearch}
            >
              <option value="all">Todos</option>
              <option value="Ross">Ross</option>
              <option value="Monica">Mónica</option>
              <option value="Joey">Joey</option>
              <option value="Phoebe">Phoebe</option>
              <option value="Chandler">Chandler</option>
              <option value="Rachel">Rachel</option>
            </select>
          </form>
        </section>

        <section className="quotes">
          <ul className="quotes__list">{renderQuotes()}</ul>
        </section>

        <section className="main__addquotes">
          <form className="addquotes">
            <h2 className="addquotes__title">Add new quote</h2>
            <label className="addquotes__label" htmlFor="text">
              New quote
            </label>
            <input
              className="addquotes__input"
              type="text"
              name="quote"
              id="quote"
              placeholder="e.g. Unagi"
              value={newQuote.quote}
              onChange={handleAddQuote}
            />
            <label className="addquotes__label" htmlFor="text">
              Character
            </label>
            <input
              className="addquotes__input"
              type="text"
              name="character"
              id="character"
              placeholder="The character who said it"
              value={newQuote.character}
              onChange={handleAddQuote}
            />

            <input
              className="addquotes__btn"
              type="submit"
              value="Add"
              onClick={handleClickAddQuote}
            />
          </form>
        </section>
      </main>
      <footer className="footer">
        <span className="footer__text">
          {' '}
          ©{' '}
          <a
            href="https://adalab.es/bootcamp-programacion/"
            target="_blank"
            rel="noreferrer"
            className="footer__text--link"
          >
            © Silvia Parada
          </a>
        </span>
        <span className="footer__text">2023</span>
      </footer>
    </div>
  );
}

export default App;
