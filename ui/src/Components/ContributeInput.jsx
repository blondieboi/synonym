import React, { useState } from "react";
import axios from "axios";
import { formatValidator } from "../Utils/formatValidator";
import { existsInList } from "../Utils/existsInList";
import Error from "./Error";
import "../Styles/Views.scss";
import "../Styles/Atoms/input.scss";
import "../Styles/Atoms/button.scss";

const ContributeInput = () => {
	const [term, setTerm] = useState("");
	const [synonym, setSynonym] = useState("");
	const [synonyms, setSynonyms] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const handleTermInput = e => {
		setIsError(false);
		if (formatValidator(e.target.value)) {
			setTerm(e.target.value.toLowerCase());
		}
	};

	const handleSynonymInput = e => {
		setIsError(false);
		if (formatValidator(e.target.value)) {
			setSynonym(e.target.value.toLowerCase());
		}
	};

	const addSynonym = () => {
		if (
			!synonym ||
			existsInList(synonym.toLowerCase(), synonyms) ||
			term === "" ||
			synonym.toLowerCase() === term
		)
			return;
		const newSynonyms = [...synonyms, { value: synonym.toLowerCase() }];
		setSynonyms(newSynonyms);
		setSynonym("");
	};

	const submitSynonyms = () => {
		setIsLoading(true);
		if (term === "" || synonyms.length === 0) return;
		const synonymArray = synonyms.map(item => {
			return item.value;
		});

		axios
			.post(process.env.REACT_APP_API_BASE_URL + "postSynonyms", {
				term: term,
				synonyms: synonymArray
			})
			.then(res => {
				setTerm("");
				setSynonyms([]);
			})
			.catch(err => {
				setIsError(true);
			});
		setIsLoading(false);
	};

	const SynonymListItem = ({ i, index, item }) => {
		const deleteSynonym = index => {
			const newSynonyms = [...synonyms];
			newSynonyms.splice(index, 1);
			setSynonyms(newSynonyms);
		};
		return (
			<div key={i} className="list-item">
				{item.value}
				<button className="round-button" onClick={() => deleteSynonym(index)}>
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
			<div className="view-content a">
				<div className="term-bar">
					<p>The word</p>
					<input
						type="text"
						value={term}
						onChange={handleTermInput}
						className="text-input"
					/>
					<p>
						has the following {synonyms.length > 0 ? "synonyms" : "synonym"}:
					</p>

					<div>
						<input
							type="text"
							onKeyDown={e => (e.keyCode === 13 ? addSynonym() : undefined)}
							onChange={handleSynonymInput}
							value={synonym}
							className="text-input"
						/>
						<button onClick={addSynonym} className="round-button">
							+
						</button>
					</div>
				</div>
				{synonymList}
			</div>

			{synonyms.length > 0 ? (
				<button
					disabled={synonym === "" ? false : true}
					className="submit-button"
					onClick={submitSynonyms}
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

export default ContributeInput;
