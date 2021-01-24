import dotenv = require('dotenv');
dotenv.config();

export const environment = {
  production: false,

  db: {
    host: process.env.TYPEORM_HOST,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    port: 3306,
  },
  auth: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    },
    twitter: {
      consumerId: process.env.TWITTER_CONSUMER_ID,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    },
  },
  session: {
    secret: process.env.SESSION_SECRET,
  },
  jwt: {
    accessSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshSecret: process.env.REFRESH_TOKEN_SECRET,
  },
  googleApi: {
    placesApi: process.env.GOOGLE_KEY,
  },
  client: {
    baseUrl: 'http://localhost:4200',
  },
  backend: {
    url: 'http://localhost:3333',
  },
};
