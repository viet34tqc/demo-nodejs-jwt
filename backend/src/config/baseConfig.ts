// Why do I export an object instead of individual variable
// + Variable name can be conflicted
// + You don't need to remember variable name exactly, Editor will take care the suggestion.

export const baseConfig = {
  port: process.env.PORT || '3001',
  origin: process.env.ORIGIN || 'http://localhost:5173',
  accessTokenSecret: process.env.ACCESS_SECRET || 'demo-nodejs-jwt',
  refreshTokenSecret: process.env.REFRESH_SECRET || 'demo-nodejs-jwt-refresh',
  accessTokenExpiration: Number(process.env.ACCESS_EXPIRATION) * 1000 || 3600 * 1000, // 1 hour
  refreshTokenExpiration: Number(process.env.REFRESH_EXPIRATION) * 1000 || 31536000 * 1000 // 365 days
};
