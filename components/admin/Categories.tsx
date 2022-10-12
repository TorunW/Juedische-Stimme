import axios from 'axios';
import React, { ReactElement } from 'react';
import type { Category } from 'types/Category.type';
import Image from 'next/image';
import { generateImageUrl } from 'helpers/imageUrlHelper';
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';

interface AdminCategoriesProps {
  categories?: Category[];
}

const AdminCategories = ({ categories }: AdminCategoriesProps) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteCategory = (category: Category) => {
    const confirmDelete = confirm(
      `are you sure you want to delete ${category.name}?`
    );
    axios
      .delete(`/api/categories/${category.term_id}`)
      .then((response) => {
        console.log(response, ' REPONSE ON DELETE CATEGORY ');
        window.location.reload();
      })
      .catch((error) => {
        console.log(error, ' ERROR ON DELETE CATEGORY');
      });
  };

  let categoriesDisplay: ReactElement[];
  if (categories) {
    categoriesDisplay = categories.map((category: Category, index: number) => (
      <TableRow hover tabIndex={-1} key={category.term_id}>
        <TableCell>
          <Typography>{category.name}</Typography>
        </TableCell>
        <TableCell align='right'>{category.count}</TableCell>
        <TableCell align='right'>
          <Image
            src={generateImageUrl(category.category_image)}
            width={100}
            height={100}
          />
        </TableCell>
        <TableCell align='right'>
          <IconButton>
            <Link href={`/admin/categories/${category.term_id}`}>
              <EditIcon />
            </Link>
          </IconButton>
        </TableCell>
        <TableCell align='right'>
          {category.term_id !== 66 &&
          category.term_id !== 2 &&
          category.term_id !== 1 ? (
            <IconButton onClick={handleClickOpen}>
              <DeleteIcon />
            </IconButton>
          ) : (
            <IconButton disabled onClick={handleClickOpen}>
              <DeleteIcon />
            </IconButton>
          )}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{'Delete Category?'}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Once the category is delete it can't be retrived again
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant='outlined'
                onClick={() => deleteCategory(category)}
                autoFocus
              >
                Delete
              </Button>
              <Button variant='outlined' onClick={handleClose}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </TableCell>
      </TableRow>
    ));
  }
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Table sx={{ minWidth: 650 }} stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Category name</TableCell>
            <TableCell align='right'>Count</TableCell>
            <TableCell align='right'>Image</TableCell>
            <TableCell align='right'>Edit</TableCell>
            <TableCell align='right'>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          {categoriesDisplay}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default AdminCategories;
