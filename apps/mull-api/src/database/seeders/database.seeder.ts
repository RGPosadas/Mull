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
        { userId_1: a[i + 1].id, userId_2: a[i].id },
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

const US3_1Seeder = async (connection: Connection) => {
  await connection.query('UPDATE `mull-dev`.event SET hostId = 1 WHERE event.id = 1');
  try {
    await connection.query('INSERT INTO `mull-dev`.event_participants VALUES (1, 2)');
  } catch (e) {
    // user 2 is already a participant of event 1
  }
};

const US8_1Seeder = async (connection: Connection) => {
  await connection.query(
    "INSERT INTO `mull-dev`.user (id, `password`, `email`, `timezone`, `registrationMethod`, `tokenVersion`, `joinDate`, `name`, `description`) VALUES ('8100', 'password', 'first@us81.test', '', 'LOCAL', '0', '2021-04-04 14:16:39', 'test1', '');"
  );
  await connection.query(
    "INSERT INTO `mull-dev`.user (id, `password`, `email`, `timezone`, `registrationMethod`, `tokenVersion`, `joinDate`, `name`, `description`) VALUES ('8101', 'password', 'second@us81.test', '', 'LOCAL', '0', '2021-04-04 14:16:39', 'test2', '');"
  );
  await connection.query(
    "INSERT INTO `mull-dev`.user (id, `password`, `email`, `timezone`, `registrationMethod`, `tokenVersion`, `joinDate`, `name`, `description`) VALUES ('8102', 'password', 'third@us81.test', '', 'LOCAL', '0', '2021-04-04 14:16:39', 'test2', '');"
  );
  await connection.query('INSERT INTO `mull-dev`.friends VALUES (8101, 1), (8102, 1)');
};

const US8_5Seeder = async (connection: Connection) => {
  await connection.query('INSERT INTO `mull-dev`.friends VALUES (1,2), (2,1), (1,3), (3,1)');
};

export default class DatabaseSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Event)().createMany(10);
    await createPosts(connection, factory);
    await US3_1Seeder(connection);
    await US8_1Seeder(connection);
    await US8_5Seeder(connection);
    await createFriends(connection);
  }
}
