// TODO:
export const accessTokenSecret = process.env.ACCESS_SECRET || 'demo-nodejs-jwt';
export const refreshTokenSecret = process.env.REFRESH_SECRET || 'demo-nodejs-jwt-refresh';
export const accessTokenExpiration = Number(process.env.ACCESS_EXPIRATION) || 3600; // 1 hour
export const refreshTokenExpiration = Number(process.env.REFRESH_EXPIRATION) || 31536000; // 365 days
