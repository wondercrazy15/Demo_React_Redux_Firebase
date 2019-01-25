import { usersReducer } from '../store/users/reducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'

const rootReducers = combineReducers({
  users: usersReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducers;
