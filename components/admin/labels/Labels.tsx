import { Container } from "@/components/atoms/Container";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import LabelForm from "./LabelForm";

export const Labels = ({ labels }) => {
  console.log(labels);
  return (
    <Container>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <LabelForm />
        <Table sx={{ minWidth: 650 }} stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Title ( English )</TableCell>
              <TableCell align="right">Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {labels &&
              labels.map((label, index) => (
                <TableRow key={label.name} hover role="checkbox" tabIndex={-1}>
                  <TableCell>
                    <Link href={`/admin/labels/${label.label_id}`}>
                      {label.label_name}
                    </Link>
                  </TableCell>
                  <TableCell align="right">{label.label_title}</TableCell>
                  <TableCell align="right">{label.label_title_en_US}</TableCell>
                  <TableCell align="right">{label.label_type}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};
