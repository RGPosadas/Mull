import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Event, Post } from '../../app/entities';
import faker = require('faker');

/* eslint-disable @typescript-eslint/no-explicit-any */

faker.seed(123);

/**
 * For each user, add the next 3 users with greater id's as friends with the exception of the last 2 users
 * @param connection
 */

const createFriends = async (connection: Connection) => {
  const a: any[] = await connection.query('SELECT id FROM `mull-dev`.user');
  for (let i = 0; i < a.length - 3; i++) {
    const query = connection
      .createQueryBuilder()
      .insert()
      .into('friends')
      .values([
        { userId_1: a[i].id, userId_2: a[i + 1].id },
        { userId_1: a[i].id, userId_2: a[i + 2].id },
        { userId_1: a[i].id, userId_2: a[i + 3].id },
      ]);

    const [sql, args] = query.getQueryAndParameters();
    const nsql = sql.replace('INSERT INTO', 'INSERT IGNORE INTO');

    await connection.manager.query(nsql, args);
  }
};

const createPosts = async (connection: Connection, factory: Factory) => {
  const count = await connection.query('SELECT COUNT(*) FROM `mull-dev`.channel');
  await factory(Post)(parseInt(count[0]['COUNT(*)'])).createMany(50);
};

export default class DatabaseSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Event)().createMany(10);
    await createPosts(connection, factory);
    await createFriends(connection);
  }
}
