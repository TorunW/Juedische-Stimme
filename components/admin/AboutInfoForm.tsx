import React, { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import { useFormik } from "formik";
import axios from "axios";
import { Button, Card, Box, Tabs, Tab } from "@mui/material";
import Grid from "@mui/material/Grid";
import FormError from "@/components/atoms/FormError";
import AdminTopBar from "@/components/atoms/AdminTopBar";
import FormHelp from "../atoms/FormHelp";
import GalleryForm from "./galleries/GalleryForm";

const TiptapEditor = dynamic(() => import("components/tiptap/TipTapEditor"), {
  suspense: true,
});

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
          console.log(response, "response on aboutinfo (put)");
        },
        (error) => {
          console.log(error, "ERROR on put aboutinfo");
        }
      );
    },
  });

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <AdminTopBar
        title="Edit About Us Section"
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

      {currentTab === "About" ? (
        <form onSubmit={formik.handleSubmit}>
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
              <Grid
                container
                item
                sx={{ marginY: 2 }}
              >
                <Suspense fallback={"LOADING..."}>
                  <TiptapEditor
                    onChange={(val) =>
                      formik.setFieldValue("text_top", val, true)
                    }
                    value={formik.values.text_top}
                    height={150}
                    title={"Top Text"}
                  />
                </Suspense>
                <Grid
                  item
                  xs={1}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <FormHelp text={`hello i am her to help you`} />
                </Grid>
              </Grid>
              <Grid
                container
                item
                sx={{ marginY: 2 }}
              >
                <Suspense fallback={"LOADING..."}>
                  <TiptapEditor
                    onChange={(val) =>
                      formik.setFieldValue("text_bottom", val, true)
                    }
                    value={formik.values.text_bottom}
                    height={150}
                    title={"Bottom Text"}
                  />
                </Suspense>
                <Grid
                  item
                  xs={1}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <FormHelp text={``} />
                </Grid>
                {/* {formik.errors && formik.errors.post_content ? (
                    <FormError message={formik.errors.post_content} />
                  ) : (
                    ''
                  )} */}
              </Grid>

              <Grid
                item
                sx={{ marginY: 2 }}
                xs={11}
              >
                <Grid
                  sx={{ marginY: 2 }}
                  xs={12}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    type="submit"
                  >
                    Save Changes
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </form>
      ) : (
        ""
      )}

      {currentTab === "Gallery" ? <GalleryForm gallery={gallery} /> : ""}

      {currentTab === "Translations" ? (
        <Card sx={{ margin: 2, padding: 2 }}>Hello</Card>
      ) : (
        ""
      )}
    </Box>
  );
};

export default AboutInfoForm;
