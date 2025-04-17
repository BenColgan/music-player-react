import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faList } from "@fortawesome/free-solid-svg-icons";

const Nav = ({
	setLibraryStatus,
	libraryStatus,
	setQueueStatus,
	queueStatus,
}) => {
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
			<h1>Welcome Back ..insert name..</h1>
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
