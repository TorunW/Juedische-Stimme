import React from 'react';
import styles from './Styles.module.css';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';

import { loadStripe } from '@stripe/stripe-js';
import Prices from './Prices';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function PaymentForm({ products }) {
  const [productIndex, setProductIndex] = useState(1);

  const handleSubmit = async (values) => {
    const recurring = products[productIndex].find(
      (price) => price.id === values.price
    ).recurring;

    const mode = recurring !== null ? 'subscription' : 'payment';

    const payment_method_types =
      mode === 'payment' ? ['card', 'klarna'] : ['card'];

    const { sessionId } = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        price: values.price,
        quantity: 1,
        mode,
        payment_method_types,
      }),
    }).then((res) => res.json());
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });
  };

  let productsDisplay = products.map((product, index) => {
    let priceDisplay;
    if (productIndex === index) {
      priceDisplay = (
        <Formik
          initialValues={{
            price: '',
          }}
          onSubmit={handleSubmit}
        >
          {({ values }) => {

            console.log(values, " VALUSE ")

            return (
              <Form>
                <div>
                  <Prices 
                    product={product}
                    selectedPrice={values.price}
                  />
                  <button
                    type='submit'
                    className={
                      values.price.length > 1
                        ? styles.btn
                        : styles.btn + ' ' + styles.btnInActive
                    }
                  >
                    Click here to donate
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      );
    }
    return (
      <div key={index}>
        <div className={styles.topRow}>
          <button
            onClick={() => setProductIndex(index)}
            className={
              productIndex === index
                ? styles.btn + ' ' + styles.active
                : styles.btn
            }
          >
            {product[0].name}
          </button>
        </div>

        <div className={styles.bottomRow}>{priceDisplay}</div>
      </div>
    );
  });

  return <div className={styles.formContainer}>{productsDisplay}</div>;
}

export default PaymentForm;
