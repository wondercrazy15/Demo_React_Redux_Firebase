import { action } from 'typesafe-actions'
import { UsersActionTypes, User, UserSelectedPayload } from './types'
import firebase from '../../config/fbConfig';
import moment from 'moment';

// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions
export const fetchRequest = () => action(UsersActionTypes.FETCH_REQUEST)
export const clearSelected = () => action(UsersActionTypes.CLEAR_SELECTED)

// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.
export const fetchSuccess = (data: User[]) => action(UsersActionTypes.FETCH_SUCCESS, data)
export const fetchError = (message: string) => action(UsersActionTypes.FETCH_ERROR, message)
export const selectUser = (user_id: string) => action(UsersActionTypes.SELECT_USER, user_id)
export const userSelected = (user: UserSelectedPayload) => action(UsersActionTypes.SELECTED, user)
export const fetchData = (data: User[]) => action(UsersActionTypes.FETCH_DATA, data)

export const getUsers = (users: User[]) => (UsersActionTypes.FETCH_DATA, users)
/**
* THUNKS
*/
// fetchSuccess
users = [];
export const getAllUser = () => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection("userData").get()
      .then(function (querySnapshot) {
        var newDate;
        querySnapshot.forEach(function (doc) {
          const {
            account: {
              address1,
              address2,
              defaultRefundMethodId,
              displayName,
              dob,
              firstName,
              passportNo,
              residenceCity,
              residenceCountry,
              surname
            },
            email,
            phoneNumber,
            lastActive,
            meta: {
              creationTime
            },
          } = doc.data();
          if (lastActive) {
            newDate = moment(lastActive.seconds * 1000).format("YYYY-MM-DD");
            console.log(newDate);
          }
          users.push({
            key: doc.id,
            doc, // DocumentSnapshot
            // account: {
            address1,
            address2,
            defaultRefundMethodId,
            displayName,
            dob,
            firstName,
            passportNo,
            residenceCity,
            residenceCountry,
            surname
            // },
            email,
            phoneNumber,
            lastActive,
            newDate,
            // meta: {
            creationTime
            // },
          });
          console.log(doc.id, " => ", doc.data());
        });
        dispatch(action(UsersActionTypes.FETCH_SUCCESS, users));
      })
      .catch(function (err) {
        dispatch(action(UsersActionTypes.FETCH_ERROR, err));
      });




    // firestore.get({
    //   collection: 'userData'
    // }).then((result) => {
    //   console.log('user list :', result)
    //   // var data = getAll(result);
    //   // console.log('user list :', data)
    //   dispatch(action(UsersActionTypes.FETCH_SUCCESS, result));
    // }).catch((err) => {
    //   dispatch(action(UsersActionTypes.FETCH_ERROR, err));
    // });
  }
}


export const getAll = (result) => {
  // return (dispatch, getState, { getFirebase }) => {
  //   const firebase = getFirebase();
  debugger;

  const users = [];
  result.onSnapshot(querySnapshot => {
    var newDate;
    querySnapshot.forEach((doc) => {
      const {
        account: {
          address1,
          address2,
          defaultRefundMethodId,
          displayName,
          dob,
          firstName,
          passportNo,
          residenceCity,
          residenceCountry,
          surname
        },
        email,
        phoneNumber,
        lastActive,
        meta: {
          creationTime
        },
      } = doc.data();
      if (lastActive) {
        newDate = moment(lastActive.seconds * 1000).format("MM-DD-YYYY");
        console.log(newDate);
      }
      users.push({
        key: doc.id,
        doc, // DocumentSnapshot
        account: {
          address1,
          address2,
          defaultRefundMethodId,
          displayName,
          dob,
          firstName,
          passportNo,
          residenceCity,
          residenceCountry,
          surname
        },
        email,
        phoneNumber,
        lastActive,
        newDate,
        meta: {
          creationTime
        },
      });
    })
  })
  return users;
  // if (users != null && users.length > 0) {
  //   console.log(users);
  //   action(UsersActionTypes.FETCH_DATA, users)
  // }
  // firebase.firestore().collection("userData").onSnapshot((result) => {
  //     console.log('Projects list :', JSON.stringify(result))
  //     action(UsersActionTypes.FETCH_DATA, result)
  //     // dispatch({ type: 'GETALL_PROJECT_SUCCESS' });
  //   })
  // .catch((err) => {
  //   dispatch({ type: 'GETALL_PROJECT_ERROR', err });
  // });
  // }
}

export const getUserData = () => {
  debugger;
  // firebase.firestore().collection("userData").get().then(function (result) {
  //   console.log('Projects list :', JSON.stringify(result))
  //   action(UsersActionTypes.FETCH_DATA, result)
  // }).catch((err) => {
  //   console.log(err);
  // });
  firebase.firestore().collection("userData").onSnapshot(querySnapshot => {
    const users = [];
    var newDate;
    querySnapshot.forEach((doc) => {
      const {
        account: {
          address1,
          address2,
          defaultRefundMethodId,
          displayName,
          dob,
          firstName,
          passportNo,
          residenceCity,
          residenceCountry,
          surname
        },
        email,
        phoneNumber,
        lastActive,
        meta: {
          creationTime
        },
      } = doc.data();
      if (lastActive) {
        debugger;
        newDate = moment(lastActive.seconds * 1000).format("MM-DD-YYYY");
        console.log(newDate);
      }
      users.push({
        key: doc.id,
        doc, // DocumentSnapshot
        account: {
          address1,
          address2,
          defaultRefundMethodId,
          displayName,
          dob,
          firstName,
          passportNo,
          residenceCity,
          residenceCountry,
          surname
        },
        email,
        phoneNumber,
        lastActive,
        newDate,
        meta: {
          creationTime
        },
      });
    })
    // action(UsersActionTypes.FETCH_DATA, users)
  })
  if (users != null && users.length > 0) {
    console.log(users);
    action(UsersActionTypes.FETCH_DATA, users)
  }
  // .then(function (result) {
  //   console.log('Projects list :', JSON.stringify(result))
  //   action(UsersActionTypes.FETCH_DATA, users)
  // }).catch((err) => {
  //   console.log(err);
  // });
}

const users: [];
export function getUsersThunk() {
  debugger;
  var newDate = new Date();
  return dispatch => {
    // const tasks: [];
    firebase.firestore().collection("userData").get().then(function (snap) {
      // firebase.database().ref(`/`).once('value', snap => {
      snap.forEach(data => {
        const {
          account: {
            address1,
            address2,
            defaultRefundMethodId,
            displayName,
            dob,
            firstName,
            passportNo,
            residenceCity,
            residenceCountry,
            surname
          },
          email,
          phoneNumber,
          lastActive,
          meta: {
            creationTime
          },
        } = data.val();
        if (lastActive) {
          debugger;
          newDate = moment(lastActive.seconds * 1000).format("MM-DD-YYYY");
          console.log(newDate);
        }
        users.push({
          key: doc.id,
          //doc, // DocumentSnapshot
          account: {
            address1,
            address2,
            defaultRefundMethodId,
            displayName,
            dob,
            firstName,
            passportNo,
            residenceCity,
            residenceCountry,
            surname
          },
          email,
          phoneNumber,
          lastActive,
          newDate,
          meta: {
            creationTime
          },
        });
      })
    })
      // .then(() => dispatch(getUsers(users)))
      .then(() => dispatch(fetchData(users)))
  }
  