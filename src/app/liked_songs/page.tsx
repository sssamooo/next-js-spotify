import { getDb } from "@/lib/db";
import { RemoveLikeButton } from "../playlists/[id]/RemoveLikeButton";

export default async function LikedSongs() {
  const db = getDb();
  const songs = await db
    .selectFrom("songs")
    .innerJoin("user_liked_songs", "user_liked_songs.song_id", "songs.id")
    .select(["songs.id", "user_liked_songs.id as liked_song_id", "songs.name", "songs.duration"])
    .where("user_id", "=", 1)
    .execute()

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        <h1 className="text-white text-3xl font-bold m-auto">Liked Songs</h1>

        <table className="table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {songs.map((song, i) => (
              <tr key={song.id}>
                <td>{i + 1}</td>
                <td>{song.name}</td>
                <td>
                  <RemoveLikeButton songId={song.id} />
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </main>
    </div>
  );
}