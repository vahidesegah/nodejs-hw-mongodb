import bcrypt from 'bcrypt';
import { UsersCollection } from '../models/user.js';
import createHttpError from 'http-errors';
import { randomBytes } from 'crypto';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';
import { SessionsCollection } from '../models/session.js';
import jwt from 'jsonwebtoken';
import { SMTP } from "../constants/index.js";
import { env } from "../env.js";
import { sendEmail } from "../utils/sendMail.js";

export const registerUser = async (userData) => {
  const user = await UsersCollection.findOne({ email: userData.email });
  if (user) throw createHttpError(409, 'Email in use');
  
 const encryptedPassword = await bcrypt.hash(userData.password, 10);

  return await UsersCollection.create({
    ...userData,
    password: encryptedPassword,
  });

};

export const loginUser = async (userData) => {
  const user = await UsersCollection.findOne({ email: userData.email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const isEqual = await bcrypt.compare(userData.password, user.password);

  if (!isEqual) {
    throw createHttpError(401, 'Invalid Password');
  }
// diğer sessionlar varsa sil 
  await SessionsCollection.deleteMany({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  const accessTokenValidUntil = new Date(Date.now() + FIFTEEN_MINUTES);
  const refreshTokenValidUntil = new Date(Date.now() + ONE_DAY);  

  return await SessionsCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });
};

export const logoutUser = async (sessionId) => {
  await SessionsCollection.findByIdAndDelete({ _id: sessionId });
};


const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  };
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionsCollection.findById({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Refresh token expired');
  }
  
  const newSession = createSession();

  await SessionsCollection.deleteMany({ _id: sessionId, refreshToken });

  return await SessionsCollection.create({
    userId: session.userId,
    ...newSession,
  });
};

export const requestResetToken = async (email) => {
  const user = await UsersCollection.findOne({ email});
  if (!user) {
    throw createHttpError(404, "User not found!");
  }
  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
  },
  env("JWT_SECRET"),
  {
    expiresIn: "15m",
  },
);
await sendEmail({
  from: env(SMTP.SMTP_FROM),
  to: email,
  subject: "Reset Your Password",
  html: `<p>Click <a href="${resetToken}">here</a> to reset your password!</p>`,
});
};