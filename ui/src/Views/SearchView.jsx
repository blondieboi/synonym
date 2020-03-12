import React from "react";
import SearchInput from "../Components/SearchViewComponents/SearchInput";
import SearchResults from "../Components/SearchViewComponents/SearchResults";

const SearchView = () => {
	return (
		<div>
			<h1>Search for synonyms</h1>
			<h4>because their is always more than one word to say something</h4>
			<SearchInput />
			<SearchResults />
		</div>
	);
};

export default SearchView;
