import { DB } from "@/lib/db-types";
import SQLite from "better-sqlite3";
import { Kysely, SqliteDialect } from "kysely";
import Image from "next/image";
import Link from 'next/link'


export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  
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
        
        <div className="grid grid-cols-4 gap-12">

          {albums.map((album) => (
            <div key={album.id} className="bg-gray-900 p-4 rounded font-mono text-white">
              <h1 className="font-semibold text-xl">{album.name}</h1>
              <p className="text-sm text-gray-400">{new Date(album.release_date).toDateString()}</p>
              <p className="text-xs text-gray-500">ID: {album.id}</p>
              <Link className="block mt-4 text-green-500 hover:text-green-400" href={`/album/${album.id}`}>
                Details
              </Link>
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
