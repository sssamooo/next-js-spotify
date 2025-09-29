import { DB } from "@/lib/db-types";
import SQLite from "better-sqlite3";
import { Kysely, SqliteDialect } from "kysely";
import Image from "next/image";

export default async function Home() {
  const dialect = new SqliteDialect({ database: new SQLite("db.sqlite") });
  const db = new Kysely<DB>({ dialect });

  const albums = await db.selectFrom("albums").select(["albums.id", "albums.name", "albums.release_date"]).execute();

  const result = await db
  .selectFrom('albums')
  .innerJoin('authors', 'albums.author_id', 'authors.id')
  .select(['albums.id', 'albums.name', 'authors.name as author_name'])
  .execute()

  console.log(result)
  console.log(albums[0])
  
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
            aria-hidden
            src="/Spotify_Full_Logo_RGB_Green.png"
            alt="spotify icon"
            width={300}
            height={300}
            className="m-auto mb-25"
          />

        

        <div className="grid grid-cols-6 gap-12">

          {albums.map((album) => (
            <div key={album.id} className="bg-blue-500 p-8 rounded-md font-semibold font-mono">
              {album.name}: {new Date(album.release_date).toDateString()}
            </div>
            ))}

        </div>

        
          

          
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
