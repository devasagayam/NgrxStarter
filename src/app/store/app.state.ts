import { userReducer, UserState } from "./user.reducers";


export interface AppState {
    user:UserState
}

export const appReducer = {
    user : userReducer
}