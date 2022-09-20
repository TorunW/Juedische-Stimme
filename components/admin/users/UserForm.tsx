import { useFormik } from 'formik';
import React, { FC } from 'react'
import * as Yup from 'yup';
import styles from 'components/admin/Forms.module.css';
import { User } from 'types/User.type';
import axios from 'axios';

import { app } from 'firebaseConfig';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';

interface UserFormProps {
  user?: User;
}

const UserForm: FC<UserFormProps> = ({user}) => {

  const auth = getAuth(app);
  const router = useRouter();

  // console.table(user)

  const formik = useFormik({
    initialValues: {
        display_name: user ? user.display_name : '',
        user_email: user ? user.user_email : '',
        user_registered: user ? user.user_registered : Date.now(),
        user_status: user ? user.user_status : 0,
        user_pass: user ? user.user_pass : "",
    },
    validationSchema:  Yup.object().shape({
        user_email:Yup.string().email().required('Email is required!'),
        user_pass:Yup.string().min(7).required('Password is required'),
        user_status:Yup.string().min(1).max(1).required()
    }),
    onSubmit: values => {
      if (!user){
        createUserWithEmailAndPassword(auth, values.user_email, values.user_pass).then(
          (response: any) => {
            console.log(response.user);
            if (response.user){
              updateUser(values)
            }
          }
        );
      } else updateUser(values)
    },
  });

  function updateUser(values:User){
    axios({
        method: user ? 'put' : 'post',
        url: `/api/users${user ? "/" + user.ID : ''}`,
        data: { 
            ...values
        }
    }).then((response) => {
        // console.log(response.data,"response on users (put or post)");
        if (response.data) router.push('/admin/users/')
    }, (error) => {
        console.log(error, "ERROR on post / put user");
    });
  }

  return (

    <div className={styles.container}>
        <form onSubmit={formik.handleSubmit} className={styles.form}>

            <div className={styles['form-row']}>
                <label htmlFor="display_name">NAME</label>
                <div className={styles.inputContainer}>
                <input
                    id="display_name"
                    name="display_name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.display_name}
                />
                {formik.errors.display_name ? <div className={styles.error}>{formik.errors.display_name.toString()}</div> : ""}
                </div>
            </div>

            <div className={styles['form-row']}>
                <label htmlFor="user_email">EMAIL</label>
                <div className={styles.inputContainer}>
                <input
                    id="user_email"
                    name="user_email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.user_email}
                />
                {formik.errors.user_email ? <div className={styles.error}>{formik.errors.user_email.toString()}</div> : ""}
                </div>
            </div>

            {/* { */}
              {/* // user ? "" :  */}
              <div className={styles['form-row']}>
                  <label htmlFor="user_pass">PASSWORD</label>
                  <div className={styles.inputContainer}>
                  <input
                      id="user_pass"
                      name="user_pass"
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.user_pass}
                  />
                  {formik.errors.user_pass ? <div className={styles.error}>{formik.errors.user_pass.toString()}</div> : ""}
                  </div>
              </div>
            {/* // } */}

            <div className={styles['form-row']}>
                <label htmlFor="user_status">USER STATUS</label>
                <div className={styles.inputContainer}>
                  
                <input
                    id="user_status"
                    name="user_status"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.user_status}
                />
                {formik.errors.user_status ? <div className={styles.error}>{formik.errors.user_status.toString()}</div> : ""}

                </div>

            </div>

            <div className={styles['form-row']}>
                <button type="submit">{user ? "update user" : "register user"}</button>
            </div>
        </form>
    </div>

  )
}

export default UserForm