import React from 'react';
import '../Styles/Atoms/anchor.scss';

const SearchResults = ({ searchResults }) => {
  if (searchResults) {
    const synonymList = searchResults.synonyms.map((item) => (
      <li key={item}>{item}</li>
    ));
    return (
      <div className="result-container">
        {synonymList.length > 0 ? (
          <div>
            <p>
              Here are the synonyms we found for the word:
              {' '}
              {searchResults.term}
            </p>
            <ul>{synonymList}</ul>
          </div>
        ) : (
          <div>
            <p>
              We couldn&apos;t find synonyms for the word:
              {searchResults.term}
            </p>
            <p>
              Can you think of a few?
              <a className="link" href="/contribute">
                Contribute some of your own!
              </a>
            </p>
          </div>
        )}
      </div>
    );
  }
  return false;
};

export default SearchResults;
