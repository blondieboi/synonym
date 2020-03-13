import React from 'react';
import ViewHeader from '../Components/ViewHeader';
import SearchInput from '../Components/SearchViewComponents/SearchInput';

const SearchView = () => {
  return (
    <div className="view">
      <ViewHeader
        title={'Search for synonyms'}
        subtitle={'because their is always more than one word to say something'}
      />
      <SearchInput />
    </div>
  );
};

export default SearchView;
