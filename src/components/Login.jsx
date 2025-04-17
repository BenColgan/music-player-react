import React, { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";

const Login = ({}) => {
	const { setIsLoggedIn, setUserName } = useContext(LoginContext);
	return (
		<div className="login">
			<h2>Login</h2>
			<h3>Back story</h3>
			<p>
				<br />
				This was originally a 5 year old repo for a basic music player I found
				that of course being that old was completely broken. I fixed it up and
				got it running then update to a more modern version of react which broke
				it again. After getting it all back up I set out to completely overhaul
				the app with everything I need to get a decent understanding on these
				were:
			</p>
			<ul>
				<li>*Context API</li>
				<li>*Functional Based Components</li>
				<li>*Reusable Hooks</li>
				<li>*useState</li>
				<li>*useEffect</li>
				<li>*useReducer</li>
				<li>*useContext</li>
				<li>*useMemo</li>
			</ul>
			<form>
				<input
					type="text"
					placeholder="Please Enter Your Name"
					onChange={(event) => setUserName(event.target.value)}
					required
				/>
				<button type="submit" onClick={() => setIsLoggedIn(true)}>
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
