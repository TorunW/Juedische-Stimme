import { useFormik } from "formik";
import React, { FC } from "react";
import * as Yup from "yup";
import { User } from "types/User.type";
import axios from "axios";

import { app } from "firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import { useRouter } from "next/router";

import { Box, Button, Card, FormControl, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import FormError from "@/components/atoms/FormError";

interface UserFormProps {
  user?: User;
}

const UserForm: FC<UserFormProps> = ({ user }) => {
  const auth = getAuth(app);
  const router = useRouter();

  console.log(auth);

  const formik = useFormik({
    initialValues: {
      display_name: user ? user.display_name : "",
      user_email: user ? user.user_email : "",
      user_registered: user ? user.user_registered : Date.now(),
      user_status: user ? user.user_status : 1,
      user_pass: user ? user.user_pass : "",
    },
    validationSchema: Yup.object().shape({
      display_name: Yup.string().required("Name is required"),
      user_email: Yup.string().email().required("Email is required!"),
      user_pass: Yup.string().min(7).required("Password is required"),
    }),
    onSubmit: (values) => {
      if (!user) {
        createUserWithEmailAndPassword(
          auth,
          values.user_email,
          values.user_pass
        ).then((response: any) => {
          console.log(response.user);
          if (response.user) {
            updateUser(values);
          }
        });
      } else {
        //updatePassword(auth.currentUser);
        updateUser(values);
      }
    },
  });

  function updateUser(values: User) {
    axios({
      method: user ? "put" : "post",
      url: `/api/users${user ? "/" + user.ID : ""}`,
      data: {
        ...values,
      },
    }).then(
      (response) => {
        if (response.data) router.push("/admin/users/");
      },
      (error) => {
        console.log(error, "ERROR on post / put user");
      }
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Card
          sx={{
            margin: 4,
            paddingLeft: 4,
            paddingRight: 2,
            paddingY: 4,
            maxWidth: "900px",
            minWidth: "450px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            container
            spacing={2}
          >
            <FormControl
              fullWidth
              margin="normal"
            >
              <TextField
                id="display_name"
                name="display_name"
                label="Name"
                onChange={formik.handleChange}
                value={formik.values.display_name}
              />
              {formik.errors && formik.errors.display_name ? (
                <FormError message={formik.errors.display_name} />
              ) : (
                ""
              )}
            </FormControl>
            <FormControl
              fullWidth
              margin="normal"
            >
              <TextField
                id="user_email"
                name="user_email"
                type="email"
                label="Email"
                onChange={formik.handleChange}
                value={formik.values.user_email}
              />
              {formik.errors.user_email ? (
                <FormError message={formik.errors.user_email} />
              ) : (
                ""
              )}
            </FormControl>
            <FormControl
              fullWidth
              margin="normal"
            >
              <TextField
                id="user_pass"
                name="user_pass"
                type="password"
                label="Password"
                onChange={formik.handleChange}
                value={formik.values.user_pass}
              />
              {formik.errors.user_pass ? (
                <FormError message={formik.errors.user_pass} />
              ) : (
                ""
              )}
            </FormControl>
            <FormControl
              fullWidth
              margin="normal"
            >
              <Button
                variant="contained"
                color="secondary"
                type="submit"
              >
                {user ? "update user" : "register user"}
              </Button>
            </FormControl>
          </Grid>
        </Card>
      </form>
    </Box>
  );
};

export default UserForm;
