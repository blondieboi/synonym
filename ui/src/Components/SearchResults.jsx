import React from "react";

const SearchResults = ({ searchResults }) => {
	const synonymList = searchResults.synonyms.map((item, key) => {
		return (
			<li key={key} className="result-list-item">
				{item}
			</li>
		);
	});
	return (
		<div className="result-container">
			{synonymList.length > 0 ? (
				<div>
					<p className="result-text">
						Here are the synonyms we found for the word: {searchResults.term}
					</p>
					<ul className="result-list">{synonymList}</ul>
				</div>
			) : (
				<div>
					<p className="result-text">
						We couldn't find synonyms for the word: {searchResults.term}
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

export default SearchResults;
