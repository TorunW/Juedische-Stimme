import { Container } from "@/components/atoms/Container";
import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Label, LabelTypes } from "types/Label.type";
import LabelForm from "./LabelForm";
import { useRouter } from "next/router";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

enum LabelPropsName {
  "label_title" = "German",
  "label_title_en_US" = "English",
  "label_type" = "Type",
  "label_name" = "Name",
}

const labelItemProps = [
  "label_title",
  "label_title_en_US",
  "label_name",
  "label_type",
];

export const Labels = ({ labels }) => {
  const router = useRouter();
  const [sortBy, setSortBy] = useState("label_type");

  const sortLabelsBy = (a, b) => {
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
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <LabelForm />
        <Table
          sx={{ minWidth: 650 }}
          stickyHeader
        >
          <TableHead>
            <TableRow>
              {labelItemProps.map((lip, index) => (
                <TableCell
                  key={lip}
                  align={lip === "label_type" ? "right" : "left"}
                  onClick={() => setSortBy(lip)}
                >
                  <Box
                    sx={{
                      cursor: "pointer",
                      flexDirection: "row",
                      display: "flex",
                    }}
                  >
                    <Typography fontWeight="500">
                      {LabelPropsName[lip]}
                    </Typography>
                    {sortBy === lip && <ArrowDropDownIcon />}
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {labels &&
              labels.sort(sortLabelsBy).map((label: Label, index) => (
                <TableRow
                  key={label.label_name}
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  onClick={() => router.push(`/admin/labels/${label.label_id}`)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>{label.label_title}</TableCell>
                  <TableCell>{label.label_title_en_US}</TableCell>
                  <TableCell>{label.label_name}</TableCell>
                  <TableCell align="right">
                    <Chip
                      sx={{
                        fontSize: "14px",
                        marginTop: "8px",
                        borderRadius: "4px",
                        padding: "4px",
                        fontWeight: "bold",
                        color: "white",
                        backgroundColor: "secondary.light",
                      }}
                      label={LabelTypes[label.label_type]}
                    ></Chip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};
