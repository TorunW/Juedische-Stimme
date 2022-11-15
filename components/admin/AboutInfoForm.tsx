import AdminTopBar from "@/components/atoms/AdminTopBar";
import { Box, Button, Card } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Container } from "../atoms/Container";
import TipTapEditor, { EditorHeight } from "../tiptap/TipTapEditor";
import GalleryForm from "./galleries/GalleryForm";

const AboutInfoForm = ({ aboutInfo, gallery }) => {
  const tabs = ["German", "English", "Gallery"];
  const [currentTab, setCurrentTab] = useState(tabs[0]);
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

  return (
    <Box>
      <AdminTopBar
        title="Edit About Us Section"
        tabs={tabs}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />

      {currentTab !== "Gallery" && (
        <form onSubmit={formik.handleSubmit}>
          <Container>
            <Card
              sx={{
                paddingLeft: 4,
                paddingRight: 2,
                paddingY: 2,
                margin: 2,
              }}
            >
              <Stack
                spacing={2}
                display="flex"
                alignItems={"center"}
              >
                {currentTab === tabs[0] && (
                  <TipTapEditor
                    onChange={(val) =>
                      formik.setFieldValue("text_top", val, true)
                    }
                    value={formik.values.text_top}
                    height={EditorHeight.medium}
                    title={"About Us Text"}
                  />
                )}

                {currentTab === tabs[1] && (
                  <TipTapEditor
                    onChange={(val) =>
                      formik.setFieldValue("text_top_en_US", val, true)
                    }
                    value={formik.values.text_top_en_US}
                    height={EditorHeight.medium}
                    title={"About Us Text "}
                  />
                )}

                <Box
                  width="100%"
                  display="flex"
                  flexDirection="row"
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                  >
                    Save Changes
                  </Button>
                </Box>
              </Stack>
            </Card>
          </Container>
        </form>
      )}

      {currentTab === "Gallery" && <GalleryForm gallery={gallery} />}
    </Box>
  );
};

export default AboutInfoForm;
