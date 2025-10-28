import { sql, type Kysely } from 'kysely'


export async function up(db: Kysely<unknown>): Promise<void> {
	await sql `CREATE TABLE playlists(
			id integer primary key autoincrement not null,
			name text not null
		) STRICT`.execute(db);

	await sql `CREATE TABLE playlists_songs(
			id integer primary key autoincrement not null,
			playlist_id integer not null,
			song_id integer not null,
			FOREIGN KEY (playlist_id) REFERENCES playlists(id),
    	FOREIGN KEY (song_id) REFERENCES songs(id)
		) STRICT`.execute(db);
}


