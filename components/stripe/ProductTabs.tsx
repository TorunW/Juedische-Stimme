import React from 'react';
import { Tabs, Tab } from '@mui/material';
import { getLabel } from 'helpers/getLabelHelper';
import { useSelector } from 'store/hooks';

function ProductTabs({ productIndex, setProductIndex, products, setProducts }) {
  const { locale } = useSelector((state) => state.languages);
  const { labels } = useSelector((state) => state.labels);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setProductIndex(newValue);
  };

  return (
    <Tabs
      value={productIndex}
      onChange={handleChange}
      indicatorColor='secondary'
      TabIndicatorProps={{
        style: {
          height: '4px',
        },
      }}
    >
      {products !== null
        ? products.map((product, index) => {
            if (product[0].name) {
              return (
                <Tab
                  key={index}
                  label={getLabel(
                    labels,
                    locale,
                    `${product[0].name
                      .split(' ')
                      .join('_')
                      .toLowerCase()}_donation_tab`,
                    product[0].name
                  )}
                  sx={{
                    color: 'white !important',
                    '&[aria-selected=false]': {
                      color: '#fff !important',
                    },
                  }}
                />
              );
            }
          })
        : ''}
    </Tabs>
  );
}

export default ProductTabs;
