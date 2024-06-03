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
    <div className="px-4 sm:px-6 md:px-40">

      <h1 className="text-slate-900 mt-5 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">IFRC product catalogue</h1>

    <form onSubmit={submitHandler} autoComplete="off">
      <label
        className="mx-auto my-10 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
        htmlFor="search-bar">
    <input id="search-bar" placeholder="Search product ..."
        value={query} 
        onChange={onSearch}
        className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"/>
    <button
        className="w-full md:w-auto px-6 py-3 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70">
        
        <div className="relative">

            <div
                className="flex items-center justify-center h-3 w-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
                <svg className="opacity-0 animate-spin w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                        strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>
            </div>


            <div onClick={submitHandler} className="flex items-center transition-all opacity-1 valid:"><span
                    className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                    Search
                </span>
            </div>

          </div>
          
        </button>
      </label>
      </form>


      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {productsResults.map(product => {
            const { Code ,Description, Base_UOM, EA, weight, volume, Group, Category } = product;
            return (
                <li key={Code} className="py-3 sm:py-4">
                      <div className="flex items-center">
                          <div className="flex-1 min-w-0 ms-4">
                              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                {Description}
                              </p>
                              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                              {Group}
                              </p>
                          </div>
                          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          {Code}
                          </div>
                      </div>
                  </li>
            )
          })}
        </ul>
    </div>
    </div>
  );
}

export default App;
