import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faList } from "@fortawesome/free-solid-svg-icons";
import { LoginContext } from "../contexts/LoginContext";

const Nav = ({
	setLibraryStatus,
	libraryStatus,
	setQueueStatus,
	queueStatus,
}) => {
	const { userName } = useContext(LoginContext);
	const openLibraryHandler = () => {
		setLibraryStatus(!libraryStatus);
	};
	const openQueueHandler = () => {
		setQueueStatus(!queueStatus);
	};

	return (
		<nav>
			<button
				className={libraryStatus ? "library-active" : ""}
				onClick={openLibraryHandler}
			>
				Library
				<FontAwesomeIcon icon={faMusic}></FontAwesomeIcon>
			</button>
			<h1>Hey {userName}, enjoy my little react music app </h1>
			<button
				className={queueStatus ? "queue-active" : ""}
				onClick={openQueueHandler}
			>
				Queue
				<FontAwesomeIcon icon={faList}></FontAwesomeIcon>
			</button>
		</nav>
	);
};

export default Nav;
