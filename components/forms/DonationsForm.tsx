import React, { useEffect, useState } from 'react';
import styles from './Styles.module.css';
import OneTimePaymentForm from '../stripe/Prices';
import Products from 'components/stripe/Products';

const DonationsForm = ({stripeProducts}) => {
  const [aboPaymentForm, setAboPaymentForm] = useState(false);
  const [oneTimePaymentForm, setOneTimePaymentForm] = useState(true);
  console.log(oneTimePaymentForm, 'onetime');
  console.log(aboPaymentForm, 'more times');

  function showAboPaymentForm() {
    setAboPaymentForm(true);
    setOneTimePaymentForm(false);
  }

  function showOneTimePaymentForm() {
    setOneTimePaymentForm(true);
    setAboPaymentForm(false);
  }

  return (
    <div id='donation' className={styles.donationsForm}>
      <Products
        products={stripeProducts}
      />
    </div>
  );
};

export default DonationsForm;
