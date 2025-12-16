"use client"

import { removePlaylist } from "@/actions/playlists"
import { redirect } from "next/navigation";

export default function RemovePlaylistButton(props: {
  playlistId: number;
}) {
  return (
    <button className="btn btn-xs"
    onClick={() => {console.log("Remove")
      removePlaylist(props.playlistId);
      redirect('/playlists');
    }}>
      Remove
    </button>
  )
}