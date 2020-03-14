import React from "react";
import SynonymInput from "../Components/SynonymInput";
import ViewHeader from "../Components/ViewHeader";
import "../Styles/views.scss";
import "../Styles/AddView.scss";

const AddView = () => {
	return (
		<div className="view">
			<ViewHeader
				title={"Add synonyms"}
				subtitle={"because you surely know more than me."}
			/>
			<SynonymInput />
		</div>
	);
};

export default AddView;
