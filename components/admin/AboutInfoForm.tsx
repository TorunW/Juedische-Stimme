import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Button, Card, Box, Tabs, Tab } from "@mui/material";
import Grid from "@mui/material/Grid";
import AdminTopBar from "@/components/atoms/AdminTopBar";
import GalleryForm from "./galleries/GalleryForm";
import TipTapEditor from "../tiptap/TipTapEditor";

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
        (response) => {},
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
        <Box sx={{ width: "100%", maxWidth: "1067px", margin: "0 auto" }}>
          {" "}
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
                <Grid item>
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
            </Card>
          </form>
        </Box>
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
