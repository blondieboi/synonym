import React, { useState } from "react";
import SynonymInput from "../Components/AddViewComponents/SynonymInput";
import "../Styles/views.scss";
import "../Styles/AddView.scss";

const AddView = () => {
	return (
		<div className="view">
			<h1>Add synonyms</h1>
			<h4>because you surely know more than me.</h4>
			<SynonymInput />
		</div>
	);
};

export default AddView;
