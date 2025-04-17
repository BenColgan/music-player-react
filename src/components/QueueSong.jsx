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
			<img src={cover} alt="" />
			<div className="song-description">
				<h3>{name}</h3>
				<h4>{artist}</h4>
			</div>
			<div className="remove-song">-</div>
		</div>
	);
};

export default QueueSong;
