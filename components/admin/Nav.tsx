import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';
import ListSubheader from '@mui/material/ListSubheader';
import {
  Box,
  ListItem,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function AdminNav() {
  const router = useRouter();

  function logout() {
    deleteCookie('Token');
    sessionStorage.removeItem('Token');
    router.push('/login');
  }

  return (
    <Box id='admin-sidebar'>
      <Box sx={{ textAlign: 'center', marginTop: 3, marginBottom: 3 }}>
        <h3>Admin Menu</h3>
      </Box>
      <Divider />
      <Accordion disableGutters elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography>Post</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Divider />
          <Box sx={{ marginTop: 1, marginBottom: 1 }}>
            <Link href={`/admin/posts/create`}>Create new post</Link>
          </Box>
          <Divider />
          <Link href={`/admin/posts`}>Edit posts</Link>
          <Divider />
          <Link href={`/admin/tags/create`}>Add new post tag</Link>
          <Divider />
          <Link href={`/admin/tags`}>Edit post tag</Link>
          <Divider />
          <Link href={`/admin/categories/create`}>Add new post category</Link>
          <Divider />
          <Link href={`/admin/categories`}>Edit post categories</Link>
          <Divider />
          <Link href={`/admin/media/`}>Edit post media</Link>
        </AccordionDetails>
      </Accordion>
      <Accordion disableGutters elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel2a-content'
          id='panel2a-header'
        >
          <Typography>Sections</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Link href={`/admin/about`}>Edit about section</Link>
          <Divider />
          <Typography>Edit Spenden section</Typography>
          <Divider />
          <Typography>Edit Mitglieds section</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion disableGutters elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel2a-content'
          id='panel2a-header'
        >
          <Typography>Website navigation/menu</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Link href={`/admin/menus/create`}>Add new link to menu</Link>
          <Divider />
          <Link href={`/admin/menus`}>Edit menus and links</Link>
        </AccordionDetails>
      </Accordion>
      <Accordion disableGutters elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel2a-content'
          id='panel2a-header'
        >
          <Typography>Gallery</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Link href={`/admin/galleries/create`}>Add new gallery</Link>
          <Divider />
          <Link href={`/admin/galleries`}>Edit Gallery</Link>
          <Divider />
        </AccordionDetails>
      </Accordion>
      <Accordion disableGutters elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel2a-content'
          id='panel2a-header'
        >
          <Typography>Users</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Link href={`/admin/users/register`}>Register new user</Link>
          <Divider />
          <Link href={`/admin/users`}>See/Edit users</Link>
          <Divider />
          <Link href={`/admin/fbtoken`}>Edit fbToken</Link>
        </AccordionDetails>
      </Accordion>
      <Divider />
      <Box sx={{ textAlign: 'center' }}>
        {' '}
        <Button
          variant='contained'
          onClick={logout}
          color='secondary'
          sx={{ marginTop: 3 }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}

export default AdminNav;
