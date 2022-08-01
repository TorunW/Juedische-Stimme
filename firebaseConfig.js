import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAHBdrU5VYnGzu1FSb4H6VSwfrX2k5snSw',
  authDomain: 'juedische-stimme.firebaseapp.com',
  projectId: 'juedische-stimme',
  storageBucket: 'juedische-stimme.appspot.com',
  messagingSenderId: '43469644242',
  appId: '1:43469644242:web:8905958c336358a278e80b',
};

export const app = initializeApp(firebaseConfig);
