import jwt from "jsonwebtoken";

export const createToken = (payload: object, expiresIn: string = "1h"): string => {
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn,
    });
}

export const verifyToken = (token: string): string | jwt.JwtPayload => {
    return jwt.verify(token, process.env.JWT_SECRET as string);
}