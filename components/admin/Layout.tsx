import React from 'react';
import AdminNav from './Nav';
import styles from '/components/admin/Admin.module.css';
import Link from 'next/link';
import { Box, Drawer } from '@mui/material';

const drawerWidth = 240;

function AdminLayout({ children }) {
  // display what user is logged in
  // log out button
  return (
    <Box id='admin-layout' sx={{ display: 'flex' }}>
      <Box sx={{ backgroundColor: 'black' }}>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant='permanent'
          anchor='left'
        >
          <AdminNav />
        </Drawer>
      </Box>
      <Box sx={{ width: '100%', overflowX: 'hidden' }}>{children}</Box>
    </Box>
  );
}
export default AdminLayout;
