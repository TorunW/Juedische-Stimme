import AdminTopBar from "@/components/atoms/AdminTopBar";
import { Container } from "@/components/atoms/Container";
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
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import menuTypes from "lib/menuTypes.json";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import MenuItemForm from "./MenuItemForm";

const MenuItems = ({ menuItems }) => {
  const router = useRouter();
  const tabs = menuTypes.filter(
    (menu) => menu !== "call_to_action_menu" && menu !== "socials_menu"
  );
  const [currentTab, setCurrentTab] = useState(
    router.asPath?.split("#")[1] ?? tabs[0] ?? "main_menu"
  );
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
          console.log(response, "response on delete media item");
        },
        (error) => {
          console.log(error, "ERROR on delete media item");
        }
      );
  }

  let menuItemsDisplay: ReactElement;
  if (menuItems) {
    const menuItemsArray = menuItems.filter(
      (menuItem) => menuItem.taxonomy === currentTab
    );
    if (menuItemsArray.length === 0)
      menuItemsDisplay = <p>no menu items for {currentTab}</p>;
    else {
      menuItemsDisplay = menuItemsArray.map((menuItem: any, index: number) => (
        <TableBody
          key={index}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
          >
            <TableCell>
              <Link href={`/admin/menus/${menuItem.term_id}`}>
                {menuItem.title}
              </Link>
            </TableCell>
            <TableCell align="right">{menuItem.link}</TableCell>

            <TableCell align="right">{menuItem.term_order}</TableCell>

            <TableCell align="right">
              <Link href={`/admin/menus/${menuItem.term_id}`}>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Link>
            </TableCell>

            <TableCell align="right">
              <IconButton onClick={handleClickOpen}>
                <DeleteIcon />
              </IconButton>

              <Dialog
                open={open}
                onClose={handleClose}
              >
                <DialogTitle>{"Delete Tag?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    {` Once the tag is delete it can't be retrived again`}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    variant="outlined"
                    onClick={() => deleteMenuItem(menuItem)}
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
            </TableCell>
          </TableRow>
        </TableBody>
      ));
    }
  }

  return (
    <>
      <AdminTopBar
        title="Menu Items"
        tabs={tabs}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <Container>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <MenuItemForm />
          <Table
            sx={{ minWidth: 650 }}
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Link</TableCell>
                <TableCell align="right">Order</TableCell>
                <TableCell align="right">Edit</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            {menuItemsDisplay}
          </Table>
        </Paper>
      </Container>
    </>
  );
};

export default MenuItems;
