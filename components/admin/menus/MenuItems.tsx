import React, { ReactElement, useState } from 'react';
import axios from 'axios';
import menuTypes from 'lib/menuTypes.json';
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Link,
  Divider,
  IconButton,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Tabs,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const MenuItems = ({ menuItems }) => {
  const [currentMenu, setCurrentMenu] = useState('main_menu');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function deleteMenuItem(menuItem) {
    axios
      .delete(`/api/menus/${menuItem.term_id}`, {
        data: {
          ...menuItem,
        },
      })
      .then(
        (response) => {
          window.location.reload();
          console.log(response, 'response on delete media item');
        },
        (error) => {
          console.log(error, 'ERROR on delete media item');
        }
      );
  }

  let menuItemsDisplay: ReactElement;
  if (menuItems) {
    const menuItemsArray = menuItems.filter(
      (menuItem) => menuItem.taxonomy === currentMenu
    );
    if (menuItemsArray.length === 0)
      menuItemsDisplay = <p>no menu items for {currentMenu}</p>;
    else {
      menuItemsDisplay = menuItemsArray.map((menuItem: any, index: number) => (
        <TableBody
          key={index}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableRow hover role='checkbox' tabIndex={-1}>
            <TableCell>
              <Link href={`/admin/menus/${menuItem.term_id}`}>
                {menuItem.title}
              </Link>
            </TableCell>
            <TableCell align='right'>{menuItem.term_order}</TableCell>
            <TableCell align='right'>{menuItem.term_order}</TableCell>
            <TableCell align='right'>{menuItem.link}</TableCell>
            <TableCell align='right'>{menuItem.taxonomy}</TableCell>
            <TableCell align='right'>
              <IconButton>
                <Link href={`/admin/menus/${menuItem.term_id}`}>
                  <EditIcon />
                </Link>
              </IconButton>
            </TableCell>

            <TableCell align='right'>
              <IconButton onClick={handleClickOpen}>
                <DeleteIcon />
              </IconButton>

              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{'Delete Tag?'}</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Once the tag is delete it can't be retrived again
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    variant='outlined'
                    onClick={() => deleteMenuItem(menuItem)}
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
        </TableBody>
      ));
    }
  }

  return (
    <div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Table sx={{ minWidth: 650 }} stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align='right'>Order</TableCell>
              <TableCell align='right'>Link</TableCell>
              <TableCell align='right'>Menu</TableCell>
              <TableCell align='right'>Edit</TableCell>
              <TableCell align='right'>Delete</TableCell>
            </TableRow>
          </TableHead>
          {menuItemsDisplay}
        </Table>
      </Paper>
      <ul>
        {menuTypes.map((menu, index) => (
          <li key={index + Date.now()}>
            <a onClick={() => setCurrentMenu(menu)}>{menu}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuItems;
