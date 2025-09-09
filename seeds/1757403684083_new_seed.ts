import { DB } from "@/lib/db-types";
import type { Kysely } from 'kysely';
import { faker } from '@faker-js/faker';

export async function seed(db: Kysely<DB>): Promise<void> {
	await db.deleteFrom('authors').execute();

	for (let i = 1; i <= 10; i++) {
		await db.insertInto('authors').values({
			name: faker.music.artist(),
			bio: faker.lorem.sentence(),
		}).execute();
	}

	for (let i = 1; i <= 10; i++) {
		await db.insertInto('songs').values({
			album_id: i,
			name: faker.music.songName(),
			duration: Math.floor(Math.random() * 180)
		}).execute();
	}
	
}
