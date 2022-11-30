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
import { useFormik } from "formik";
import { Event } from "types/Event.type";
import { LabelTypes } from "types/Label.type";
import * as Yup from "yup";

interface Props {
  event?: Event;
}

const EventForm = ({ event }: Props) => {
  const formik = useFormik({
    initialValues: {
      id: event?.id ?? "",
      title: event?.title ?? "",
      description: event?.description ?? "",
      date: event?.date ?? "",
      time: event?.time ?? "",
      location: event?.location ?? "",
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("this field is required"),
      description: Yup.string().required("this field is required"),
      date: Yup.string().required("this field is required"),
      time: Yup.string().required("this field is required"),
      location: Yup.string().required("this field is required"),
    }),
    onSubmit: (values) => {
      //   axios({
      //     method: label ? "put" : "post",
      //     url: `/api/labels${label ? "/" + label.label_id : ""}`,
      //     data: values,
      //   }).then(
      //     (response) => {
      //       console.log(response, "response on label (put or post)");
      //       if (label) window.location.href = `/admin/labels/${label.label_id}`;
      //       else window.location.href = `/admin/labels`;
      //     },
      //     (error) => {
      //       console.log(error, "ERROR on post / put tag");
      //     }
      //   );
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
                  id="title"
                  label="Title"
                  focused
                  name="title"
                  type="text"
                  placeholder="Title..."
                  onChange={formik.handleChange}
                  value={formik.values.title}
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
            ></Grid>

            <Grid
              item
              xs={12}
            >
              <Button
                type="submit"
                variant="contained"
                color="secondary"
              >
                {event ? "update event" : "create event"}
              </Button>
            </Grid>
          </Grid>
        </Card>
      </form>
    </Container>
  );
};

export default EventForm;
