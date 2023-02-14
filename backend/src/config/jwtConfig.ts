// TODO:
export const accessTokenSecret = process.env.ACCESS_SECRET || 'demo-nodejs-jwt';
export const refreshTokenSecret = process.env.REFRESH_SECRET || 'demo-nodejs-jwt-refresh';
export const accessTokenExpiration = process.env.ACCESS_EXPIRATION || '1h';
export const refreshTokenExpiration = process.env.REFRESH_EXPIRATION || '365d';
