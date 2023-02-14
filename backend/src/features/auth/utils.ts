import { sign, SignOptions, verify } from 'jsonwebtoken';
import { accessTokenSecret } from '../../config/jwtConfig';

export const signJwt = (
  payload: string | object | Buffer,
  secret: string,
  expiresIn: string | number,
  options?: SignOptions
) => {
  return sign(payload, accessTokenSecret, {
    ...(options && options),
    expiresIn
  });
};

export const verifyJwt = (token: string, secret: string) => {
  try {
    return verify(token, secret);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
