"use client"

import { removeSongFromPlaylist } from "@/actions/playlists"
import { redirect } from "next/navigation";

export default function RemovePlaylistSongButton(props: {
  playlistId: number;
  songId: number;
}) {
  return (
    <button className="btn btn-xs"
    onClick={() => {console.log("Remove")
      removeSongFromPlaylist(props.playlistId, props.songId);
      redirect(`/playlists/${props.playlistId}`);
    }}>
      Remove
    </button>
  )
}