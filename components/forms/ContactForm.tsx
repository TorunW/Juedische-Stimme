import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useFormik } from "formik";
import { getLabel } from "helpers/getLabelHelper";
import { useState } from "react";
import { useSelector } from "store/hooks";
import * as Yup from "yup";
import { ButtonWithLoading } from "../atoms/ButtonWithLoading";
import { Container } from "../atoms/Container";
import styles from "./Styles.module.css";

const ContactForm = () => {
  const { locale } = useSelector((state) => state.languages);
  const { labels } = useSelector((state) => state.labels);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().min(3, "* too short!").required("* required!"),
      email: Yup.string().email().required("* required!"),
      message: Yup.string().required("* required!"),
    }),
    onSubmit: (values) => {
      setIsSubmitting(true);
      axios({
        method: "post",
        url: `/api/contact`,
        data: {
          ...values,
        },
      }).then(
        (response) => {
          setIsSubmitted(true);
          setIsSubmitting(false);
          console.log(response, "response on send newsletter");
        },
        (error) => {
          setIsSubmitting(false);
          console.log(error, "ERROR on send newsletter");
        }
      );
    },
  });

  return (
    <div id="contact">
      <Container>
        <form
          onSubmit={formik.handleSubmit}
          className={styles.contactForm}
        >
          <Grid
            container
            spacing={4}
            display="flex"
            justifyContent={"center"}
          >
            <Grid
              item
              xs={10}
            >
              <h2>{getLabel(labels, locale, "contact_us", "Kontakt")}</h2>
            </Grid>

            <Grid
              item
              md={5}
              xs={10}
            >
              <TextField
                id="name"
                type="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                placeholder={getLabel(labels, locale, "fullname", "Name")}
                data-testid="name-input"
                fullWidth
                color="secondary"
                sx={{
                  background: "white",
                  [`& fieldset`]: {
                    borderRadius: 0,
                  },
                }}
              />
              {formik.errors && formik.errors.name ? (
                <div
                  data-testid="name-error"
                  className={styles.error}
                >
                  {formik.errors.name}
                </div>
              ) : (
                ""
              )}
            </Grid>
            <Grid
              item
              md={5}
              xs={10}
            >
              <TextField
                id="email"
                type="email"
                data-testid="email-input"
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder={getLabel(labels, locale, "email", "E-mail")}
                fullWidth
                color="secondary"
                sx={{
                  background: "white",
                  [`& fieldset`]: {
                    borderRadius: 0,
                  },
                }}
              />
              {formik.errors && formik.errors.email ? (
                <div
                  data-testid="email-error"
                  className={styles.error}
                >
                  {formik.errors.email}
                </div>
              ) : (
                ""
              )}
            </Grid>
            <Grid
              item
              md={10}
              xs={10}
            >
              <TextField
                id="message"
                name="message"
                onChange={formik.handleChange}
                value={formik.values.message}
                data-testid="message-input"
                multiline
                rows={3}
                fullWidth
                placeholder={getLabel(
                  labels,
                  locale,
                  "your_message",
                  "Ihre Nachricht"
                )}
                color="secondary"
                sx={{
                  background: "white",
                  [`& fieldset`]: {
                    borderRadius: 0,
                  },
                }}
              />
              {formik.errors.message && formik.touched.message ? (
                <div
                  data-testid="message-error"
                  className={styles.error}
                >
                  {formik.errors.message}
                </div>
              ) : (
                ""
              )}
            </Grid>

            <Grid
              item
              xs={10}
            >
              <ButtonWithLoading
                disabled={
                  !formik.isValid ||
                  !formik.dirty ||
                  isSubmitting ||
                  isSubmitted
                }
                sx={{
                  border: 5,
                  borderRadius: 0,
                  borderColor: "#8179a6",
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  height: "55px",
                  color: "common.white",
                  "&:hover": {
                    background: "#8179a6",
                    color: "white",
                    transition: "all .5s ease-in-out",
                  },
                }}
                loading={isSubmitting && !isSubmitted}
                isFinished={isSubmitted}
                text={getLabel(labels, locale, "send", "Senden")}
                textAfterLoading={getLabel(labels, locale, "sent", "Gesendet")}
              />
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default ContactForm;
