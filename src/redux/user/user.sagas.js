import { takeLatest, put, all, call } from 'redux-saga/effects';
import UserActionTypes from './user.types';
import { SignInSuccess, SignInFailure, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure } from './user.actions';
import { auth, googleProvider, createUserProfileDocument, getDoc, getCurrentUser } from '../../firebase/firebase.utils';
import { createUserWithEmailAndPassword ,signInWithPopup,signInWithEmailAndPassword} from 'firebase/auth'; 

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
    const userSnapshot = yield call(getDoc, userRef);
    if (userSnapshot.exists()) {
      yield put(SignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    }
  } catch (error) {
    yield put(SignInFailure(error.message));
  }
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* signInWithGoogle() {
    try {
      // Use signInWithPopup directly with auth and provider
      const { user } = yield call(signInWithPopup, auth, googleProvider);
      yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
      yield put(SignInFailure(error.message));
    }
  }

  export function* signInWithEmail({ payload: { email, password } }) {
    try {
      // Use signInWithEmailAndPassword directly with auth, email, and password
      const { user } = yield call(signInWithEmailAndPassword, auth, email, password);
      yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
      yield put(SignInFailure(error.message));
    }
  }

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(SignInFailure(error));
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield createUserWithEmailAndPassword(auth, email, password);
    yield put(signUpSuccess({ user, additionalData: { displayName } })); // Fixed displayName here
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapshotFromUserAuth(user, additionalData);
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ]);
}
