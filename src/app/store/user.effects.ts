import { inject, Injectable } from "@angular/core";
import { UserService } from "../services/user.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as userActions from './user.actions';
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class UserEffects {
    userService:UserService = inject(UserService);
    action$:Actions = inject(Actions)

    loadUser$ = createEffect(()=>this.action$.pipe(
        ofType(userActions.loadUsers),
        mergeMap(()=>this.userService.getUsers().pipe(
            map((users)=>userActions.loadUserSuccess({userList:users})),
            catchError((error)=>of(userActions.loadUserFailure({error:'could not fetch user please try again'})))
        ))
    ));

    updateUser$ = createEffect(()=>this.action$.pipe(
        ofType(userActions.updateUser),
        mergeMap(({user})=>this.userService.updateUser(user).pipe(
            map((user)=>userActions.updateUserSuccess({user:user})),
            catchError((error)=>of(userActions.updateUserFailure({error:'could not update user please try again'})))
        ))
    ))

    addUser$ = createEffect(()=>this.action$.pipe(
        ofType(userActions.addUser),
        mergeMap(({user})=>this.userService.addUser(user).pipe(
            map((newUser)=>userActions.addUserSuccess({user:newUser})),
            catchError((error)=>of(userActions.addUserFailure({error:'could not add user please try again'})))
        ))
    ))
}