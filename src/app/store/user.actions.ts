import { createAction, props } from "@ngrx/store";
import { User } from "../models/user.model";

export const loadUsers = createAction('[User] Load All User');
export const loadUserSuccess = createAction('[User] Load User Success',props<{userList:User[]}>());
export const loadUserFailure = createAction('[User] Load User Failure',props<{error:string}>());

export const updateUser = createAction('[User] Update User',props<{user:User}>());
export const updateUserSuccess = createAction('[User] Update User Success',props<{user:User}>());
export const updateUserFailure = createAction('[User] Update User Failure',props<{error:string}>());

export const addUser = createAction('[user] Add user',props<{user:User}>());
export const addUserSuccess = createAction('[User] Add User Success',props<{user:User}>());
export const addUserFailure = createAction('[User] Add User Failure',props<{error:string}>());

export const setEditingUser = createAction('[User] Set Adding User',props<{userId:number|null}>());
export const setAddingUser = createAction('[User] Set Adding User',props<{adding:boolean}>());
