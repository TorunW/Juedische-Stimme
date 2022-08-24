import { app } from 'firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from './Styles.module.css';
import { setCookie, getCookies } from 'cookies-next';

function LoginForm() {
  const auth = getAuth(app);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    let token = sessionStorage.getItem('Token');
    if (token) {
      router.push('/admin');
    }
  }, []);

  const signUp = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((response: any) => {
        // console.log(response.user);
        sessionStorage.setItem('Token', response.user.accessToken);
        setCookie('Token', response.user.accessToken);
        // console.log(getCookies())
        router.push('/');
      })
      .catch((err) => {
        console.log(err);
        alert('Cannot Log in');
      });
  };

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

        <button
          className={styles.loginButton + ' ' + styles.button}
          onClick={signUp}
        >
          Login
        </button>

        <button
          className={
            styles.forgotButton + ' ' + styles.button
          } /*onClick={signUp}*/
        >
          Forgot password?
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
