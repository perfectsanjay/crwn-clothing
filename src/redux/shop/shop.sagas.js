import { takeLatest, call, put, all } from 'redux-saga/effects';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { collection, getDocs } from 'firebase/firestore'; // Import getDocs and collection from Firebase

import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';
import ShopActionTypes from './shop.types';

export function* fetchCollectionAsync() {
  try {
    const collectionRef = collection(firestore, 'collections'); // Get collection reference
    const snapshot = yield call(getDocs, collectionRef); // Fetch the documents from the collection
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot); // Convert snapshot to map
    yield put(fetchCollectionsSuccess(collectionsMap)); // Dispatch success action with the map
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message)); // Dispatch failure action if there is an error
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionAsync); // Listen for the FETCH_COLLECTIONS_START action
}

export function* shopSagas() {
    yield all([call(fetchCollectionsStart)])
}