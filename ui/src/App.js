import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import SearchView from "./Views/SearchView";
import AddView from "./Views/AddView";

function App() {
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route exact path="/" component={AddView} />
					<Route exact path="/contribute " component={SearchView} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
