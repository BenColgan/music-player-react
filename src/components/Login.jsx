import React, { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";

const Login = ({}) => {
	const { setIsLoggedIn, setUserName } = useContext(LoginContext);
	return (
		<div className="login">
			<h2>Login</h2>
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
