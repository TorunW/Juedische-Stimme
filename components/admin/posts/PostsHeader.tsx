import React, { SyntheticEvent } from 'react';
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
import AdminTopBar from '@/components/atoms/AdminTopBar';
const PostsHeader = () => {
  const { categories, categoryName } = useSelector((state) => state.categories);

  let tabsDisplay = (
    <Tabs
      value={categoryName}
      onChange={(value, newValue) => {
        window.location.href = `/admin/posts/category/${newValue}/page/1`;
      }}
      textColor='disabled'
      indicatorColor='secondary'
      TabIndicatorProps={{
        style: {
          height: '4px',
        },
      }}
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
  );

  return (
    <>
      <AdminTopBar tabs={tabsDisplay} />
    </>
  );
};

export default PostsHeader;
