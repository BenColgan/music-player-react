import React from "react";
import QueueSong from "./QueueSong";

const Queue = ({ queuedSongs, isPlaying, queueStatus, setQueuedSongs }) => (
	<div className={`queue ${queueStatus ? "active-queue" : ""}`}>
		<h2>Queue</h2>
		<div className="queue-songs">
			{queuedSongs.length === 0 ? (
				<p className="empty-queue">No songs in queue</p>
			) : (
				queuedSongs.map((song) => (
					<QueueSong
						songs={queuedSongs}
						cover={song.cover}
						name={song.name}
						artist={song.artist}
						active={song.active}
						key={song.id}
						id={song.id}
						isPlaying={isPlaying}
						setQueuedSongs={setQueuedSongs}
						queuedSongs={queuedSongs}
					/>
				))
			)}
		</div>
	</div>
);

export default Queue;
