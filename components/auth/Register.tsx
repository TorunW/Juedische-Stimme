import { app } from 'firebaseConfig';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from 'styles/LoginForm.module.css';

function SignupForm() {
  const auth = getAuth(app);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useEffect(() => {
  //   let token = sessionStorage.getItem('Token');
  //   if (token) {
  //     router.push('/admin/register');
  //   }
  // }, []);

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password).then(
      (response: any) => {
        console.log(response.user);
        sessionStorage.setItem('Token', response.user.accessToken);
        router.reload();
      }
    );
  };

  return (
    <div className={styles.form}>
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
          Register new user
        </button>
      </div>
    </div>
  );
}

export default SignupForm;
