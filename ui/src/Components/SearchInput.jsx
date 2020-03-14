import React, { useState } from "react";
import { formatValidator } from "../Utils/formatValidator";
import SearchResults from "./SearchResults";
import Error from "./Error";
import axios from "axios";
import "../Styles/SearchView.scss";

const SearchInput = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [hasSearched, setHasSearched] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [results, setResults] = useState({
		term: "",
		synonyms: []
	});

	const handleSearchInput = e => {
		setHasSearched(false);
		setIsError(false);
		if (formatValidator(e.target.value)) {
			setSearchTerm(e.target.value.toLowerCase());
		}
	};

	const handleSearch = () => {
		setIsLoading(true);
		if (searchTerm === "") return;
		axios
			.get(process.env.REACT_APP_API_BASE_URL + "getSynonyms", {
				params: {
					searchTerm: searchTerm
				}
			})
			.then(res => {
				setResults(res.data);
				setSearchTerm("");
				setHasSearched(true);
			})
			.catch(err => {
				setIsError(true);
			});
		setIsLoading(false);
	};

	return (
		<div className="add-container">
			What is a synonym for the word:
			<input
				type="text"
				value={searchTerm}
				placeholder="Type to search!"
				onChange={handleSearchInput}
				className="word-input"
				onKeyDown={e => (e.keyCode === 13 ? handleSearch() : undefined)}
			/>
			{searchTerm !== "" ? (
				<button className="search-button" onClick={handleSearch}>
					{isLoading ? "..." : "Search"}
				</button>
			) : (
				<></>
			)}
			{hasSearched ? <SearchResults searchResults={results} /> : <></>}
			{isError ? <Error /> : <></>}
		</div>
	);
};

export default SearchInput;
