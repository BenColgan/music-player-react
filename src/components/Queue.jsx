import React from "react";
import QueueSong from "./QueueSong";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const Queue = ({ queuedSongs, isPlaying, queueStatus, setQueuedSongs }) => (
	<div className={`queue ${queueStatus ? "queue--active" : ""}`}>
		<h2 className="queue__title">Queue</h2>
		<div className="queue__songs">
			{queuedSongs.length === 0 ? (
				<p className="queue__empty">No songs in queue</p>
			) : (
				queuedSongs.map((song) => (
					<QueueSong
						songs={queuedSongs}
						cover={song.cover}
						name={song.name}
						artist={song.artist}
						key={song.id}
						id={song.id}
						isPlaying={isPlaying}
						setQueuedSongs={setQueuedSongs}
						queuedSongs={queuedSongs}
					/>
				))
			)}
		</div>
		{queuedSongs.length > 0 && (
			<div className="queue__play">
				<FontAwesomeIcon icon={faPlay} />
				<span>
					Play {queuedSongs.length} song{queuedSongs.length > 1 ? "s" : ""} in
					queue
				</span>
			</div>
		)}
	</div>
);

export default Queue;
