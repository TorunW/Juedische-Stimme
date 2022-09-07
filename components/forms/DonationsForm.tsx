import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import styles from './Styles.module.css';
import * as Yup from 'yup';

const DonationsForm = () => {
  return (
    <div id='donation' className={styles.donationsForm}>
      <div className={styles.formContainer}>
        <label className={styles.box} title='500€'>
          <input type='radio' title='500€' value='500.00' />
          500€
          <a></a>
        </label>
        <label className={styles.box} title='250€'>
          <input type='radio' title='250€' value='250.00' />
          250€
          <a></a>
        </label>
        <label className={styles.box} title='100€'>
          <input type='radio' title='100€' value='100.00' />
          100€
          <a></a>
        </label>
        <label className={styles.box} title='50€'>
          <input type='radio' title='50€' value='50.00' />
          50€
          <a></a>
        </label>
        <label className={styles.box} title='18€'>
          <input type='radio' title='18€' value='18.00' />
          18€
          <a></a>
        </label>
        <label className={styles.box} title='10€'>
          <input type='radio' title='10€' value='10.00' />
          10€
          <a></a>
        </label>
        <label className={styles.box} title='other-amount'>
          <input type='radio' value='other' placeholder='0.00€' />
          <span>€</span>
        </label>
      </div>
    </div>
  );
};

export default DonationsForm;

// fax and telephone??? is it really necessary???
// Do we need to check if person is over 18?
