"use server"

import { getDb } from "@/lib/db";
import { redirect } from "next/navigation";

const db = getDb();

export async function removeSongFromPlaylist(playlistId: number, songId: number) {
  

  await db
    .deleteFrom("playlists_songs")
    .where("playlist_id", "=", playlistId)
    .where("song_id", "=", songId)
    .execute();


  console.log(`Removing song ${songId} from playlist ${playlistId}`);
}

export async function removePlaylist(playlistId: number) {
   
  await db
    .deleteFrom("playlists_songs")
    .where("playlist_id", "=", playlistId)
    .execute();

  await db
    .deleteFrom("playlists")
    .where("id", "=", playlistId)
    .execute();
  
}

export async function AddSong(songId: number, playlistId: number) {
  
  await db
		.insertInto('playlists_songs')
		.values({
			playlist_id: playlistId,
			song_id: songId,
		})
		.execute();

	console.log(`Adding song ${songId} playlist ${playlistId}`);
}