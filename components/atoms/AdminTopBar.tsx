import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Container } from "./Container";

interface Props {
  title: string;
  tabs?: string[];
  currentTab?: string;
  setCurrentTab?: Function;
  customTabClickHandler?: Function;
}

const AdminTopBar = ({
  title,
  tabs,
  currentTab,
  setCurrentTab,
  customTabClickHandler,
}: Props) => {
  const router = useRouter();

  useEffect(() => {
    if (router.asPath.indexOf("#") > -1 && setCurrentTab) {
      setCurrentTab(router.asPath.split("#")[1]);
    }
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if (customTabClickHandler) {
      customTabClickHandler(newValue);
    } else {
      router.push({
        hash: newValue,
      });
      setCurrentTab(newValue);
    }
  };

  const formatLabel = (string) => {
    return string?.indexOf("_") > -1 ? string.split("_").join(" ") : string;
  };

  return (
    <Box
      sx={{
        position: "relative",
        background: "#2e2e2e",
        color: "white",
        width: "100%",
        boxShadow: 4,
        zIndex: 3,
        paddingTop: 1,
      }}
    >
      <Container
        sx={{
          paddingX: 2,
        }}
      >
        <>
          <Box sx={{ paddingBottom: 1 }}>
            <Typography variant="h4">{title}</Typography>
          </Box>
          {tabs?.length > 0 && (
            <Tabs
              value={currentTab}
              onChange={handleChange}
              indicatorColor="secondary"
              TabIndicatorProps={{
                style: {
                  height: "4px",
                },
              }}
            >
              {tabs.map((tab, index) => (
                <Tab
                  key={Date.now() + index}
                  value={tab}
                  label={formatLabel(tab)}
                  sx={{
                    color: "white !important",
                    "&[aria-selected=false]": {
                      color: "gray !important",
                    },
                  }}
                />
              ))}
            </Tabs>
          )}
        </>
      </Container>
    </Box>
  );
};

export default AdminTopBar;
