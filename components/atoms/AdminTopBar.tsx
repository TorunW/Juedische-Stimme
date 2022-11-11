import { Box, Tab, Tabs, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Container } from "./Container";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
    if (setCurrentTab) {
      if (router.asPath.indexOf("#") > -1) {
        setCurrentTab(router.asPath.split("#")[1]);
      } else setCurrentTab(tabs[0]);
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
          <Box sx={{ paddingBottom: 1, flexDirection: "row", display: "flex" }}>
            <Box>
              <Button
                sx={{ color: "white", marginTop: 0.5, marginRight: 1 }}
                onClick={() => router.back()}
                size="small"
              >
                <ArrowBackIcon />
              </Button>
            </Box>
            <Typography variant="h4">{title}</Typography>
          </Box>
          {tabs?.length > 1 && (
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
