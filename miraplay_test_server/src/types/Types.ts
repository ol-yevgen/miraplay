import { Request } from 'express-serve-static-core'
import jwt from 'jsonwebtoken'

declare module 'jsonwebtoken' {
    export interface UserIDJwtPayload extends jwt.JwtPayload {
        userId: string
    }
}

export interface RegisterUserBody {
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
}

export interface IUserCreateNickNameBody {
    nickname?: string,
}

export interface AccessTokenRequest extends Request {
    accessToken?: string
}

export interface INickNameCreateReq extends Request {
    nickName?: IUserCreateNickNameBody,
    accessToken?: string
}

export interface INickNameCreateReq extends Request {
    nickName?: IUserCreateNickNameBody,
    accessToken?: string
}

export interface IUpdateEmail {
    oldEmail: string,
    newEmail: string
}
