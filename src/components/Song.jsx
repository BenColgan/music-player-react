import React from "react";

const Song = ({ currentSong, isPlaying }) => {
	return (
		<div className="song">
			<div className="song__inner">
				<div
					className={`song__vinyl ${isPlaying ? "song__vinyl--active" : ""}`}
				>
					<img
						className={isPlaying ? "rotateSong" : ""}
						src={currentSong.cover}
						alt=""
					/>
				</div>
				<div
					className={`needle__container ${isPlaying ? "needle--active" : ""}`}
				>
					<div className={`needle ${isPlaying ? "needle--wobble" : ""}`}></div>
				</div>
			</div>
			<h2 className="song__title">{currentSong.name}</h2>
			<h3 className="song__artist">{currentSong.artist}</h3>
		</div>
	);
};

export default Song;
