
export interface User { 
  key: string
  account: {
    address1: string,
    address2: string,
    defaultRefundMethodId: string,
    displayName: string,
    dob: Date,
    firstName: string,
    passportNo: string,
    residenceCity: string,
    residenceCountry: string,
    surname: string
  },
  email: string,
  phoneNumber: string,
  lastActive: Date,
  newDate: string,
  meta: {
    creationTime: Date
  },
}

export interface Player {
  account_id: number
  name: string
  games_played: number
  wins: number
  is_current_user_member: boolean
}

export interface UserSelectedPayload {
  detail: User
  players: Player[]
}

export const enum UsersActionTypes {
  FETCH_REQUEST = '@@users/FETCH_REQUEST',
  FETCH_SUCCESS = '@@users/FETCH_SUCCESS',
  FETCH_DATA = '@@users/FETCH_DATA',
  FETCH_ERROR = '@@users/FETCH_ERROR',
  SELECT_USER = '@@users/SELECT_USER',
  SELECTED = '@@users/SELECTED',
  CLEAR_SELECTED = '@@users/CLEAR_SELECTED'
}

export interface UsersState {
  readonly loading: boolean
  readonly data: User[]
  readonly selected?: UserSelectedPayload
  readonly errors?: string
}
