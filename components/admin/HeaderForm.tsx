import React, { useState } from "react";
import { Form, Formik, FormikProps } from "formik";
import { Card, Tab, Tabs, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import axios from "axios";
import GalleryForm from "./galleries/GalleryForm";
import AdminTopBar from "../atoms/AdminTopBar";
import TipTapEditor from "../tiptap/TipTapEditor";
import { Container } from "../atoms/Container";

type HeaderProps = {
  header_slogan: string;
  header_slogan_en_US: string;
};

const HeaderForm = ({ aboutInfo, gallery }) => {
  const { header_slogan, header_slogan_en_US } = aboutInfo;
  const tabs = ["Header Text", "Gallery", "Translation"];
  const [currentTab, setCurrentTab] = useState("Gallery");

  const initialValues = {
    header_slogan,
    header_slogan_en_US,
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
      <Container>
        {(currentTab === "Header Text" || currentTab === "Translation") && (
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
                      {currentTab === "Header Text" ? (
                        <TipTapEditor
                          onChange={(val: string) =>
                            props.setFieldValue("header_slogan", val, true)
                          }
                          value={props.values.header_slogan}
                          height={150}
                          title="Header Slogan"
                        />
                      ) : (
                        <TipTapEditor
                          onChange={(val: string) =>
                            props.setFieldValue(
                              "header_slogan_en_US",
                              val,
                              true
                            )
                          }
                          value={props.values.header_slogan_en_US}
                          height={150}
                          title="Header Slogan ( English )"
                        />
                      )}
                    </Grid>
                    <Grid
                      item
                      xs={6}
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                      >
                        Save Changes
                      </Button>
                    </Grid>
                  </Grid>
                </Card>
              </Form>
            )}
          </Formik>
        )}
      </Container>
      {currentTab === "Gallery" ? <GalleryForm gallery={gallery} /> : ""}
    </>
  );
};

export default HeaderForm;
