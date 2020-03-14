import React, { useState } from "react";
import { onlyLetters } from "../../Utils/onlyLetters";
import axios from "axios";

const SearchInput = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [results, setResults] = useState([]);

	const handleInput = e => {
		if (onlyLetters(e.target.value)) {
			setSearchTerm(e.target.value.toLowerCase());
		}
		if (e.target.value.length > 2) {
			console.log("search for words");
		}
	};

	const handleSearch = () => {
		axios
			.get(
				process.env.REACT_APP_API_BASE_URL +
					"getSynonyms?searchTerm=" +
					searchTerm
			)
			.then(res => {
				setResults(res.data);
				setSearchTerm("");
			})
			.catch(err => {
				console.log("something went wrong");
			});
	};

	const SearchResults = ({ list }) => {
		const resultList = list.map((item, key) => {
			return <li key={key}>{item}</li>;
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
			{searchTerm !== "" ? (
				<button className="search-button" onClick={handleSearch}>
					Search
				</button>
			) : (
				""
			)}
			<SearchResults list={results} />
		</div>
	);
};

export default SearchInput;
