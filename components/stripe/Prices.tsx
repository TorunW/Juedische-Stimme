import React from 'react';
import styles from './Styles.module.css';
import { Field, Form, Formik, useFormik } from 'formik';
import axios from 'axios';

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function Prices({ product }) {
  let pricesDisplay = product.map((price) => {
    let priceFormattedDisplay;
    if (price.active === true) {
      if (
        price.custom_unit_amount !== null &&
        price.custom_unit_amount.preset !== null
      ) {
        priceFormattedDisplay = parseInt(price.custom_unit_amount.preset) / 100;
      } else if (price.unit_amount_decimal !== null) {
        priceFormattedDisplay = price.unit_amount_decimal.slice(0, -2);
      } else {
        priceFormattedDisplay = 'Other Amount';
      }
    }
    return (
      <label key={price.id} className={styles.box} title='500€'>
        <Field
          className={styles.radio}
          type='radio'
          title={priceFormattedDisplay}
          value={price.id}
          name='price'
        />
        {`${priceFormattedDisplay}`}€<a></a>
      </label>
    );
  });

  return <div>{pricesDisplay}</div>;
}

export default Prices;
