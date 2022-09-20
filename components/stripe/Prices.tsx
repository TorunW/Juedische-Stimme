import React from 'react';
import styles from './Styles.module.css';
import { Field, Form, Formik, useFormik } from 'formik';
import axios from 'axios';

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function Prices({ product }) {
  return (
    <div>
      {product.map((price) => (
        <label className={styles.box} title='500€'>
          <Field
            className={styles.radio}
            type='radio'
            title={price.unit_amount_decimal}
            value={price.id}
            name='price'
          />
          {price.unit_amount_decimal !== null
            ? price.unit_amount_decimal.slice(0, -2)
            : ''}{' '}
          €<a></a>
        </label>
      ))}
    </div>
  );
}

export default Prices;
