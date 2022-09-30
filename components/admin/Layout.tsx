import React from 'react';
import AdminNav from './Nav';
import styles from '/components/admin/Admin.module.css';
import Link from 'next/link';

import { AppBar, Box } from '@mui/material';
import Grid from '@mui/material/Grid'; // Grid version 1
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2

function AdminLayout({ children }) {
  console.log(children);
  // display what user is logged in
  // log out button
  return (
    <Box id='admin-layout' sx={{ overflow: 'hidden' }}>
      {/* <header id='admin-header' className={styles.adminHeader}>
        <AppBar
          position='fixed'
          sx={{
            display: 'flex',
            justifyContent: 'center',
            paddingLeft: 4,
            paddingRight: 4,
          }}
        >


        </AppBar>
      </header> */}

      {/* <Box className={styles.adminContent} id='admin-content'> */}
      <Box
        className={styles.container}
        sx={{
          width: '20%',
          top: 0,
          left: 0,
          background: '#fafafa',
          height: '100%',
        }}
        position='fixed'
      >
        <AdminNav />
      </Box>
      <Box
        className={styles.container}
        sx={{
          padding: 3,
          width: '80%',
          right: 0,
          top: 0,
        }}
        position='absolute'
      >
        {children}
      </Box>
    </Box>
  );
}
export default AdminLayout;
