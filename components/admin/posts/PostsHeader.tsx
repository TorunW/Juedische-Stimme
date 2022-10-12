import React, { SyntheticEvent } from 'react';
import { useSelector } from 'store/hooks';
import { Tab, Tabs } from '@mui/material';
import AdminTopBar from '@/components/atoms/AdminTopBar';

const PostsHeader = () => {
  const { categories, categoryName } = useSelector((state) => state.categories);

  let tabsDisplay = (
    <Tabs
      value={categoryName}
      onChange={(value, newValue) => {
        window.location.href = `/admin/posts/category/${newValue}/page/1`;
      }}
      indicatorColor='secondary'
      TabIndicatorProps={{
        style: {
          height: '4px',
          color: 'white !important',
        },
      }}
    >
      {categories && categories !== null
        ? categories.map((category, index) => (
            <Tab
              key={category.term_id}
              value={category.name}
              label={category.name}
              sx={{ color: 'white !important' }}
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
