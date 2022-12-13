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

  function getLabelWidth(label: string) {
    console.log(!!label.includes(" "), "includes");
    if (!!label.includes(" ")) {
      return label.length * 8;
    }
  }

  return (
    <Tabs
      value={productIndex}
      onChange={handleChange}
      indicatorColor="secondary"
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
          sx={{
            width: getLabelWidth(
              getLabel(
                labels,
                locale,
                `${product[0].name
                  ?.split(" ")
                  .join("_")
                  .toLowerCase()}_donation_tab`,
                product[0].name
              )
            ),
            color: "white !important",
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
