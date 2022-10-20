import React from "react";
import { useSelector } from "store/hooks";
import {
  Box,
  Card,
  ListItemText,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Container } from "@/components/atoms/Container";

const Users = () => {
  const { users } = useSelector((state) => state.users);
  return (
    <Container>
      <Box
        sx={{
          paddingTop: 4,
        }}
      >
        <Card>
          <List>
            {users &&
              users.map((user, index) => (
                <ListItem key={user.ID}>
                  <ListItemButton>
                    <ListItemIcon>
                      <EditIcon />
                    </ListItemIcon>
                    <ListItemText>
                      <a href={`/admin/users/${user.ID}`}>
                        {user.display_name}
                      </a>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        </Card>
      </Box>
    </Container>
  );
};

export default Users;
