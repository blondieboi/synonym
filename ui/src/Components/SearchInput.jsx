import React, { useState } from "react";
import axios from "axios";
import { formatValidator } from "../Utils/formatValidator";
import SearchResults from "./SearchResults";
import Error from "./Error";
import "../Styles/SearchView.scss";
import "../Styles/Atoms/input.scss";
import "../Styles/Atoms/button.scss";
import "../Styles/Atoms/spinner.scss";

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
				setIsLoading(false);
			})
			.catch(err => {
				setIsError(true);
				setIsLoading(false);
			});
	};

	return (
		<div className="view-content">
			<div className="search-bar">
				<p>What is a synonym for the word:</p>
				<input
					type="text"
					value={searchTerm}
					placeholder="Type to search!"
					onChange={handleSearchInput}
					className="text-input"
					onKeyDown={e =>
						e.keyCode === 13 ? (handleSearch(), setIsLoading(true)) : undefined
					}
				/>
				{searchTerm !== "" ? (
					<button
						className="search-button"
						onClick={() => {
							handleSearch();
							setIsLoading(true);
						}}
					>
						{isLoading ? <div className="loader">Loading...</div> : "Search"}
					</button>
				) : (
					<></>
				)}
			</div>

			{hasSearched ? <SearchResults searchResults={results} /> : <></>}
			{isError ? <Error /> : <></>}
		</div>
	);
};

export default SearchInput;
