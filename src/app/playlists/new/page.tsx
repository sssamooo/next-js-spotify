import { CreatePlaylist } from "@/actions/playlists";

export default async function CreatePlaylistsPage() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <p className="text-2xl font-bold">Create Playlist</p>
        <form action={CreatePlaylist}>
          <input type="text" name="playlistName" className="input">
          </input>
          <input type= "submit" value="Create Playlist" className="btn mt-4"></input>
        </form>
      </main>
    </div>
  );
}
