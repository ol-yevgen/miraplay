import { IAccessToken } from './AuthTypes'

export interface IActiveFilterState {
    activeFilter: string,
    sort: boolean
}

export interface IGameTypes {
    commonGameName: string,
    createdAt: string,
    exactingness: string,
    gameClass: string,
    gameDescription: string,
    gameImage: string,
    gameImages: string[],
    gameLaunchers: string[],
    gameVideoUrl: string,
    genre: string,
    inTop: boolean,
    publisher: string,
    releaseDate: string,
    systemGameName: string,
    updatedAt: string,
    __v: number,
    _id: string,
}

export interface IGamesListTypes {
    games: IGameTypes[],
    gamesListLength: number
}

export interface IReqBodyTypes {
    page: number,
    isFreshGamesFirst: boolean,
    genre: boolean | string,
    gamesToShow: number
}

export interface IProfileInfoReq extends IAccessToken{
    id: string
}

export interface IFiltersList {
    id: string,
    label: string
}
