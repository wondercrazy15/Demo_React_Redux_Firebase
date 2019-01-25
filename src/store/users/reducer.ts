import { Reducer } from 'redux'
import { UsersState, UsersActionTypes } from './types'

// Type-safe initialState!
const initialState: UsersState = {
  data: [],
  errors: undefined,
  selected: undefined,
  loading: false
}

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<UsersState> = (state = initialState, action) => {
  switch (action.type) {
    case UsersActionTypes.FETCH_REQUEST:
    case UsersActionTypes.SELECT_USER: {
      return { ...state, loading: true }
    }
    case UsersActionTypes.FETCH_SUCCESS: {
      debugger;
      return { ...state, loading: false, data: action.payload }
    }
    case UsersActionTypes.FETCH_ERROR: {
      debugger;
      return { ...state, loading: false, errors: action.payload }
    }
    case UsersActionTypes.SELECTED: {
      return { ...state, loading: false, selected: action.payload }
    }
    case UsersActionTypes.CLEAR_SELECTED: {
      return { ...state, selected: undefined }
    }
    default: {
      return state
    }
  }
}

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as usersReducer }
