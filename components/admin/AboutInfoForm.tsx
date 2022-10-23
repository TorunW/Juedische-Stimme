import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Button, Card, Box, Tabs, Tab } from "@mui/material";
import Grid from "@mui/material/Grid";
import AdminTopBar from "@/components/atoms/AdminTopBar";
import GalleryForm from "./galleries/GalleryForm";
import TipTapEditor from "../tiptap/TipTapEditor";
import { Container } from "../atoms/Container";

const AboutInfoForm = ({ aboutInfo, gallery }) => {
  const tabs = ["About", "Gallery", "Translations"];
  const [currentTab, setCurrentTab] = useState("About");
  const formik = useFormik({
    initialValues: {
      ...aboutInfo,
    },
    onSubmit: (values) => {
      axios({
        method: "put",
        url: `/api/aboutinfo`,
        data: {
          ...values,
        },
      }).then(
        (response) => {
          window.location.reload();
        },
        (error) => {}
      );
    },
  });

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  return (
    <Box>
      <AdminTopBar
        title="Edit About Us Section"
        tabs={
          <Tabs
            value={currentTab}
            onChange={handleChange}
            indicatorColor="secondary"
            TabIndicatorProps={{
              style: {
                height: "4px",
              },
            }}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={Date.now() + index}
                value={tab}
                label={tab}
                sx={{
                  color: "white !important",
                  "&[aria-selected=false]": {
                    color: "gray !important",
                  },
                }}
              />
            ))}
          </Tabs>
        }
      />

      {currentTab === "About" || currentTab === "Translations" ? (
        <form onSubmit={formik.handleSubmit}>
          <Container>
            <>
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
                  display="flex"
                  alignItems={"center"}
                >
                  {currentTab === "About" ? (
                    <>
                      <Grid
                        item
                        sx={{ marginY: 2 }}
                      >
                        <TipTapEditor
                          onChange={(val) =>
                            formik.setFieldValue("text_top", val, true)
                          }
                          value={formik.values.text_top}
                          height={150}
                          title={"About Us Text"}
                        />
                      </Grid>
                    </>
                  ) : currentTab === "Translations" ? (
                    <Grid
                      item
                      xs={12}
                      sx={{ marginY: 2 }}
                    >
                      <TipTapEditor
                        onChange={(val) =>
                          formik.setFieldValue("text_top_en_US", val, true)
                        }
                        value={formik.values.text_top_en_US}
                        height={150}
                        title={"About Us Text ( English )"}
                      />
                    </Grid>
                  ) : (
                    ""
                  )}
                  <Grid
                    item
                    xs={12}
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
            </>
          </Container>
        </form>
      ) : (
        ""
      )}

      {currentTab === "Gallery" ? <GalleryForm gallery={gallery} /> : ""}
    </Box>
  );
};

export default AboutInfoForm;
