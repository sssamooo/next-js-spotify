import { getDb } from "@/lib/db";
import Link from 'next/link'

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const db = getDb();
  
    const result = await db
    .selectFrom('authors')
    .where("id", "=", Number(id))
    .selectAll()
    .execute()
  
    const author_name = result[0]?.name ?? "Unknown";
    const bio = result[0]?.bio ?? "Unknown";
  
    const albums = await db
    .selectFrom('albums')
    .where("author_id", "=", Number(id))
    .selectAll()
    .execute()
  
   
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-6xl font-bold text-white m-auto">{author_name}</h1>
        <p className="m-auto">Bio: {bio}</p>
        <p className="text-3xl font-bold m-auto">Albums:</p>
        

        <div className="m-auto">
          {albums.map((album) => (
            <div key={album.id} className="p-4 text-center">
              <Link className=" text-white underline" href={`/album/${album.id}`}>{album.name}</Link>
            </div>
            ))}
      
        </div>


      </main>
    </div>
  );
}
