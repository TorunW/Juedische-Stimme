import { app } from '../firebaseConfig';
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { LayoutPage } from 'types/LayoutPage.type';
import { LayoutPageProps } from 'types/LayoutPageProps.type';

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import styles from '/styles/LoginForm.module.css';

const Login: LayoutPage = (props: LayoutPageProps) => {
  const auth = getAuth(app);
  // const googleProvider = new GoogleAuthProvider();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    let token = sessionStorage.getItem('Token');
    if (token) {
      router.push('/');
    }
  }, []);

  const signUp = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((response: any) => {
        console.log(response.user);
        sessionStorage.setItem('Token', response.user.accessToken);
        router.push('/');
      })
      .catch((err) => {
        console.log(err);
        alert('Cannot Log in');
      });
  };

  // const signUpWithGoogle = () => {
  //   signInWithPopup(auth, googleProvider).then((response: any) => {
  //     sessionStorage.setItem('Token', response.user.accessToken);
  //     console.log(response.user);
  //     router.push('/admin');
  //   });
  // };

  return (
    <div className={styles.loginPage}>
      <div className={styles.container}>
        <input
          placeholder='Email'
          className={styles.inputBox}
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          type='email'
        />
        <input
          placeholder='Password'
          className={styles.inputBox}
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          type='password'
        />

        <button className={styles.button} onClick={signUp}>
          Login
        </button>

        <button className={styles.forgotButton} onClick={signUp}>
          Forgot password?
        </button>
        {/* <hr />
        <button className={styles.googleAlt} onClick={signUpWithGoogle}>
          Sign Up with Google
        </button> */}
      </div>
    </div>
  );
};

Login.layout = 'auth';

export default Login;
