import React from "react";
import response from "../../Mock/response.json";

const SearchResults = () => {
	const resultList = response.results.map((item, key) => {
		return <div key={key}>{item.value}</div>;
	});

	return <div>{resultList}</div>;
};

export default SearchResults;
