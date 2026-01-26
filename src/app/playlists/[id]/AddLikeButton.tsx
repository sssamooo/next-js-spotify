"use client";

import { addLikeSong } from "@/actions/likesong";

export function AddLikeButton(props: {
  songId: number;
}) {
  return (
    <button
      className="btn"
      onClick={() => {
        addLikeSong(props.songId);
      }}
    >
      Like
    </button>
  );
}