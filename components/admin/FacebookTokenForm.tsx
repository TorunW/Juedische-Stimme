import { useFormik } from "formik";
import dateTimeHelper from "helpers/dateTimeHelper";
import React, { useState } from "react";
import styles from "components/admin/Forms.module.css";
import axios from "axios";
import { FormControl, TextField, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const FacebookTokenForm = ({ fbToken }) => {
  const [alertDate, setAlertDate] = useState();
  const [isTimeForAlert, setIsTimeForAlert] = useState(false);
  // date in miliseconds + 2 months in miliseconds -> date of alert, icon indicate update needed,
  // date of submit +  new date + 2 months in miliseonds -> date of next alert,

  const formik = useFormik({
    initialValues: {
      token: fbToken ? fbToken.token : "",
      date_updated: fbToken ? fbToken.date_updated : "",
    },
    onSubmit: (values) => {
      axios({
        method: fbToken ? "put" : "post",
        url: `/api/fbtoken${fbToken ? "/" + fbToken.ID : ""}`,
        data: {
          ...values,
          date_updated: dateTimeHelper(new Date()),
        },
      }).then(
        (response) => {
          if (response.data) {
            window.location.reload();
          }
        },
        (error) => {
          console.log(error, "ERROR on post / put fbToken");
        }
      );
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          spacing={2}
          sx={{
            width: "300px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid
            item
            xs={10}
          >
            <FormControl
              margin="normal"
              fullWidth
            >
              <TextField
                id="token"
                name="token"
                type="token"
                label="Facebook Token"
                onChange={formik.handleChange}
                value={formik.values.token}
              />
            </FormControl>
          </Grid>
          <Grid
            item
            xs={2}
          >
            {isTimeForAlert === false ? (
              <NotificationsIcon />
            ) : (
              <NotificationsActiveIcon sx={{ color: "red" }} />
            )}
          </Grid>
          <Grid
            item
            xs={10}
          >
            <Button
              fullWidth
              variant="contained"
              type="submit"
            >
              Save changes
            </Button>
          </Grid>
          <Grid
            item
            xs={10}
          >
            <a
              href="/fbToken-tutorial.pdf"
              target="_blank"
            >
              <Button variant="outlined">
                How to retrive a new Facebook token
              </Button>
            </a>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default FacebookTokenForm;
