import logo from './logo.svg';
import './App.css';
import React, { useState, useMemo } from 'react';
import Fuse from 'fuse.js';

import products from './products.json';

const fuse = new Fuse(products, {
  keys: [
    'Description'
  ],
  includeScore: true
});

function App() {
  const [query, updateQuery] = useState('');
  const [finalQuery, updateFinalQuery] = useState('');


  const results = useMemo(() => fuse.search(finalQuery), [finalQuery]);

  const productsResults = useMemo(() => results.map(product => product.item), [results])
  productsResults.length = Math.min(productsResults.length, 10);

  function onSearch({ currentTarget }) {
    updateQuery(currentTarget.value);
  }

  function submitHandler(e) {
    updateFinalQuery(query);
    e.preventDefault();
  }

  return (
    <div className="App">

      <h1 className="title">IFRC product catalogue</h1>

      <form onSubmit={submitHandler} className="search" >
          <label>Search</label>
          <input type="text" value={query} onChange={onSearch} />
      </form>

      <ul className="characters">
          {productsResults.map(product => {
            const { Code ,Description, Base_UOM, EA, weight, volume, Group, Category } = product;
            return (
              <li key={Code} className="character">
                  <h2>{Description}</h2>
                  <p>{Group}</p>
                  <p>{Code}</p>
              </li>
            )
          })}
        </ul>
    </div>
  );
}

export default App;
