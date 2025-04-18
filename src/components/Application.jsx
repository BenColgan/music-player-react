import React, { useState, useRef } from "react";

//Import Components
import Player from "./Player";
import Song from "./Song";
import Library from "./Library";
import Queue from "./Queue";
import Nav from "./Nav";
import ToastContainer from "./ToastContainer";

//Import data
import chillhop from "../data";

//Util
import { playAudio } from "../util";

function Application() {
	//Ref
	const audioRef = useRef(null);

	const [songs, setSongs] = useState(chillhop());
	const [queuedSongs, setQueuedSongs] = useState([]);
	const [currentSong, setCurrentSong] = useState(songs[0]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 0,
		animationPercentage: 0,
		volume: 0,
	});
	const [isLibraryOpen, setisLibraryOpen] = useState(false);
	const [queueStatus, setQueueStatus] = useState(false);
	const [toasts, setToasts] = useState([]);

	const timeUpdateHandler = (e) => {
		const current = e.target.currentTime;
		const duration = e.target.duration;

		const roundedCurrent = Math.round(current);
		const roundedDuration = Math.round(duration);
		const percentage = Math.round((roundedCurrent / roundedDuration) * 100);
		setSongInfo({
			...songInfo,
			currentTime: current,
			duration: duration,
			animationPercentage: percentage,
			volume: e.target.volume,
		});
	};

	const songEndHandler = async () => {
		let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
		await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
		playAudio(isPlaying, audioRef);
		return;
	};

	const showToast = (message) => {
		const id = Date.now();
		setToasts((prevToasts) => [...prevToasts, { id, message }]);
	};

	const removeToast = (id) => {
		setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
	};

	return (
		<div
			className={`application ${isLibraryOpen ? "library-active" : ""} ${
				queueStatus ? "queue-active" : ""
			}`}
		>
			<Nav
				isLibraryOpen={isLibraryOpen}
				setisLibraryOpen={setisLibraryOpen}
				queueStatus={queueStatus}
				setQueueStatus={setQueueStatus}
			/>
			<Song isPlaying={isPlaying} currentSong={currentSong} />
			<Player
				audioRef={audioRef}
				setIsPlaying={setIsPlaying}
				currentSong={currentSong}
				isPlaying={isPlaying}
				songInfo={songInfo}
				setSongInfo={setSongInfo}
				songs={songs}
				setSongs={setSongs}
				setCurrentSong={setCurrentSong}
			/>
			<Library
				songs={songs}
				setCurrentSong={setCurrentSong}
				audioRef={audioRef}
				isPlaying={isPlaying}
				setSongs={setSongs}
				isLibraryOpen={isLibraryOpen}
				queuedSongs={queuedSongs}
				setQueuedSongs={setQueuedSongs}
				onSongAddedToQueue={showToast}
			/>
			<Queue
				queuedSongs={queuedSongs}
				isPlaying={isPlaying}
				queueStatus={queueStatus}
				setQueuedSongs={setQueuedSongs}
			/>
			<ToastContainer toasts={toasts} removeToast={removeToast} />
			<audio
				onLoadedMetadata={timeUpdateHandler}
				onTimeUpdate={timeUpdateHandler}
				ref={audioRef}
				src={currentSong.audio.default || currentSong.audio}
				onEnded={songEndHandler}
			></audio>
		</div>
	);
}

export default Application;
