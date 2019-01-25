import { Store, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import fbConfig from './Config/fbConfig';
import { History } from 'history';
import { ApplicationState, rootReducer } from './store';
import { connectRouter } from 'connected-react-router';

export default function configureStore(
  history: History,
  initialState: ApplicationState
): Store<ApplicationState> {
  // create the composing function for our middlewares
  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    compose(
      applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
      reactReduxFirebase(fbConfig, null), // redux binding for firebase
      reduxFirestore(fbConfig) // redux bindings for firestore
    )
  );

  // Don't forget to return the store object.
  return store
}
