import { Container } from "@/components/atoms/Container";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { Event, EventPropNames } from "types/Event.type";
import EventForm from "./EventForm";

const eventItemProps = ["title", "description", "date", "link", "location"];
export const Events = ({ events }: { events: Event[] }) => {
  const router = useRouter();
  const [sortBy, setSortBy] = useState("date");

  const sortEventsBy = (a: Event, b: Event) => {
    if (a[sortBy] < b[sortBy]) {
      return -1;
    }
    if (a[sortBy] > b[sortBy]) {
      return 1;
    }
    return 0;
  };

  return (
    <Container>
      <EventForm />
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Table
          sx={{ minWidth: 650 }}
          stickyHeader
        >
          <TableHead>
            <TableRow>
              {eventItemProps.map((eip, index) => (
                <TableCell
                  key={eip}
                  onClick={() => setSortBy(eip)}
                >
                  <Box
                    sx={{
                      cursor: "pointer",
                      flexDirection: "row",
                      display: "flex",
                    }}
                  >
                    <Typography fontWeight="500">
                      {EventPropNames[eip]}
                    </Typography>
                    {sortBy === eip && <ArrowDropDownIcon />}
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {events &&
              events.sort(sortEventsBy).map((event: Event, index) => (
                <TableRow
                  key={event.id}
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  onClick={() => router.push(`/admin/events/${event.id}`)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>{event.title}</TableCell>
                  <TableCell>{event.description}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.link}</TableCell>
                  <TableCell>{event.location}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};
