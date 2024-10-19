import ShopActionTypes from "./shop.types";
import { getDocs, collection } from 'firebase/firestore'; // Correct Firebase imports
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils"; // Firestore and utility

// Action creators
export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

// Thunk action for fetching collections
export const fetchCollectionsStartAsync = () => {
  return async (dispatch) => {
    const collectionRef = collection(firestore, 'collections'); // Correct collection ref initialization
    dispatch(fetchCollectionsStart());

    try {
      const snapshot = await getDocs(collectionRef); // Use getDocs to fetch data
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot); // Convert snapshot to map
      dispatch(fetchCollectionsSuccess(collectionsMap)); // Dispatch success
    } catch (error) {
      dispatch(fetchCollectionsFailure(error.message)); // Dispatch failure on error
    }
  };
};
