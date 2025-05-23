
import { OAuth2Client } from 'google-auth-library';
// import googleOAuthConfig from "../../google-oauth.json" with { type: "json" };;
import path from 'node:path';
import { readFile } from 'fs/promises';
import createHttpError from 'http-errors';
import { env } from "../env.js";


const PATH_JSON = path.join(process.cwd(), 'google-oauth.json');
const parsedOAuthConfig = JSON.parse(await readFile(PATH_JSON));


const googleOAuthClient = new OAuth2Client({
  clientId: env(`GOOGLE_AUTH_CLIENT_ID`), // çevresel değişkenleri değiştiriyoruz
  clientSecret: env(`GOOGLE_AUTH_CLIENT_SECRET`), // çevresel değişkenleri değiştiriyoruz
  redirectUri: parsedOAuthConfig.web.redirect_uris[0],
});

export const generateAuthUrl = () =>
  googleOAuthClient.generateAuthUrl({
    scope: [
      '<https://www.googleapis.com/auth/userinfo.email>',
      '<https://www.googleapis.com/auth/userinfo.profile>',
    ],
  });


  // Aşağıdaki iki fonksiyonu hoca tek fonksiyonda yazdı
export const validateCode = async (code) => {
  const response = await googleOAuthClient.getToken(code);
  if (!response.tokens.id_token) throw createHttpError(401, 'Invalid Token!');

  const ticket = await googleOAuthClient.verifyIdToken({
    idToken: response.tokens.id_token,
  });
  return ticket;
};
export const getFullNameFromGoogleTokenPayload = (payload) => {
  let fullName = 'Guest';
  if (payload.given_name && payload.family_name) {
    fullName = `${payload.given_name} ${payload.family_name}`;
  } else if (payload.given_name) {
    fullName = payload.given_name;
  }

  return fullName;
};

