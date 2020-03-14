import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import SearchView from "./Views/SearchView";
import ContributeView from "./Views/ContributeView";

function App() {
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route path="/contribute">
						<ContributeView />
					</Route>
					<Route path="/">
						<SearchView />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
