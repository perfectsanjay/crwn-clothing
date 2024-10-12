import { initializeApp } from 'firebase/app';
import { getFirestore,  doc, getDoc, setDoc,collection,writeBatch } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const config = {
  apiKey: "AIzaSyCHyU1uPX-QkMivONTghe76AxRZjxuN2YE",
  authDomain: "crwn-db-80e13.firebaseapp.com",
  projectId: "crwn-db-80e13",
  storageBucket: "crwn-db-80e13.appspot.com",
  messagingSenderId: "335120485704",
  appId: "1:335120485704:web:8c9af69e59169d7fd6f77d",
  measurementId: "G-Q8MSZRG3PN"
};

// Initialize Firebase
const app = initializeApp(config);

// Initialize Firestore and Auth
export const auth = getAuth(app);
export const firestore = getFirestore(app);

// Create a user profile in Firestore
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(firestore, `users/${userAuth.uid}`);
  const snapShot = await getDoc(userRef);

  if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('Error creating user:', error.message);
    }
  }
  return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(firestore, collectionKey); // Collection reference
    const batch = writeBatch(firestore);
  
    objectsToAdd.forEach(obj => {
      const newDocRef = doc(collectionRef); // Automatically generate a new document ID
      batch.set(newDocRef, obj);
    });
  
   
     return await batch.commit();
     
  };

  export const convertCollectionsSnapshotToMap =(collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items} = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    })
   return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
   }, {});

  }
  
  
// Set up Google Auth Provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => signInWithPopup(auth, provider);

export default app;
