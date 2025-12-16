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

export async function CreatePlaylist(formData: FormData) {
  console.log("createPlaylist:", formData);
  const playlistName = formData.get("playlistName"); 
  if (playlistName == null) {
    throw new Error("Playlist name is required");
  }

  const playlistNameStr = playlistName.toString();

  if (playlistNameStr === "") {
    throw new Error("Playlist name cannot be empty");

    console.log("playlistNameStr:", playlistNameStr);
  }

  console.log("playlistNameStr:", playlistNameStr);

  const db = getDb();

  const newPlaylist = await db
    .insertInto("playlists")
    .values({
      name: playlistNameStr,
      user_id: 1,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  redirect(`/playlists/${newPlaylist.id}`);
}

export async function UpdatePlaylist(formData: FormData) {
  console.log("updatePlaylist:", formData);
  const playlistName = formData.get("playlistName");
  const playlistId = formData.get("playlistId")?.toString();;

  if (playlistName == null) {
    throw new Error("Playlist name is required");
  }

  if (playlistId == null) {
    throw new Error("Playlist id is required");
  }

  const playlistNameStr = playlistName.toString();

  if (playlistNameStr === "") {
    throw new Error("Playlist name cannot be empty");
  }

  const db = getDb();

  await db
    .updateTable("playlists")
    .set({
      name: playlistNameStr,
    })
    .where("id", "=", Number(playlistId))
    .execute();

  redirect(`/playlists/${playlistId}`);
}