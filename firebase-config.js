import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAiBfscKPD4gnyePXxv1PebpU5DGv-fohg",
  authDomain: "primo-vivere-tests.firebaseapp.com",
  projectId: "primo-vivere-tests",
  storageBucket: "primo-vivere-tests.appspot.com",
  messagingSenderId: "379327751012",
  appId: "1:379327751012:web:f6822609976ea63af35071"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };