import React, { useState } from "react";
import { Form, Formik, FormikProps } from "formik";
import { Card, Tab, Tabs, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import axios from "axios";
import GalleryForm from "./galleries/GalleryForm";
import AdminTopBar from "../atoms/AdminTopBar";
import TipTapEditor, { EditorHeight } from "../tiptap/TipTapEditor";
import { Container } from "../atoms/Container";

type HeaderProps = {
  header_slogan: string;
  header_slogan_en_US: string;
};

const HeaderForm = ({ aboutInfo, gallery }) => {
  const { header_slogan, header_slogan_en_US } = aboutInfo;
  const tabs = ["German", "English", "Gallery"];
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  const initialValues = {
    header_slogan: header_slogan,
    header_slogan_en_US: header_slogan_en_US,
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
        window.location.reload();
      },
      (error) => {
        console.log(error, "ERROR on put header");
      }
    );
  };

  return (
    <>
      <AdminTopBar
        title="Edit Header Section"
        tabs={tabs}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <Container>
        {(currentTab === tabs[0] || currentTab === tabs[1]) && (
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
                      {currentTab === tabs[0] && (
                        <TipTapEditor
                          onChange={(val: string) =>
                            props.setFieldValue("header_slogan", val, true)
                          }
                          value={props.values.header_slogan}
                          height={EditorHeight.small}
                          title="Header Slogan"
                        />
                      )}

                      {currentTab === tabs[1] && (
                        <TipTapEditor
                          onChange={(val: string) =>
                            props.setFieldValue(
                              "header_slogan_en_US",
                              val,
                              true
                            )
                          }
                          value={props.values.header_slogan_en_US}
                          height={EditorHeight.small}
                          title="Header Slogan"
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
