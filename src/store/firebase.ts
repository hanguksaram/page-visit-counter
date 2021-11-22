import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAEbnW0ht2PDgwBkvfeHJ1DSdQQ6rMiJ24",
    authDomain: "fls-family-visit-counter.firebaseapp.com",
    projectId: "fls-family-visit-counter",
    storageBucket: "fls-family-visit-counter.appspot.com",
    messagingSenderId: "93342013301",
    appId: "1:93342013301:web:c36e08160471987a29253c"
  };

//init firebase
const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore();
export { db }
