import React from "react";
import styles from "./Styles.module.css";
import { Field } from "formik";

import { getLabel } from "helpers/getLabelHelper";
import { useSelector } from "store/hooks";

function Prices({
  product,
  selectedPrice,
}: {
  product: any;
  selectedPrice?: any;
}) {
  const { locale } = useSelector((state) => state.languages);
  const { labels } = useSelector((state) => state.labels);

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
        priceFormattedDisplay = getLabel(
          labels,
          locale,
          "choose_amount",
          "__ "
        );
      }
    }
    return (
      <label
        key={price.id}
        className={
          styles.box +
          " " +
          (selectedPrice === price.id ? styles.boxSelected : "")
        }
        title={`${priceFormattedDisplay}${
          !!price.unit_amount_decimal ? "€" : ""
        }`}
      >
        <>
          <Field
            className={styles.radio}
            type="radio"
            title={priceFormattedDisplay}
            value={price.id}
            name="price"
          />
          {console.log(price.unit_amount_decimal)}
          {`${priceFormattedDisplay}${!!price.unit_amount_decimal ? "€" : ""}`}

          <a></a>
        </>
      </label>
    );
  });

  return <div className={styles.priceContainer}>{pricesDisplay}</div>;
}

export default Prices;
