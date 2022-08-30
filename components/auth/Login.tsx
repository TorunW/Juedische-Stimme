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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let token = sessionStorage.getItem('Token');
    if (token) {
      router.push('/admin');
    }
  }, []);

  const signUp = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((response: any) => {
        setLoading(true);
        sessionStorage.setItem('Token', response.user.accessToken);
        setCookie('Token', response.user.accessToken);
        router.push('/');
      })
      .catch((err) => {
        console.log(err);
        alert('Cannot Log in');
      });
  };

  if (loading === true) {
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  }

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

        {loading === true ? (
          <div className={styles.loadingButton}>
            <div className={styles.ldsRing}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          <button
            className={styles.loginButton + ' ' + styles.button}
            onClick={signUp}
          >
            Login
          </button>
        )}

        <button className={styles.forgotButton + ' ' + styles.button}>
          Forgot password?
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
