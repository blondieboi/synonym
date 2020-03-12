import React, { useState } from "react";

const SearchInput = () => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleInput = e => {
		setSearchTerm(e.target.value);
	};

	return (
		<div>
			<input
				type="text"
				value={searchTerm}
				placeholder="Type to search!"
				onChange={handleInput}
			/>
		</div>
	);
};

export default SearchInput;
