import React from "react";

const QueueSong = ({
	name,
	artist,
	cover,
	id,
	queuedSongs,
	setQueuedSongs,
}) => {
	const removeSongFromQueue = (e) => {
		e.stopPropagation();
		setQueuedSongs(queuedSongs.filter((song) => song.id !== id));
	};
	return (
		<div onClick={removeSongFromQueue} className="queue-song">
			<img src={cover} alt="" className="queue-song__image" />
			<div className="queue-song__description">
				<h3>{name}</h3>
				<h4>{artist}</h4>
			</div>
			<div className="queue-song__remove-song">remove</div>
		</div>
	);
};

export default QueueSong;
