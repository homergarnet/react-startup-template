import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useSkuMasterListContext from "../../../../store/OrderAnalyst/SkuMasterList/useSkuMasterListContext";
import useSkuEnrollmentSearch from "../../SkuMasterList/hooks/useSkuEnrollmentSearch";
import {
  Box,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material/";
import WorkSheetPODetailsList from "./WorkSheetPODetailsList";
import useWSPODetailsSearch from "../hooks/useWSPODetailsSearch";
import useOrderFormContext from "../../../../store/OrderAnalyst/OrderForm/useOrderFormContext";

const WorkSheetPODetails = () => {
  const { zVendorName } = useOrderFormContext();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id") || "";
  const poReceivedWeekNo = searchParams.get("po-received-week-no") || "";

  if (!id) {
    // Option 1: Redirect to another route
    navigate("/error-page"); // Replace '/error-page' with the route you want

    // Option 2: Show a message (uncomment if preferred)
    // return <p>No ID provided. Please go back.</p>;
  }
  const { debouncedWSPODSearchOnChange } = useWSPODetailsSearch("");

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
          WorkSheet PO Details
        </Typography>
        <Divider sx={{ marginY: "20px" }} />
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={3} xl={3}>
            <TextField
              onChange={debouncedWSPODSearchOnChange}
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
          <Grid item xs={12} sm={6} md={3} xl={3}>
            <Button
              variant="outlined"
              sx={{ mb: 2 }}
              onClick={() => navigate("/order-analyst/order-form")} // Change "/order-form" to your actual route
            >
              Go back to order form
            </Button>
          </Grid>

          {/* <Grid xl={3} /> */}
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: "14px",
              fontStyle: "italic",
              fontFamily: "Inter, sans-serif",
              fontWeight: "bold",
              color: "primary.main",
              mb: 1,
              mt: 5,
            }}
          >
            Vendor Name: {zVendorName}
          </Typography>

          <Divider sx={{ marginY: "20px" }} />
          <WorkSheetPODetailsList poReceivedWeekNo={poReceivedWeekNo} />
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default WorkSheetPODetails;
