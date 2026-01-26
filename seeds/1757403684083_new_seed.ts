import { DB } from "@/lib/db-types";
import type { Kysely } from 'kysely';
import { faker } from '@faker-js/faker';

export async function seed(db: Kysely<DB>): Promise<void> {
  await db.deleteFrom("playlists_songs").execute();
  await db.deleteFrom("user_liked_songs").execute();
  await db.deleteFrom("songs").execute();
  await db.deleteFrom("albums").execute();
  await db.deleteFrom("authors").execute();
  await db.deleteFrom("playlists").execute();
  await db.deleteFrom("users").execute();

  for (let i = 0; i < 20; i += 1) {
    const numBioParagraphs = faker.number.int({ min: 0, max: 5 });

    const bio =
      numBioParagraphs !== 0 ? faker.lorem.paragraph(numBioParagraphs) : null;

    await db
      .insertInto("authors")
      .values({
        name: faker.music.artist(),
        bio,
      })
      .execute();
  }

  const authors = await db.selectFrom("authors").selectAll().execute();

  for (const author of authors) {
    const numAlbums = faker.number.int({ min: 0, max: 10 });
    const numSongs = faker.number.int({ min: 10, max: 20 })

    console.log(author.name, numAlbums, numSongs);

    for (let i = 0; i < numAlbums; i += 1) {
      await db
        .insertInto("albums")
        .values({
          author_id: author.id,
          name: faker.music.album(),
          release_date: faker.date.past().getTime(),
        })
        .execute();
    }
  }

  const albums = await db.selectFrom("albums").selectAll().execute();

  for (const album of albums) {
    const typeOfAlbum = faker.number.int({ min: 0, max: 9 });
    let numSongs = 1;

    if (typeOfAlbum < 2) {
      numSongs = 1;
    } else if (typeOfAlbum < 5) {
      numSongs = faker.number.int({ min: 4, max: 6 });
    } else {
      numSongs = faker.number.int({ min: 10, max: 20 });
    }


    console.log(album.name, numSongs);

    for (let i = 0; i < numSongs; i += 1) {
      await db
        .insertInto("songs")
        .values({
          album_id: album.id,
          name: faker.music.songName(),
          duration: faker.number.int({ min: 60, max: 240 }),
        })
        .execute();
    }
  }

  // prvy user

  await db
    .insertInto("users")
    .values({
      id: 1,
      email: "user1@mail.com",
      password: "123456789",
      name: "user1",
    })
    .execute();


  for (let i = 1; i < 11; i++) {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const name = faker.person.firstName();

    await db
      .insertInto("users")
      .values({
        email: email,
        password: password,
        name: name,
      })
      .execute();

  }

  const songs = await db.selectFrom("songs").selectAll().execute();
  const users = await db.selectFrom("users").selectAll().execute();

  for (const user of users) {
    const numPlaylists = faker.number.int({ min: 3, max: 10 })

    const num_liked_songs = faker.number.int({ min: 5, max: 20 });
    const randomSongs = faker.helpers.shuffle(songs);
    const likedSongs = randomSongs.slice(0, num_liked_songs);

    for (const song of likedSongs) {
      await db
        .insertInto('user_liked_songs')
        .values({
          user_id: user.id,
          song_id: song.id,
        })
        .execute();
    }


    for (let i = 1; i < numPlaylists; i++)
      await db
        .insertInto("playlists")
        .values({
          name: 'Playlist' + i,
          user_id: user.id,
        })
        .execute();
  }


  const playlists = await db.selectFrom("playlists").selectAll().execute();

  for (const playlist of playlists) {
    const nSongs = faker.number.int({ min: 15, max: 50 })
    const randomSongs = faker.helpers.shuffle(songs);
    const selectSongs = randomSongs.slice(0, nSongs);

    for (const song of selectSongs) {
      await db
        .insertInto('playlists_songs')
        .values({
          playlist_id: playlist.id,
          song_id: song.id,
        })
        .execute();
    }


  }
}