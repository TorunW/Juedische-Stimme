import React from 'react';
import styles from './Styles.module.css';
import { Field } from 'formik';

function Prices({ product, selectedPrice }: { product:any,selectedPrice?:any}) {
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
        priceFormattedDisplay = '_ _';
      }
    }
    return (
      <label key={price.id} className={styles.box + ' ' + (selectedPrice === price.id ? styles.boxSelected : "")} title='500€'>
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

  return <div className={styles.priceContainer}>{pricesDisplay}</div>;
}

export default Prices;
