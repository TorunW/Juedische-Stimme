import React, { ReactElement, useState } from 'react';
import { useSelector } from 'store/hooks';
import {
  Box,
  Button,
  Card,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Tab,
  Tabs,
  TextField,
  Typography,
  CircularProgress,
  ListItemText,
  List,
  ListItem,
  IconButton,
  ListItemButton,
  ListItemIcon,
  Divider,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import Grid from '@mui/material/Grid';

const Users = () => {
  const { users } = useSelector((state) => state.users);

  let usersDisplay: ReactElement[];
  if (users) {
    usersDisplay = users.map((user, index) => (
      <>
        <ListItem key={user.ID}>
          <ListItemButton>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText>
              <a href={`/admin/users/${user.ID}`}>{user.display_name}</a>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </>
    ));
  }

  return (
    <Box
      sx={{
        paddingTop: 4,
        paddingX: 4,
        minHeight: '70vh',
        maxHeight: '100%',
      }}
    >
      <Card sx={{ width: '400px' }}>
        <List>{usersDisplay}</List>
      </Card>
    </Box>
  );
};

export default Users;
