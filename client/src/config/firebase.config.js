import { initializeApp, getApp, getApps } from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey:"AIzaSyAYmGsCR3irHpOjKbKzgpLw0DNfXpuFgWc",
    authDomain:"appstore-448bc.firebaseapp.com",
    projectId:"appstore-448bc",
    storageBucket:"appstore-448bc.appspot.com",
    messagingSenderId:"2804488951",
    appId:"1:2804488951:web:8607ecd0fb8dc3ff5451f2"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };