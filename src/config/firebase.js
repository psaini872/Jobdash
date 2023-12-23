import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBCrmOV4717qxCklqX4SajN8GXxG_U4vIY',
  authDomain: 'jobify-385905.firebaseapp.com',
  projectId: 'jobify-385905',
  storageBucket: 'jobify-385905.appspot.com',
  messagingSenderId: '145855559150',
  appId: '1:145855559150:web:3aa0a1c9ee2dd422e84aff',
  measurementId: 'G-HEVTRPFETS',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
