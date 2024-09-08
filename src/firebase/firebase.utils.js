import { initializeApp } from 'firebase/app';
import { getFirestore,doc,getDoc,setDoc } from 'firebase/firestore';
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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = doc(firestore,`users/${userAuth.uid}`)

    const snapShot = await getDoc(userRef)

    if(!snapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userRef, {
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log('error creating user', error.message);
        }
    }
    return userRef;

}

// Initialize Firebase
const app = initializeApp(config);

// Initialize Firestore and Auth
export const auth = getAuth(app);
export const firestore = getFirestore(app);

// Set up Google Auth Provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => signInWithPopup(auth, provider);

export default app;
