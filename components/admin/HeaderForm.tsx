import React, { Suspense } from "react";
import { Form, Formik, FormikProps, useFormik } from "formik";
import dynamic from "next/dynamic";
import {
  Box,
  Button,
  Card,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Tab,
  Tabs,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import FormError from "@/components/atoms/FormError";
import AdminTopBar from "@/components/atoms/AdminTopBar";
import axios from "axios";
import { PerformantTextField } from "../atoms/PerformantTextField";
import GalleryForm from "./galleries/GalleryForm";

const TipTapEditor = dynamic(() => import("components/tiptap/TipTapEditor"), {
  suspense: true,
  loading: () => <CircularProgress color="secondary" />,
});

type HeaderProps = {
  header_slogan: string;
};

const HeaderForm = ({ aboutInfo, gallery }) => {
  const { header_slogan } = aboutInfo;
  console.log(gallery);

  const initialValues = {
    header_slogan,
  };

  const onSubmit = (values) => {
    axios({
      method: "put",
      url: `/api/header`,
      data: {
        ...values,
      },
    }).then(
      (response) => {
        console.log(response, "response on header (put)");
      },
      (error) => {
        console.log(error, "ERROR on put header");
      }
    );
  };

  return (
    <>
      {" "}
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {(props: FormikProps<HeaderProps>) => (
          <Form>
            <Card
              sx={{
                paddingLeft: 4,
                paddingRight: 2,
                paddingY: 2,
                margin: 2,
              }}
            >
              <Grid
                container
                spacing={2}
              >
                <Grid
                  item
                  xs={12}
                >
                  <Suspense>
                    <TipTapEditor
                      onChange={(val: string) =>
                        props.setFieldValue("header_slogan", val, true)
                      }
                      value={props.values.header_slogan}
                      height={150}
                      title="Header Slogan"
                    />
                  </Suspense>
                </Grid>
              </Grid>
            </Card>
          </Form>
        )}
      </Formik>
      <GalleryForm gallery={gallery} />
    </>
  );
};

export default HeaderForm;
