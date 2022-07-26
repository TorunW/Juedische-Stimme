import { Container } from "@/components/atoms/Container";
import {
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useFormik } from "formik";
import { Label, LabelType, LabelTypes } from "types/Label.type";
import * as Yup from "yup";

interface Props {
  label?: Label;
}

const LabelForm = ({ label }: Props) => {
  const labelTypes: LabelType[] = [
    "button",
    "form_field",
    "title",
    "tab",
    "text",
  ];

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
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <Card
          sx={{
            paddingX: 4,
            paddingY: 2,
          }}
        >
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={6}
            >
              <FormControl
                fullWidth
                margin="normal"
              >
                <TextField
                  id="label_title"
                  label="German"
                  focused
                  name="label_title"
                  type="text"
                  placeholder="Add german text for the label..."
                  onChange={formik.handleChange}
                  value={formik.values.label_title}
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={6}
            >
              <FormControl
                fullWidth
                margin="normal"
              >
                <TextField
                  id="label_title_en_US"
                  label="English"
                  focused
                  name="label_title_en_US"
                  type="text"
                  placeholder="Add english text for the label..."
                  onChange={formik.handleChange}
                  value={formik.values.label_title_en_US}
                />
              </FormControl>
            </Grid>

            <Grid
              item
              xs={6}
            >
              <FormControl
                fullWidth
                margin="normal"
              >
                <TextField
                  id="label_name"
                  label="System name"
                  focused
                  disabled={false}
                  name="label_name"
                  type="text"
                  placeholder="Add a system name for the label..."
                  onChange={formik.handleChange}
                  value={formik.values.label_name}
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={6}
            >
              <FormControl
                fullWidth
                margin="normal"
              >
                <InputLabel>Label Type</InputLabel>
                <Select
                  id="label_type"
                  name="label_type"
                  label="Choose Menu"
                  value={formik.values.label_type}
                  onChange={formik.handleChange}
                >
                  {labelTypes.map((lt, index) => (
                    <MenuItem
                      key={lt}
                      value={lt}
                    >
                      {LabelTypes[lt]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid
              item
              xs={12}
            >
              <Button
                type="submit"
                variant="contained"
                color="secondary"
              >
                {label ? "update label" : "create label"}
              </Button>
            </Grid>
          </Grid>
        </Card>
      </form>
    </Container>
  );
};

export default LabelForm;
