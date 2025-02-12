import React, { useEffect, useState } from "react";
import {
  Paper,
  Box,
  Typography,
  TextField,
  Tabs,
  Tab,
  Grid,
  Divider,
  InputAdornment,
} from "@mui/material";

import { Search as SearchIcon } from "@mui/icons-material/";
import useSkuEnrollmentSearch from "./hooks/useSkuEnrollmentSearch";
import useSkuEnrollmentContext from "../../../store/OrderAnalyst/SkuEnrollment/useSkuEnrollmentContext";
import { ADD_SKU, DELETE_SKU, UPDATE_SKU } from "../../../constants/constants";
import AddEditSku from "./Components/AddEditSku";

const SkuEnrollmentPage: React.FC = () => {
  const { debouncedSkuSearchOnChange } = useSkuEnrollmentSearch("");
  const {
    zSkuEnrollmentTab,
    zSetSkuEnrollmentTab,
    zSkuAddEditTitle,
    zSetSkuAddEditTitle,
    zSkuSearchText,
    clearSkuEnrollmentAEData,
    zSetSkuMasterList,
  } = useSkuEnrollmentContext();

  useEffect(() => {}, []);

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: number
  ): void => {
    zSetSkuEnrollmentTab(newValue);
    if (newValue === 0) {
      zSetSkuAddEditTitle(ADD_SKU);
      clearSkuEnrollmentAEData();
      zSetSkuMasterList([]);
    } else if (newValue === 1) {
      zSetSkuAddEditTitle(UPDATE_SKU);
    } else {
      zSetSkuAddEditTitle(DELETE_SKU);
    }
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          marginTop: "16px",
          marginLeft: "20px",
          marginRight: "20px",
          flexGrow: 1,
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", marginBottom: "10px", color: "#1C2C5A" }}
        >
          SKU Library
        </Typography>
        <Divider sx={{ marginY: "20px" }} />
        {/* <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={3} xl={3}></Grid>
          <Grid xl={3} />
          <Grid item xs={12} sm={4} md={2} xl={1}></Grid>
          <Grid item xs={12} sm={4} md={2} xl={1}></Grid>
          <Grid item xs={12} sm={4} md={4} xl={4}></Grid>
        </Grid> */}
        <Grid item xs={12} sm={12}>
          <Tabs
            value={zSkuEnrollmentTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Add an SKU" />
            <Tab label="Modify" />
            <Tab label="Delete" />
          </Tabs>
          <Divider sx={{ marginY: "20px" }} />
          {(zSkuEnrollmentTab === 0 ||
            zSkuEnrollmentTab === 1 ||
            zSkuEnrollmentTab === 2) && <AddEditSku />}
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default SkuEnrollmentPage;
