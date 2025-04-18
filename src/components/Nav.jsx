import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faList } from "@fortawesome/free-solid-svg-icons";
import { LoginContext } from "../contexts/LoginContext";

const Nav = ({
	setisLibraryOpen,
	isLibraryOpen,
	setQueueStatus,
	queueStatus,
}) => {
	const { userName } = useContext(LoginContext);
	const openLibraryHandler = () => {
		setisLibraryOpen(!isLibraryOpen);
	};
	const openQueueHandler = () => {
		setQueueStatus(!queueStatus);
	};

	return (
		<nav>
			<button
				className={isLibraryOpen ? "library--open" : ""}
				onClick={openLibraryHandler}
			>
				Library
				<FontAwesomeIcon icon={faMusic}></FontAwesomeIcon>
			</button>
			<h1>Hey {userName}, enjoy my little react music app </h1>
			<button
				className={queueStatus ? "queue--open" : ""}
				onClick={openQueueHandler}
			>
				Queue
				<FontAwesomeIcon icon={faList}></FontAwesomeIcon>
			</button>
		</nav>
	);
};

export default Nav;
