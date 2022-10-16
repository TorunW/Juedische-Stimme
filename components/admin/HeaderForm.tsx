import React, { Suspense, useState } from "react";
import { Form, Formik, FormikProps } from "formik";
import dynamic from "next/dynamic";
import { Card, Tab, Tabs, CircularProgress, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import axios from "axios";
import GalleryForm from "./galleries/GalleryForm";
import AdminTopBar from "../atoms/AdminTopBar";

const TipTapEditor = dynamic(() => import("components/tiptap/TipTapEditor"), {
  suspense: true,
  loading: () => <CircularProgress color="secondary" />,
});

type HeaderProps = {
  header_slogan: string;
};

const HeaderForm = ({ aboutInfo, gallery }) => {
  const { header_slogan } = aboutInfo;
  const tabs = ["Gallery", "Header Text", "Translation"];
  const [currentTab, setCurrentTab] = useState("Gallery");

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

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  return (
    <>
      <AdminTopBar
        title="Edit Header Section"
        tabs={
          <Tabs
            value={currentTab}
            onChange={handleChange}
            indicatorColor="secondary"
            sx={{ color: "white !important" }}
            TabIndicatorProps={{
              style: {
                height: "4px",
                color: "white !important",
              },
            }}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={Date.now() + index}
                value={tab}
                label={tab}
                sx={{ color: "white !important" }}
              />
            ))}
          </Tabs>
        }
      />

      {currentTab === "Header Text" ? (
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
      ) : (
        ""
      )}

      {currentTab === "Gallery" ? <GalleryForm gallery={gallery} /> : ""}

      {currentTab === "Translations" ? <Box>Translations</Box> : ""}
    </>
  );
};

export default HeaderForm;
