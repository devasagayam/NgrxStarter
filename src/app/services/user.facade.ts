import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.state";
import * as UserSelectors from '../store/user.selectors';
import * as UserActions from '../store/user.actions'
import { User } from "../models/user.model";
@Injectable({
    providedIn:'root'
})
export class UserFacade {
    store:Store = inject(Store<AppState>)
    users$ = this.store.select(UserSelectors.selectAllUser);
    loading$ = this.store.select(UserSelectors.selectUserLoading);
    error$ = this.store.select(UserSelectors.selectUserError);
    editingUserId$ = this.store.select(UserSelectors.selectEditingUserId);
    addingUser$ = this.store.select(UserSelectors.selectAddingUser);
    
    loadUsers(){
     this.store.dispatch(UserActions.loadUsers());
    }

    setEditingUser(userId:number | null){
     this.store.dispatch(UserActions.setEditingUser({ userId}));
    }

    updateUser(updatedUser:User){
        this.store.dispatch(UserActions.updateUser({ user: updatedUser }));
    }

    setAddingUser(adding:boolean){
        this.store.dispatch(UserActions.setAddingUser({ adding: adding }));
    }

    addUser(newUser:Omit<User,'id'>){
        this.store.dispatch(UserActions.addUser({ user: newUser }));
    }
}