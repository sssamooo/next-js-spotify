"use client";

import Image from "next/image"
import Link from "next/link"
import { useState } from "react";

export default function Navbar() {
  const [searchInput, setSearchInput] = useState("");
  console.log("Navbar render, searchInput:", searchInput)

  const searchLinkquery = searchInput !== "" ? { q: searchInput } : {};

  return (
    <div className="navbar bg-black-100 shadow-sm">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          <Image
            aria-hidden
            src="/Spotify_Full_Logo_RGB_Green.png"
            alt="spotify icon"
            width={150}
            height={150}
            className="m-auto mb-25"
          /></Link>
      </div>
      <div className="flex gap-2">
        <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" onChange={(e) => {
          console.log(e)
          setSearchInput(e.target.value)
        }}
        />
        <Link className="btn btn-ghost" href={{
          pathname: '/search',
          query: searchLinkquery
        }}>Search</Link>

        <Link className="btn btn-ghost" href="/playlists">Playlists</Link>
        <Link className="btn btn-ghost" href="/liked_songs">Liked Songs</Link>
      </div>
    </div>
  )

}

