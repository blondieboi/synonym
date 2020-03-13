import React, { useState } from 'react';
import response from '../../Mock/response.json';
import { onlyLetters } from '../../Utils/onlyLetters';

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInput = e => {
    if (onlyLetters(e.target.value)) {
      setSearchTerm(e.target.value.toLowerCase());
    }
    if (e.target.value.length > 2) {
      console.log('search for words');
    }
  };

  const handleSearch = () => {
    console.log(searchTerm);
  };

  const SearchResults = ({ list }) => {
    const resultList = list.results.map((item, key) => {
      return <li key={key}>{item.value}</li>;
    });
    return <ul>{resultList}</ul>;
  };

  return (
    <div className="add-container">
      What is a synonym for the word:
      <input
        type="text"
        value={searchTerm}
        placeholder="Type to search!"
        onChange={handleInput}
        className="word-input"
      />
      {searchTerm !== '' ? <button onClick={handleSearch}>Search</button> : ''}
      <SearchResults list={response} />
    </div>
  );
};

export default SearchInput;
