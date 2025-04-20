/* Headers'ın içinde Authorization var mı?
    - yoksa 401
Bearer ve token var mı?
    - yoksa 401
Token geçer li mi?
    - değilse 401
Token ın süresi dolmuş mu?
    - dolmuşsa 401 mesaj: token süresi dolmuş
    - Client auth/refresh endpointine yeni accessToken almak için istek atar

    Token geçerli ise next()   */

import createHttpError from "http-errors";
import UsersCollection from "../models/user.js";
import SessionsCollection from "../models/session.js";




export const authorize = async (req, res, next) => {

    const authorization = req.get('Authorization');

    if (!authorization) {
        next(createHttpError(401, 'Authorization header is missing'));
        return;
    }

    const bearer = authorization.split("")[0];
    const token = authorization.split(" ")[1];

    if (bearer !== "Bearer" || !token) {
        next(createHttpError(401, "Invalid Token Format!"));
        return;
    }

    const session = await SessionsCollection.findOne({
        accessToken: token,
    });

    if (!session) {
        next(createHttpError(401, "Invalid Token!"));
        return;
    }

    if (session.accessTokenValidUntil < Date.now()) {
        next(createHttpError(401, "Token Expired!"));
        return;
    }

    const user = await UsersCollection.findById(session.userId);

    if (!user) {
        next(createHttpError(401, "User not found!"));
        return;
    }

    req.user = user;

    next();

};
