import React from "react";

import LibrarySong from "./LibrarySong";

const Library = ({
	songs,
	setCurrentSong,
	audioRef,
	isPlaying,
	setSongs,
	libraryStatus,
	queuedSongs,
	setQueuedSongs,
}) => {
	return (
		<div className={`library ${libraryStatus ? "active-library" : " "}`}>
			<h2>Library</h2>
			<div className="library-songs">
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
						queuedSongs={queuedSongs}
						setQueuedSongs={setQueuedSongs}
					/>
				))}
			</div>
		</div>
	);
};

export default Library;
