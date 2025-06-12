import { Grid, Typography } from "@mui/material";
import React from "react";
import DashboardTableList from "../SystemGenerated/Components/DashboardTableList";
import { WORKSHEET_STATUS } from "../../../constants/constants";

const ApprovedVendorPage = () => {
  return (
    <>
      <Grid container spacing={2} sx={{ mt: 3, mb: 3, ml: 2 }}>
        <Grid item xs={6} sm={6} md={3} xl={3}>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: "bold",
              color: "darkblue", // Light blue for the number
            }}
          >
            Approved (Vendor)
          </Typography>
        </Grid>
      </Grid>
      <DashboardTableList
        tableHeaderArr={[
          "SkuNumber",
          "ItemDescription",
          "FreightTerms",
          "SkuCount",
          "Ordered",
          "PoNumber",
          "VendorName",
          "UpdatedETA",
        ]}
        isView={true}
        visibleWorksheetStatus={WORKSHEET_STATUS[0]}
      />
    </>
  );
};

export default ApprovedVendorPage;
