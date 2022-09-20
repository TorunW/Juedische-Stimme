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
  const [productIndex, setProductIndex] = useState(null);
  console.log(productIndex, 'index');

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
            return (
              <Form>
                <div>
                  <Prices product={product} />
                </div>
                <button type='submit'>
                  {values.price.length > 1 ? `Click here to donate` : ''}
                </button>
              </Form>
            );
          }}
        </Formik>
      );
    }
    return (
      <div key={index} className={styles.formContainer}>
        {priceDisplay}
        <button onClick={() => setProductIndex(index)} className={styles.btn}>
          {product[0].name}
        </button>
      </div>
    );
  });

  return <div>{productsDisplay}</div>;
}

export default PaymentForm;
