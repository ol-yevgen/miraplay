import { Request } from "express";

import jwt from 'jsonwebtoken'

declare module 'jsonwebtoken' {
    export interface UserIDJwtPayload extends jwt.JwtPayload {
        userId: string
    }
}
export interface UserIdRequest extends Request {
    userId?: string
}
