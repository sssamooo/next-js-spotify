import { getDb } from "@/lib/db";


export default async function History() {
  const db = getDb();
  const songs = await db
    .selectFrom("songs")
    .innerJoin("playback_events", "playback_events.song_id", "songs.id")
    .select([
      "playback_events.id as event_id",
      "songs.name",
      "playback_events.event_name",
      "playback_events.event_date",
      "playback_events.user_id",
    ])
    .where("user_id", "=", 1)
    .execute();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        <h1 className="text-white text-3xl font-bold m-auto">History</h1>

        <table className="table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Events</th>
              <th>Date</th>

            </tr>
          </thead>

          <tbody>
            {songs.map((song, index) => (
              <tr key={song.event_id}>
                <td>{index + 1}</td>
                <td>{song.name}</td>
                <td>{song.event_name}</td>
                <td>
                  {new Date(song.event_date).toLocaleString()}
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </main>
    </div>
  );
}