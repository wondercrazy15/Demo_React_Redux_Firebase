import { combineReducers, Dispatch, Action, AnyAction } from 'redux';
import { LayoutState, layoutReducer } from './layout';
import { UsersState } from './users/types';
import { usersReducer } from './users/reducer';

// The top-level state object
export interface ApplicationState {
  layout: LayoutState 
  users: UsersState
}

// Additional props for connected React components. This prop is passed by default with `connect()`
export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>
}

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const rootReducer = combineReducers<ApplicationState>({
  layout: layoutReducer,  
  users: usersReducer
})
