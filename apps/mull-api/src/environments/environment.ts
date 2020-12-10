require('dotenv').config();

export const environment = {
  production: false,

  db: {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
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
  client: {
    baseUrl: process.env.CLIENT_BASE_URL,
  },
};
