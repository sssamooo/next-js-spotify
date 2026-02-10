'use client';

import { AddSong } from '@/actions/playlists';
import { redirect } from 'next/navigation';

export function AddToPlaylistButton(props: { playlists: object; songId: number }) {
	const playlistArray = Object.values(props.playlists);



	return (
		<details className="dropdown">
			<summary className="btn m-1">Add to playlist</summary>
			<ul className="menu dropdown-content bg-base-100 grid grid-cols-1 rounded-box z-1 w-52 p-2 shadow-sm top-0 mt-0 max-h-60 overflow-y-auto"
				style={{ bottom: '100%', top: 'auto' }}>
				{playlistArray.map((playlist: { id: number; name: string }) => (
					<li key={playlist.id} value={playlist.id}>
						<button
							onClick={() => {
								AddSong(props.songId, playlist.id);
								redirect(`/playlists/${playlist.id}`);
							}}
						>
							{playlist.name}
						</button>
					</li>
				))}
			</ul>
		</details>
	);
}