import React from "react";
import { useCallback, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import styles from "./Styles.module.css";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { TextField, Button, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid";
import theme from "config/theme";
import { getLabel } from "helpers/getLabelHelper";
import { useSelector } from "store/hooks";

const NewsletterForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [notification, setNotification] = useState("");
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const { locale } = useSelector((state) => state.languages);
  const { labels } = useSelector((state) => state.labels);

  const handleSumitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (!executeRecaptcha) {
        console.log("Execute recaptcha not yet available");
        return;
      }
      executeRecaptcha("enquiryFormSubmit").then((gReCaptchaToken) => {
        console.log(gReCaptchaToken, "response Google reCaptcha server");
        submitEnquiryForm(gReCaptchaToken);
      });
    },
    [executeRecaptcha]
  );

  const submitEnquiryForm = (gReCaptchaToken) => {
    fetch("/api/enquiry", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gRecaptchaToken: gReCaptchaToken,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res, "response from backend");
        if (res?.status === "success") {
          setNotification(res?.message);
        } else {
          setNotification(res?.message);
        }
      });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().min(3, "* too short!"),
      email: Yup.string().email().required("* required!"),
    }),
    onSubmit: (values) => {
      axios({
        method: "post",
        url: `/api/newsletter`,
        data: {
          ...values,
        },
      }).then(
        (response) => {
          console.log(response, "response on send contact");
        },
        (error) => {
          console.log(error, "ERROR on send contact");
        }
      );
    },
  });

  return (
    <div
      id="newsletter"
      className={styles.newsletterForm + " " + styles.formContainer}
    >
      <h2>
        {getLabel(
          labels,
          locale,
          "newsletter_abonnieren",
          "Newsletter abonnieren"
        )}
      </h2>

      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          spacing={isSmall ? 4 : 2}
        >
          <Grid
            item
            sm={4}
            xs={12}
          >
            <TextField
              id="name"
              fullWidth
              type="name"
              label="Name"
              onChange={formik.handleChange}
              value={formik.values.name}
              placeholder="Name"
              color="secondary"
              sx={{
                [`& fieldset`]: {
                  borderRadius: 0,
                },
              }}
            />
          </Grid>
          <Grid
            item
            sm={4}
            xs={12}
          >
            <TextField
              id="email"
              name="email"
              type="email"
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="Email *"
              label="Email *"
              color="secondary"
              sx={{
                [`& fieldset`]: {
                  borderRadius: 0,
                },
              }}
            />
            {formik.errors && formik.errors.email ? (
              <div className={styles.error}>{formik.errors.email}</div>
            ) : (
              ""
            )}{" "}
          </Grid>
          <Grid
            item
            sm={4}
            xs={12}
          >
            <Button
              type="submit"
              fullWidth
              onClick={handleSumitForm}
              sx={{
                border: 5,
                borderRadius: 0,
                borderColor: "#8179a6",
                fontSize: "1.6rem",
                fontWeight: 700,
                height: "55px",

                "&:hover": {
                  background: "#8179a6",
                  color: "white",
                  transition: "all .5s ease-in-out",
                },
              }}
            >
              Senden
            </Button>
            {notification && <p>{notification}</p>}
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default NewsletterForm;
