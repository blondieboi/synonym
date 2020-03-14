import React, { useState } from "react";
import { formatValidator } from "../../Utils/formatValidator";
import { existsInList } from "../../Utils/existsInList";
import Error from "../Error";
import "../../Styles/input.scss";
import "../../Styles/button.scss";
import axios from "axios";

const SynonymInput = () => {
	const [word, setWord] = useState("");
	const [inputValue, setInputValue] = useState("");
	const [synonyms, setSynonyms] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const handleWord = e => {
		setIsError(false);
		if (formatValidator(e.target.value)) {
			setWord(e.target.value.toLowerCase());
		}
	};

	const handleSynonymInput = e => {
		setIsError(false);
		if (formatValidator(e.target.value)) {
			setInputValue(e.target.value.toLowerCase());
		}
	};

	const addToList = item => {
		const newSynonyms = [...synonyms, { item }];
		setSynonyms(newSynonyms);
	};

	const handleNewSynonym = () => {
		if (
			!inputValue ||
			existsInList(inputValue.toLowerCase(), synonyms) ||
			word === "" ||
			inputValue.toLowerCase() === word
		)
			return;
		addToList(inputValue.toLowerCase());
		setInputValue("");
	};

	const handleSubmit = () => {
		setIsLoading(true);
		if (word === "" || synonyms.length === 0) return;
		const arr = synonyms.map(item => {
			return item.item;
		});

		axios
			.post(process.env.REACT_APP_API_BASE_URL + "postSynonyms", {
				word: word,
				synonyms: arr
			})
			.then(res => {
				setWord("");
				setSynonyms([]);
			})
			.catch(err => {
				setIsError(true);
			});
		setIsLoading(false);
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
				has the following {synonyms.length > 0 ? "synonyms" : "synonym"}:
				{synonymList}
				{synonyms.length > 0 ? "and" : ""}
				<input
					type="text"
					onKeyDown={e => (e.keyCode === 13 ? handleNewSynonym() : undefined)}
					onChange={handleSynonymInput}
					value={inputValue}
					className="word-input"
				/>
				<button onClick={handleNewSynonym} className="action-button">
					+
				</button>
			</div>
			{synonyms.length > 0 ? (
				<button
					disabled={inputValue === "" ? false : true}
					className="cta-button"
					onClick={handleSubmit}
				>
					{isLoading ? "Loading" : "Done, I am out of synonyms."}
				</button>
			) : (
				<></>
			)}
			{isError ? <Error /> : <></>}
		</div>
	);
};

export default SynonymInput;
