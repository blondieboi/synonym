import React, { useState } from "react";
import { onlyLetters } from "../../Utils/onlyLetters";
import axios from "axios";
import "../../Styles/SearchView.scss";

const SearchInput = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [hasSearched, setHasSearched] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [results, setResults] = useState({
		term: "",
		synonyms: []
	});

	const handleInput = e => {
		setHasSearched(false);
		setIsError(false);
		if (onlyLetters(e.target.value)) {
			setSearchTerm(e.target.value.toLowerCase());
		}
		if (e.target.value.length > 2) {
			console.log("search for words");
		}
	};

	const handleSearch = () => {
		setIsLoading(true);
		if (searchTerm === "") return;
		axios
			.get(
				process.env.REACT_APP_API_BASE_URL +
					"getSynonyms?searchTerm=" +
					searchTerm
			)
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

	const SearchResults = ({ list }) => {
		const resultList = list.synonyms.map((item, key) => {
			return (
				<li key={key} className="result-list-item">
					{item}
				</li>
			);
		});
		if (!hasSearched) return <></>;
		return (
			<div className="result-container">
				{resultList.length > 0 ? (
					<div>
						<p className="result-text">
							Here are the synonyms we found for the word: {list.term}
						</p>
						<ul className="result-list">{resultList}</ul>
					</div>
				) : (
					<div>
						<p className="result-text">
							We couldn't find synonyms for the word: {list.term}
						</p>
						<p className="cta-text">
							Can you think of a few?
							<a className="cta-link" href="/contribute">
								Contribute some of your own!
							</a>
						</p>
					</div>
				)}
			</div>
		);
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
				onKeyDown={e => (e.keyCode === 13 ? handleSearch() : "")}
			/>
			{searchTerm !== "" ? (
				<button className="search-button" onClick={handleSearch}>
					{isLoading ? "..." : "Search"}
				</button>
			) : (
				""
			)}
			<SearchResults list={results} />
			{isError ? (
				<p className="result-container">
					Something went wrong, please try again while we fire our architect!
				</p>
			) : (
				""
			)}
		</div>
	);
};

export default SearchInput;
