import { createReducer, on } from "@ngrx/store";
import { User } from "../models/user.model";
import * as userAction from './user.actions'
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

export interface UserState extends EntityState<User> {
    loading:boolean,
    error:string,
    editingUserId:number | null,
    addingUser:boolean
}

export const userAdapter:EntityAdapter<User> = createEntityAdapter<User>();
export const initialState: UserState = userAdapter.getInitialState( {
    error:'',
    loading:false,
    editingUserId:null,
    addingUser:false
});

export const userReducer = createReducer(initialState,
    on(userAction.loadUsers,state => ({
        ...state,
        loading:true,
        error:''
    })),
    on(userAction.loadUserSuccess,(state,{userList})=>{
        return userAdapter.setAll(userList,{
            ...state,
            users:userList,
            loading:false
        })
    }),
    on(userAction.loadUserFailure,(state,{error})=>({
        ...state,
        error,
        loading:false
    })),
    on(userAction.updateUser,state=>({
        ...state,
        loading:true,
        error:''
    })),
    on(userAction.updateUserSuccess,(state,{user})=>{
        return userAdapter.updateOne({id:user.id,changes:user},{
            ...state,
            loading:false,
            editingUserId:null
        })
    }),
    on(userAction.updateUserFailure,(state,{error})=>({
        ...state,
        loading:false,
        error
    })),
    on(userAction.addUser,state=>({
        ...state,
        loading:true,
        error:''
    })),
    on(userAction.addUserSuccess,(state,{user})=>{
        return userAdapter.setOne(user,{
            ...state,
            loading:false,
            addingUser:false
        })
    }),
    on(userAction.addUserFailure,(state,{error})=>({
        ...state,
        loading:false,
        error
    })),
    on(userAction.setEditingUser,(state,{userId})=>({
        ...state,
        editingUserId:userId
    })),
    on(userAction.setAddingUser,(state,{adding})=>({
        ...state,
        addingUser:adding
    }))
)