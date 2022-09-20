import React, { useEffect, useState } from 'react';
import styles from './Styles.module.css';
import Products from 'components/stripe/Products';

const DonationsForm = ({ stripeProducts }) => {
  return (
    <div id='donation' className={styles.donationsForm}>
      <Products products={stripeProducts} />
    </div>
  );
};

export default DonationsForm;
