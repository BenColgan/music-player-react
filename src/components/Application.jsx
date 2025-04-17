import React, { useState, useRef } from "react";

//Import Components
import Player from "./Player";
import Song from "./Song";
import Library from "./Library";
import Queue from "./Queue";
import Nav from "./Nav";
import Toast from "./Toast";

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
	const [libraryStatus, setLibraryStatus] = useState(false);
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
			className={`application ${libraryStatus ? "library-active" : ""} ${
				queueStatus ? "queue-active" : ""
			}`}
		>
			<Nav
				libraryStatus={libraryStatus}
				setLibraryStatus={setLibraryStatus}
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
				libraryStatus={libraryStatus}
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
			<div className="toast-container">
				{toasts.map((toast) => (
					<Toast
						key={toast.id}
						message={toast.message}
						onClose={() => removeToast(toast.id)}
					/>
				))}
			</div>
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
