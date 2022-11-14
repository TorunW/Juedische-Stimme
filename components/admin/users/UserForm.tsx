import axios from "axios";
import { useFormik } from "formik";
import { User } from "types/User.type";
import * as Yup from "yup";

import {
  createUserWithEmailAndPassword,
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { app } from "firebaseConfig";
import { useRouter } from "next/router";

import FormError from "@/components/atoms/FormError";
import { Box, Button, Card, FormControl, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";

interface UserFormProps {
  user?: User;
}

const UserForm = ({ user }: UserFormProps) => {
  const auth = getAuth(app);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      user_login: user ? user.user_login : "",
      user_nicename: user ? user.user_nicename : "",
      display_name: user ? user.display_name : "",
      user_email: user ? user.user_email : "",
      user_registered: user ? user.user_registered : Date.now(),
      user_status: user ? user.user_status : 1,
      current_password: "",
      user_pass: "",
    },
    validationSchema: Yup.object().shape({
      display_name: Yup.string().required("Name is required"),
      user_email: Yup.string().email().required("Email is required!"),
      user_pass: Yup.string().min(7).required("Password is required"),
    }),
    onSubmit: async (values) => {
      if (!user) {
        createUserWithEmailAndPassword(
          auth,
          values.user_email,
          values.user_pass
        ).then((response: any) => {
          if (response.user) {
            updateUser(values);
          }
        });
      } else {
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(
          user.email,
          values.current_password
        );

        const result = await reauthenticateWithCredential(
          auth.currentUser,
          credential
        );
        updatePassword(user, values.user_pass);
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
        if (response.data) {
          router.reload();
        }
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
                id="current_password"
                name="current_password"
                type="password"
                label="Current Password"
                placeholder="********"
                onChange={formik.handleChange}
                value={formik.values.current_password}
              />
              {formik.errors.current_password ? (
                <FormError message={formik.errors.current_password} />
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
                label="New Password"
                placeholder="********"
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
