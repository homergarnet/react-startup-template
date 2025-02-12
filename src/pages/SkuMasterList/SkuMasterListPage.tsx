import React, { useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Divider,
  InputAdornment,
  Tabs,
  Tab,
} from "@mui/material";
import useSkuEnrollmentSearch from "./hooks/useSkuEnrollmentSearch";
import useSkuMasterListContext from "../../../store/OrderAnalyst/SkuMasterList/useSkuMasterListContext";
import { Search as SearchIcon } from "@mui/icons-material/";
import SkuEnrollmentTableList from "./Components/SkuEnrollmentTableList";

const SkuMasterListPage = () => {
  const { debouncedSkuSearchOnChange } = useSkuEnrollmentSearch("");
  const { zSkuEnrollmentTab, zSetSkuEnrollmentTab } = useSkuMasterListContext();

  useEffect(() => {}, []);

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: number
  ): void => {
    zSetSkuEnrollmentTab(newValue);
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
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={3} xl={3}>
            <TextField
              onChange={debouncedSkuSearchOnChange}
              placeholder="Search"
              size="small"
              fullWidth
              InputProps={{
                sx: {
                  marginLeft: 0.5,
                  borderRadius: "20px",
                  backgroundColor: "#EEEEEE",
                  color: "#1C2C5A",
                  "& fieldset": { border: "none" },
                  boxShadow:
                    "inset 1px 1px 1px -3px rgba(0,0,0,0.1), inset 1px 1px 8px 0px rgba(0,0,0,0.3)",
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              // onChange={}
              autoFocus
            />
          </Grid>
          <Grid xl={3} />
          <Grid item xs={12} sm={4} md={2} xl={1}></Grid>
          <Grid item xs={12} sm={4} md={2} xl={1}></Grid>
          <Grid item xs={12} sm={4} md={4} xl={4}>
            {/* <StyledButton
              onClick={() => handleOpenClose(ADD_SKU)}
              sx={{
                backgroundColor: "#4761AD",
                height: "40px",
                width: "100%",
                borderRadius: "99px",
                color: "#FFFFFF",
                marginLeft: 0.5,
                "&:hover": {
                  backgroundColor: "#20346E",
                  color: "#FFFFFF",
                },
              }}
            >
              <AddIcon /> {ADD_SKU}
            </StyledButton> */}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Tabs
            value={zSkuEnrollmentTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="All Items" />
            <Tab label="Grouped by Buyer" />
            <Tab label="Grouped by Vendor" />
          </Tabs>
          <Divider sx={{ marginY: "20px" }} />
          <SkuEnrollmentTableList isView={true} />
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default SkuMasterListPage;
