import React from 'react';
import { useSelector } from 'store/hooks';
import {
  AppBar,
  Box,
  Button,
  Card,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Tab,
  Tabs,
} from '@mui/material';
const PostsHeader = () => {
  const { categories, categoryName } = useSelector((state) => state.categories);

  console.log(categories, categoryName);

  return (
    <Box
      id='admin-posts-header'
      sx={{ borderBottom: 1, borderColor: 'divider' }}
    >
      <Tabs
        value={categoryName}
        onClick={(e) =>
          (window.location.href = `/admin/posts/category/${e.target.value}/page/1`)
        }
        textColor='secondary'
        indicatorColor='secondary'
      >
        {categories && categories !== null
          ? categories.map((category, index) => (
              <Tab
                key={category.term_id}
                value={category.name}
                label={category.name}
              >
                {category.name}
              </Tab>
            ))
          : ''}
      </Tabs>
    </Box>
  );
};

export default PostsHeader;
