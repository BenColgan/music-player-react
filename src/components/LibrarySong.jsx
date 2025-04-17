import React from "react";
import { playAudio } from "../util";

const LibrarySong = ({
	name,
	artist,
	cover,
	id,
	setCurrentSong,
	songs,
	audioRef,
	isPlaying,
	setSongs,
	active,
	queuedSongs,
	setQueuedSongs,
	onSongAddedToQueue,
}) => {
	const songSelectHandler = () => {
		const selectedSong = songs.filter((state) => state.id === id);
		setCurrentSong({ ...selectedSong[0] });
		//Set Active in library
		const newSongs = songs.map((song) => {
			if (song.id === id) {
				return {
					...song,
					active: true,
				};
			} else {
				return {
					...song,
					active: false,
				};
			}
		});
		setSongs(newSongs);

		//Play audio
		playAudio(isPlaying, audioRef);
	};

	const addSongToQueue = (e) => {
		e.stopPropagation();
		const selectedSong = songs.find((song) => song.id === id);
		setQueuedSongs([...queuedSongs, selectedSong]);
		onSongAddedToQueue(`Added "${name}" by ${artist} to your queue`);
	};
	return (
		<div
			onClick={songSelectHandler}
			className={`library-song ${active ? "selected" : ""}`}
		>
			<div className="library-song-image">
				<img src={cover} alt="" />
			</div>
			<div className="song-description">
				<h3>{name}</h3>
				<h4>{artist}</h4>
			</div>
			<div onClick={addSongToQueue} className="add-song">
				+
			</div>
		</div>
	);
};

export default LibrarySong;
