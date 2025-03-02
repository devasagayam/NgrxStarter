import { createFeatureSelector, createSelector } from "@ngrx/store";
import { userAdapter, UserState } from "./user.reducers";


 const selectUserState = createFeatureSelector<UserState>('user');
 

 export const selectAllUser = createSelector(selectUserState, userAdapter.getSelectors().selectAll)

 export const selectUserLoading = createSelector(
    selectUserState,state => state.loading
 )

 export const selectUserError = createSelector(
    selectUserState,state => state.error
 )

 export const selectEditingUserId = createSelector(
    selectUserState,state => state.editingUserId
 )

 export const selectAddingUser = createSelector(
    selectUserState,state => state.addingUser
 )
