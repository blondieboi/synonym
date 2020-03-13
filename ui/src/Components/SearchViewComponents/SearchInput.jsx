import React, { useState } from 'react';
import response from '../../Mock/response.json';

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInput = e => {
    setSearchTerm(e.target.value);
  };

  const SearchResults = ({ list }) => {
    const resultList = list.results.map((item, key) => {
      return <div key={key}>{item.value}</div>;
    });
    return <div>{resultList}</div>;
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
      <SearchResults list={response} />
    </div>
  );
};

export default SearchInput;
