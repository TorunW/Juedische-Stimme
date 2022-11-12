import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { ReactElement } from "react";
import type { Category } from "types/Category.type";
import CategoryForm from "./CategoryForm";
import CategoryItem from "./CategoryItem";

interface AdminCategoriesProps {
  categories?: Category[];
}

const AdminCategories = ({ categories }: AdminCategoriesProps) => {
  const deleteCategory = (category: Category) => {
    axios
      .delete(`/api/categories/${category.term_id}`)
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {});
  };

  let categoriesDisplay: ReactElement[];
  if (categories) {
    categoriesDisplay = categories.map((category: Category, index: number) => (
      <CategoryItem
        key={index}
        category={category}
        deleteCategory={deleteCategory}
      />
    ));
  }
  return (
    <Box sx={{ maxWidth: "1067px", margin: "0 auto" }}>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <CategoryForm />
        <Table
          sx={{ minWidth: 650 }}
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <TableCell>Category name</TableCell>
              <TableCell align="right">Count</TableCell>
              <TableCell align="right">Image</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            {categoriesDisplay}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default AdminCategories;
