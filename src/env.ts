import { LoginTicket } from 'google-auth-library';
import { googleOAuthClient } from "./" // buranın import u ne olacak?
import createHttpError from 'http-errors';

export const generateAuthUrl = (): string =>
    googleOAuthClient.generateAuthUrl({
      scope: [
        '<https://www.googleapis.com/auth/userinfo.email>',
        '<https://www.googleapis.com/auth/userinfo.profile>',
      ],
    });
  
  export const validateCode = async (code: string): Promise<LoginTicket> => {
    const response = await googleOAuthClient.getToken(code);
    if (!response.tokens.id_token) throw createHttpError(401, 'Unauthorized');
    const ticket = await googleOAuthClient.verifyIdToken({
      idToken: response.tokens.id_token,
    });
    return ticket;
  };