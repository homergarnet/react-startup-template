import React, { useCallback, useEffect, useState } from "react";
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
import { Bounce, toast } from "react-toastify";

const SkuEnrollmentPage: React.FC = () => {
  const { debouncedSkuSearchOnChange } = useSkuEnrollmentSearch("");
  const {
    zSkuEnrollmentTab,
    zSetSkuEnrollmentTab,
    zSkuAddEditTitle,
    zSetSkuAddEditTitle,
    clearSkuEnrollmentAEData,
    zSetSkuMasterList,
    zSetSkuSearchText,
    zIsExistInUser,
    zSetIsExistInUser,
  } = useSkuEnrollmentContext();

  const [isAllowSearch, setIsAllowSearch] = useState(false);

  const handleSearch = useCallback(() => {
    setIsAllowSearch(true);
  }, [setIsAllowSearch]);

  useEffect(() => {
    zSetSkuEnrollmentTab(0);
    zSetSkuAddEditTitle(ADD_SKU);
    clearSkuEnrollmentAEData();
    zSetSkuMasterList([]);
    zSetSkuSearchText("");
    zSetSkuAddEditTitle(ADD_SKU);
    // getAllBuyer();
  }, []);

  //for toastr if existing
  useEffect(() => {
    if (zIsExistInUser === true && zSkuAddEditTitle === ADD_SKU) {
      toast.error("This SKU is already enrolled.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      zSetIsExistInUser(false);
    }
  }, [zIsExistInUser]);

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
          SKU Enrollment
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
          <AddEditSku
            handleSearch={handleSearch}
            isAllowSearch={isAllowSearch}
          />
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default SkuEnrollmentPage;
