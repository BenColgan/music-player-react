import React from "react";

import LibrarySong from "./LibrarySong";

const Queue = ({
	songs,
	setCurrentSong,
	audioRef,
	isPlaying,
	setSongs,
	queueStatus,
}) => {
	return (
		<div className={`queue ${queueStatus ? "active-queue" : " "}`}>
			<h2>Queue</h2>
			<div className="queue-songs">
				{songs.map((song) => (
					<LibrarySong
						songs={songs}
						cover={song.cover}
						name={song.name}
						artist={song.artist}
						active={song.active}
						key={song.id}
						id={song.id}
						setCurrentSong={setCurrentSong}
						audioRef={audioRef}
						isPlaying={isPlaying}
						setSongs={setSongs}
					/>
				))}
			</div>
		</div>
	);
};

export default Queue;
