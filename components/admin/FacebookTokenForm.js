import { useFormik } from 'formik';
import dateTimeHelper from 'helpers/dateTimeHelper';
import React from 'react'
import styles from 'components/forms/Styles.module.css';
import axios from 'axios';

const FacebookTokenForm = ({fbToken}) => {

    const formik = useFormik({
        initialValues: {
            token: fbToken ? fbToken.token : '',
            date_updated: fbToken ? fbToken.date_updated : ''
        },
        onSubmit: values => {
            axios({
                method: fbToken ? 'put' : 'post',
                url: `/api/fbtoken${fbToken ? "/" + fbToken.ID : ''}`,
                data: { 
                    ...values,
                    date_updated:dateTimeHelper(new Date()),
                }
            }).then((response) => {
                console.log(response,"response on fbToken (put or post)");
                if (response.data){
                    window.location.reload()
                }
            }, (error) => {
                console.log(error, "ERROR on post / put fbToken");
            });
        },
    });

  return (
    <div className={styles.container}>
        <form onSubmit={formik.handleSubmit}>
            <div className={styles['form-row']}>
                <label htmlFor="token">FB TOKEN</label>
                <input
                    id="token"
                    name="token"
                    type="token"
                    onChange={formik.handleChange}
                    value={formik.values.token}
                />
            </div>
            <div className={styles['form-row']}>
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
  )
}

export default FacebookTokenForm