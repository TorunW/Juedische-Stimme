import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { generateFileServerSrc } from "helpers/generateFileServerSrc";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function CategoryItem({ category, deleteCategory }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <TableRow
      hover
      tabIndex={-1}
      key={category.term_id}
    >
      <TableCell>
        <Typography>{category.name}</Typography>
      </TableCell>
      <TableCell align="right">{category.count}</TableCell>
      <TableCell align="right">
        <Image
          src={generateFileServerSrc(category.category_image)}
          width={100}
          height={100}
        />
      </TableCell>
      <TableCell align="right">
        <Link href={`/admin/categories/${category.term_id}`}>
          <IconButton>
            <EditIcon />
          </IconButton>
        </Link>
      </TableCell>
      <TableCell align="right">
        {category.term_id !== 66 &&
        category.term_id !== 2 &&
        category.term_id !== 1 ? (
          <>
            <IconButton onClick={handleClickOpen}>
              <DeleteIcon />
            </IconButton>
            <Dialog
              open={open}
              onClose={handleClose}
            >
              <DialogTitle>{`Delete ${category.name}?`}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {` Once the category is delete it can't be retrived again`}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="outlined"
                  onClick={() => deleteCategory(category)}
                  autoFocus
                >
                  Delete
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </>
        ) : (
          <IconButton disabled>
            <DeleteIcon />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
}

export default CategoryItem;
