import React from "react";
import { Tabs, Tab, useMediaQuery } from "@mui/material";
import { getLabel } from "helpers/getLabelHelper";
import { useSelector } from "store/hooks";
import theme from "config/theme";

function ProductTabs({ productIndex, setProductIndex, products, setProducts }) {
  const { locale } = useSelector((state) => state.languages);
  const { labels } = useSelector((state) => state.labels);

  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setProductIndex(newValue);
  };
  return (
    <Tabs
      value={productIndex}
      onChange={handleChange}
      indicatorColor="secondary"
      variant="scrollable"
      allowScrollButtonsMobile
      sx={{
        "& .MuiTabScrollButton-root": {
          color: "white",
        },
      }}
      TabIndicatorProps={{
        style: {
          height: "4px",
        },
      }}
    >
      {products?.map((product, index) => (
        <Tab
          key={index}
          label={getLabel(
            labels,
            locale,
            `${product[0].name
              ?.split(" ")
              .join("_")
              .toLowerCase()}_donation_tab`,
            product[0].name
          )}
          wrapped={isSmall ? true : false}
          sx={{
            color: "white !important",
            padding: "8px",
            "&[aria-selected=false]": {
              color: "#fff !important",
            },
          }}
        />
      ))}
    </Tabs>
  );
}

export default ProductTabs;
