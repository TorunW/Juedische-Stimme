import React, { FC } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Card, FormControl, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import axios from "axios";

interface Props {
  label?: any;
}

const LabelForm: FC<Props> = ({ label }) => {
  const formik = useFormik({
    initialValues: {
      label_id: label ? label.label_id : "",
      label_name: label ? label.label_name : "",
      label_title: label ? label.label_title : "",
      label_title_en_US: label ? label.label_title_en_US : "",
      label_type: label ? label.label_type : "",
    },
    validationSchema: Yup.object().shape({
      label_name: Yup.string().required("Add a name"),
      label_title: Yup.string().required("Add a title"),
    }),
    onSubmit: (values) => {
      console.log(values);
      axios({
        method: label ? "put" : "post",
        url: `/api/labels${label ? "/" + label.label_id : ""}`,
        data: values,
      }).then(
        (response) => {
          console.log(response, "response on label (put or post)");
          if (label) window.location.href = `/admin/labels/${label.label_id}`;
          else window.location.href = `/admin/labels`;
        },
        (error) => {
          console.log(error, "ERROR on post / put tag");
        }
      );
    },
  });

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Card
          sx={{
            paddingX: 4,
            paddingY: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <TextField
                  id="label_name"
                  label="Label Name"
                  focused
                  name="label_name"
                  type="text"
                  placeholder="Add a name for the label..."
                  onChange={formik.handleChange}
                  value={formik.values.label_name}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <TextField
                  id="label_type"
                  label="Label Type"
                  focused
                  name="label_type"
                  type="text"
                  placeholder="Add a type for the label..."
                  onChange={formik.handleChange}
                  value={formik.values.label_type}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <TextField
                  id="label_title"
                  label="Label Title"
                  focused
                  name="label_title"
                  type="text"
                  placeholder="Add a title for the label..."
                  onChange={formik.handleChange}
                  value={formik.values.label_title}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <TextField
                  id="label_title_en_US"
                  label="Label Title ( English )"
                  focused
                  name="label_title_en_US"
                  type="text"
                  placeholder="Add a an english title..."
                  onChange={formik.handleChange}
                  value={formik.values.label_title_en_US}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="secondary">
                {label ? "update label" : "create label"}
              </Button>
            </Grid>
          </Grid>
        </Card>
      </form>
    </Box>
  );
};

export default LabelForm;