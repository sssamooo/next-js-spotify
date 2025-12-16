import { getDb } from "@/lib/db";
import Link from 'next/link'
import { AddToPlaylistButton } from "./AddSongToPlaylist";


export default async function AlbumDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const db = getDb();

  const songs = await db
    .selectFrom('songs')
    .where("album_id", "=", Number(id))
    .selectAll()
    .execute()

  console.log(songs)

  const albums = await db
  .selectFrom('albums')
  .select(["name", "author_id"])
  .where("albums.id", "=", Number(id))
  .execute()

  const album_name = albums[0]?.name ?? "Unknown";
  
  console.log(album_name)

  const author_id = albums[0]?.author_id ?? "Unknown";

  const author = await db
  .selectFrom("authors")
  .where("id", "=", Number(author_id))
  .select(["name"])
  .execute();

  const author_name = author[0]?.name ?? "Unknown";

  const playlists = await db.selectFrom('playlists').select(["playlists.id", "playlists.name"]).where('user_id', '=', 1).execute();
 

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        
        <h1 className="text-white text-3xl font-bold m-auto">{album_name}</h1>
        <h1 className="text-white text-3x m-auto">by</h1>
        <Link className="text-white text-2xl underline m-auto" href={`/author/${author_id}`}>{author_name}</Link>

        <table className="table">
          
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Duration</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {songs.map((song, i) => (
                <tr key={song.id}>
                  <td>{i + 1}</td>
                  <td>{song.name}</td>
                  <td>{Math.floor(song.duration / 60)}m {song.duration % 60}s</td>
                  <td>
									  <AddToPlaylistButton songId={song.id} playlists={playlists} />
								  </td>
                </tr>
               ))}
            </tbody>
            
      
        </table>


      </main>
    </div>
  );
}
