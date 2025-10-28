import { getDb } from "@/lib/db";
import Link from 'next/link'

export default async function PlaylistDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const db = getDb();

  const result = await db
  .selectFrom("playlists_songs")
  .where("playlist_id", "=", Number(id))
  .innerJoin("songs", "songs.id", "playlists_songs.song_id")
  .select(["songs.id", "songs.name"])
  .execute();


  const playlistName = await db
  .selectFrom("playlists")
  .where("playlists.id", "=", Number(id))
  .selectAll()
  .execute();

  const name = playlistName[0]?.name ?? "Unknown";
  
  
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        <h1 className="text-white text-3xl font-bold m-auto">{name}</h1>
        
        <table className="table">
          
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
              </tr>
            </thead>

            <tbody>
              {result.map((result, i) => (
                <tr key={result.id}>
                  <td>{i + 1}</td>
                  <td>{result.name}</td>
                
                </tr>
               ))}
            </tbody>   

        </table>

      </main>
    </div>
  );
}
