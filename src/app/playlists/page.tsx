import { getDb } from "@/lib/db";
import Link from "next/link";
import { CreatePlaylistButton } from "./[id]/CreatePlaylistButton";

export default async function Home() {
  const db = getDb();

  const playlists = await db
    .selectFrom("playlists")
    .where("user_id", "=", 1)
    .selectAll()
    .execute();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <CreatePlaylistButton />

        <div className="grid grid-cols-4 gap-12">

          {playlists.map((playlist) => (
            <div key={playlist.id} className="bg-gray-900 p-4 rounded font-mono text-white">
              <Link className="font-semibold text-xl hover:text-green-500" href={`/playlists/${playlist.id}`}>{playlist.name}</Link>
              <p className="text-xs text-gray-500">ID: {playlist.id}</p>
              <p className="text-xs text-gray-500">User ID: {playlist.user_id}</p>
            </div>
          ))}

        </div>

      </main>
    </div>
  );
}