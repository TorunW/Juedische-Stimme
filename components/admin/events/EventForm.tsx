import {
  Button,
  Card,
  Stack,
  FormControl,
  TextField,
  Box,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { Event } from "types/Event.type";
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
      link: event?.link ?? "",
      location: event?.location ?? "",
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("this field is required"),
      description: Yup.string().required("this field is required"),
      date: Yup.string().required("this field is required"),
      location: Yup.string().required("this field is required"),
    }),
    onSubmit: (values) => {
      console.log("hello");
      axios({
        method: event ? "PUT" : "POST",
        url: `/api/events${event ? "/" + event.id : ""}`,
        data: values,
      }).then(
        (response) => {
          console.log(response, "response on event (put or post)");
          // if (event) window.location.href = `/admin/events/${event.id}`;
          // else window.location.href = `/admin/events`;
        },
        (error) => {
          console.log(error, "ERROR on post / put event");
        }
      );
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card
        sx={{
          paddingX: 4,
          paddingY: 2,
        }}
      >
        <Stack
          spacing={2}
          gap={4}
          flexDirection="row"
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

          <FormControl
            fullWidth
            margin="normal"
          >
            <TextField
              id="description"
              label="Description"
              focused
              name="description"
              type="text"
              placeholder="description..."
              onChange={formik.handleChange}
              value={formik.values.description}
            />
          </FormControl>
        </Stack>
        <Stack
          spacing={2}
          gap={4}
          flexDirection="row"
        >
          <FormControl
            fullWidth
            margin="normal"
          >
            <TextField
              id="date"
              label="Date"
              focused
              name="date"
              type="text"
              placeholder="date..."
              onChange={formik.handleChange}
              value={formik.values.date}
            />
          </FormControl>
          <FormControl
            fullWidth
            margin="normal"
          >
            <TextField
              id="location"
              label="Location"
              focused
              name="location"
              type="text"
              placeholder="location..."
              onChange={formik.handleChange}
              value={formik.values.location}
            />
          </FormControl>
        </Stack>
        <Stack
          mb={2}
          spacing={2}
          gap={4}
          flexDirection="row"
        >
          <FormControl
            fullWidth
            margin="normal"
          >
            <TextField
              id="link"
              label="link"
              focused
              name="link"
              type="text"
              placeholder="link..."
              onChange={formik.handleChange}
              value={formik.values.link}
            />
          </FormControl>

          <FormControl
            fullWidth
            margin="normal"
            sx={{
              paddingTop: 1.5,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="secondary"
            >
              {event ? "update event" : "create event"}
            </Button>
          </FormControl>
        </Stack>
      </Card>
    </form>
  );
};

export default EventForm;
