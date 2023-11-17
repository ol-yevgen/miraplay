export interface IAccessToken {
    accessToken?: string | null 
}

export type TUserInfo = {
    userName?: string,
    userId?: string,
    nickName?: string
    email?: string
    fullName?: string
}

export interface IResMessage {
    message?: string
}

export interface ILogoutRes {
    accessToken?: IAccessToken,
    message: string
}

export interface IUserPayload {
    userInfo?: TUserInfo | null,
}

export interface ILoginRes {
    accessToken?: string | null,
    userInfo?: TUserInfo | null,
    message?: string
}

export interface IRegRes {
    message?: string
}

export interface IUserStateTypes {
    accessToken?: string | null,
    userInfo?: TUserInfo | null,
}

export interface ILoginTypes {
    email: string,
    password: string
}

export interface IRegistrationTypes extends ILoginTypes {
    firstName?: string,
    lastName?: string,
}

interface INickname {
    nickName: string,
}

export interface ICreateNickname extends IAccessToken {
    nickName: INickname,
    id: string
}

export interface ICreateNicknameRes extends IAccessToken{
    nickName: INickname,
    message: string
}

export interface IUpdateEmail {
    oldEmail: string,
    newEmail: string
}

export interface IUpdateEmailReq extends IAccessToken {
    updateEmail: IUpdateEmail,
}
