import React, { useState } from "react";
import "./styles/app.scss";

//Import Components
import Login from "./components/Login";
import Player from "./components/Player";

//Import Context
import { LoginContext } from "./contexts/LoginContext";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userName, setUserName] = useState("'I don't remember my name'");

	return (
		<LoginContext.Provider
			value={{ isLoggedIn, setIsLoggedIn, userName, setUserName }}
		>
			{isLoggedIn ? <Player /> : <Login />}
		</LoginContext.Provider>
	);
}

export default App;
