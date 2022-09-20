import React from 'react';
import styles from './Styles.module.css';
import { Field, Form, Formik, useFormik } from 'formik';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { loadStripe } from '@stripe/stripe-js';
import Prices from './Prices';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function PaymentForm({products}) {
  
  const [productIndex, setProductIndex] = useState(null);
  console.log(productIndex);

  const handleSubmit = async (values) => {
    console.log(values);
    const { sessionId } = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        price: values.price,
        quantity: 1,
      }),
    }).then((res) => res.json());
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });
  };

  let productsDisplay = products.map((product, index) => {
    return (
      <div key={index}>
        <button onClick={() => setProductIndex(index)}>
          {product[0].name}
        </button>
      </div>
    );

    let price;
    if (productIndex === index) {
      <Formik
        initialValues={{
          price: '',
        }}
        onSubmit={handleSubmit}
      >
        {({ values }) => {
          return (
            <Form>
              <div className={styles.formContainer}>
                <Prices product={product} />
              </div>
              <button type='submit'>
                {values.price.length > 1 ? `Click here to donate` : ''}
              </button>
            </Form>
          );
        }}
      </Formik>;
    }
  });

  return <div>{productsDisplay}</div>;
}

export default PaymentForm;

{
  /*  */
}
