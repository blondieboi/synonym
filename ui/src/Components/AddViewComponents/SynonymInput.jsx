import React, { useState } from 'react';
import { onlyLetters } from '../../Utils/onlyLetters';
import '../../Styles/input.scss';
import '../../Styles/button.scss';

const SynonymInput = () => {
  const [word, setWord] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [synonyms, setSynonyms] = useState([]);

  const handleWord = e => {
    if (onlyLetters(e.target.value)) {
      setWord(e.target.value.toLowerCase());
    }
  };

  const handleSynonymInput = e => {
    if (onlyLetters(e.target.value)) {
      setInputValue(e.target.value.toLowerCase());
    }
  };

  const addToList = item => {
    const newSynonyms = [...synonyms, { item }];
    setSynonyms(newSynonyms);
  };

  const existsAlready = input => {
    if (synonyms.filter(item => item.item === input.toLowerCase()).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleNewSynonym = () => {
    if (!inputValue || existsAlready(inputValue.toLowerCase())) return;
    addToList(inputValue.toLowerCase());
    setInputValue('');
  };

  const handleSubmit = () => {
    if (word === '' || synonyms.length === 0) return;
    console.log(word);
    console.log(synonyms);
  };

  const SynonymListItem = ({ k, index, item }) => {
    const handleDelete = index => {
      const newSynonyms = [...synonyms];
      newSynonyms.splice(index, 1);
      setSynonyms(newSynonyms);
    };
    return (
      <div key={k} className="list-item">
        {item.item}
        <button className="action-button" onClick={() => handleDelete(index)}>
          -
        </button>
      </div>
    );
  };

  const synonymList = synonyms.map((item, index) => {
    return <SynonymListItem key={index} item={item} index={index} />;
  });

  return (
    <div>
      <div className="add-container">
        The word
        <input
          type="text"
          value={word}
          onChange={handleWord}
          className="word-input"
        />
        has the following {synonyms.length > 0 ? 'synonyms' : 'synonym'}:
        {synonymList}
        {synonyms.length > 0 ? 'and' : ''}
        <input
          type="text"
          onChange={handleSynonymInput}
          value={inputValue}
          className="word-input"
        />
        <button onClick={handleNewSynonym} className="action-button">
          +
        </button>
      </div>
      {synonyms.length > 0 ? (
        <button className="cta-button" onClick={handleSubmit}>
          Done, I am out of synonyms.
        </button>
      ) : (
        ''
      )}
    </div>
  );
};

export default SynonymInput;
