import React, { useState, useRef } from "react";

//Import Components
import Player from "./Player";
import Song from "./Song";
import Library from "./Library";
import Queue from "./Queue";
import Nav from "./Nav";
import ToastContainer from "./ToastContainer";

//Import data
import playList from "../data";

function Application() {
	//Ref
	const audioRef = useRef(null);

	const [songs, setSongs] = useState(playList());
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
		if (queuedSongs.length > 0) {
			const nextSong = queuedSongs[0];
			setCurrentSong(nextSong);

			// Update active state for songs when playing from queue
			const newSongs = songs.map((song) => ({
				...song,
				active: song.name === nextSong.name && song.artist === nextSong.artist,
			}));
			setSongs(newSongs);

			setQueuedSongs(queuedSongs.slice(1));
			setTimeout(() => {
				audioRef.current.play();
			}, 500);
		} else {
			setIsPlaying(false);
			audioRef.current.currentTime = 0;
		}
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
				setIsPlaying={setIsPlaying}
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
