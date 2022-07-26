import React from "react";
import styles from "./Styles.module.css";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";

import { loadStripe } from "@stripe/stripe-js";
import Prices from "./Prices";
import { getLabel } from "helpers/getLabelHelper";
import { useSelector } from "store/hooks";
import ProductTabs from "./ProductTabs";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function PaymentForm() {
  const { locale } = useSelector((state) => state.languages);
  const { labels } = useSelector((state) => state.labels);

  const [products, setProducts] = useState(null);
  const [productIndex, setProductIndex] = useState(0);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const res = await fetch("/api/stripeproducts");
    const data = await res.json();
    setProducts(data);
  }

  const handleSubmit = async (values) => {
    const recurring = products[productIndex].find(
      (price) => price.id === values.price
    ).recurring;

    const mode = recurring !== null ? "subscription" : "payment";

    const payment_method_types =
      mode === "payment"
        ? ["card", "giropay", "sepa_debit", "sofort"]
        : ["card", "sepa_debit", "sofort"];

    const { sessionId } = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
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
  let priceDisplay;
  if (products !== null) {
    products.map((product, index) => {
      if (productIndex === index) {
        priceDisplay = (
          <React.Fragment key={index}>
            <Formik
              initialValues={{
                price: "",
              }}
              onSubmit={handleSubmit}
            >
              {({ values }) => {
                return (
                  <Form>
                    <Prices
                      product={product}
                      selectedPrice={values.price}
                    />
                    {values.price.length > 1 && (
                      <div className={styles.btnWrapper}>
                        <button
                          type="submit"
                          className={styles.btn + " " + styles.btnActive}
                        >
                          {getLabel(
                            labels,
                            locale,
                            "donate",
                            "Click here to donate"
                          )}
                        </button>
                      </div>
                    )}
                  </Form>
                );
              }}
            </Formik>
          </React.Fragment>
        );
      }
    });
  }

  return (
    <div className={styles.formContainer}>
      <Box sx={{ width: "100%", height: "30%" }}>
        {products !== null ? (
          <ProductTabs
            productIndex={productIndex}
            setProductIndex={setProductIndex}
            setProducts={setProducts}
            products={products}
          />
        ) : (
          <div className="lds-rings-container">
            <div className="lds-roller">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </Box>
      <div className={styles.bottomRow}>
        <p>
          {!!products &&
            getLabel(
              labels,
              locale,
              `${products[productIndex][0].name
                ?.split(" ")
                .join("_")
                .toLowerCase()}_donation_tab_title`,
              "Choose amount"
            )}
        </p>
        {priceDisplay}
      </div>
    </div>
  );
}

export default PaymentForm;
