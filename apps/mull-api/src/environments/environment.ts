require('dotenv').config();

export const environment = {
  production: false,

  db: {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
};
