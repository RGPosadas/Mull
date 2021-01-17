require('dotenv').config();

export const environment = {
  production: true,

  db: {
    host: process.env.TYPEORM_HOST,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
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
    baseUrl: 'https://www.mullapp.com',
  },
  backend: {
    url: 'https://www.mullapp.com',
  },
};
