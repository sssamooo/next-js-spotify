import { getDb } from "@/lib/db";
import Link from "next/link";


export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params =  await searchParams;
  const query = params.q??"";

  const db = getDb();

  const songs = await db
    .selectFrom('songs')
    .where("name", "like", `%${query}%`)
    .selectAll()
    .execute()

  const authors = await db
    .selectFrom('authors')
    .where("name", "like", `%${query}%`)
    .selectAll()
    .execute()

  const albums = await db
  .selectFrom('albums')
  .where("name", "like", `%${query}%`)
  .selectAll()
  .execute()

  return (
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
 
      <div className="grid grid-cols-3 gap-6">
        <div>

          <h1 className="text-3xl font-bold mb-2 text-white">Albums</h1>
          <div className="grid grid-cols-2 gap-12">
          {albums.map((album) => (
            <div key={album.id} className=" p-4 rounded font-mono text-white">
              <Link className="font-normal hover:text-green-500" href={`/album/${album.id}`}>{album.name}</Link>
            </div>
          ))} 
          </div>

        </div>

        <div>

          <h1 className="text-3xl font-bold mb-2 text-white">Authors</h1>
          <div className="grid grid-cols-2 gap-12"> 
          {authors.map((author) => (
            <div key={author.id} className="bg-green-1000 p-8 rounded-md font-normal font-mono">
              <Link className="hover:text-green-500" href={`/author/${author.id}`}>{author.name}</Link>
            </div>
            ))}
          </div>
        </div>

        <div>

          <h1 className="text-3xl font-bold mb-2 text-white">Songs</h1>
            <div className="grid grid-cols-2 gap-12">
            {songs.map((song) => (
              <div key={song.id} className="bg-green-1000 p-8 rounded-md font-normal font-mono">
                {song.name} 
              </div>
              ))}
          </div>

        </div>
      </div>

      </main>
    </div>
  )

}