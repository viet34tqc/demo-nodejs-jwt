import axios from 'axios';
import qs from 'qs';
import { baseConfig } from '../../config/baseConfig';

type GoogleOauthToken = {
  access_token: string;
  id_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  scope: string;
};

type GoogleUserResult = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
};

export async function getGoogleOauthToken({ code }: { code: string }): Promise<GoogleOauthToken> {
  const rootURl = 'https://oauth2.googleapis.com/token';

  const options = {
    code,
    client_id: baseConfig.GOOGLE_OAUTH_CLIENT_ID,
    client_secret: baseConfig.GOOGLE_OAUTH_CLIENT_SECRET,
    redirect_uri: baseConfig.GOOGLE_OAUTH_REDIRECT,
    grant_type: 'authorization_code'
  };
  try {
    const { data } = await axios.post<GoogleOauthToken>(rootURl, qs.stringify(options), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return data;
  } catch (error) {
    throw new Error('Failed to fetch Google Oauth Tokens');
  }
}

export async function getGoogleUser({
  id_token,
  access_token
}: {
  id_token: string;
  access_token: string;
}): Promise<GoogleUserResult> {
  try {
    const { data } = await axios.get<GoogleUserResult>(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`
        }
      }
    );

    return data;
  } catch (error) {
    throw new Error('Failed to fetch Google Oauth Tokens');
  }
}
