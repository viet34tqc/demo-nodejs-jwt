// Why do I export an object instead of individual variable
// + Variable name can be conflicted
// + You don't need to remember variable name exactly, Editor will take care the suggestion.

export const baseConfig = {
  port: process.env.PORT || '3001',
  origin: process.env.ORIGIN || 'http://localhost:5173',
  domain: process.env.DOMAIN || 'localhost', // need for setting cookie on production, two subdomains won't understand cookie from each other without domain attribute
  accessTokenSecret: process.env.ACCESS_SECRET || 'demo-nodejs-jwt',
  refreshTokenSecret: process.env.REFRESH_SECRET || 'demo-nodejs-jwt-refresh',
  accessTokenExpiration: Number(process.env.ACCESS_EXPIRATION) * 1000 || 3600 * 1000, // 1 hour
  refreshTokenExpiration: Number(process.env.REFRESH_EXPIRATION) * 1000 || 31536000 * 1000, // 365 days

  GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  GOOGLE_OAUTH_REDIRECT: process.env.GOOGLE_OAUTH_REDIRECT
};
