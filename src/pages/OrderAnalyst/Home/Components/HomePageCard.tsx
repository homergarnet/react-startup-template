import { Grid } from "@mui/material";
import React from "react";
import NumberWithText from "./NumberWithText";
import useHomeContext from "../../../../store/Home/useHomeContext";

const HomePageCard = () => {
  const {
    zSystemGeneratedCount,
    zToReviewManagerCount,
    zApprovedCount,
    zWithPOCount,
  } = useHomeContext();
  return (
    <>
      <Grid container spacing={2} sx={{ mt: 3, mb: 3, ml: 5 }}>
        <Grid item xs={6} sm={6} md={3} xl={3}>
          <NumberWithText
            redirectTo="/order-analyst/system-generated"
            totalNumber={zSystemGeneratedCount}
            title="System Generated (SGO)"
          />
        </Grid>

        <Grid item xs={6} sm={6} md={3} xl={3}>
          <NumberWithText
            redirectTo="/order-analyst/manager-approval"
            totalNumber={zToReviewManagerCount}
            title="To Review(Manager's Approval)"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3} xl={3}>
          <NumberWithText
            redirectTo="/order-analyst/approved-s-and-r"
            totalNumber={zApprovedCount}
            title="Approved(S&R)"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3} xl={3}>
          <NumberWithText
            redirectTo="/order-analyst/with-po"
            totalNumber={zWithPOCount}
            title="With PO"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 3, mb: 3, ml: 2 }}>
        <Grid item xs={6} sm={6} md={2.4} xl={2.4}>
          <NumberWithText
            redirectTo="/order-analyst/pending-approval"
            totalNumber={-1}
            title="Pending Approval(Vendor)"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={2.4} xl={2.4}>
          <NumberWithText
            redirectTo="/order-analyst/approved-vendor"
            totalNumber={-1}
            title="Approved(Vendor)"
          />
        </Grid>

        <Grid item xs={6} sm={6} md={2.4} xl={2.4}>
          <NumberWithText
            redirectTo="/order-analyst/on-water"
            totalNumber={-1}
            title="On Water"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={2.4} xl={2.4}>
          <NumberWithText
            redirectTo="/order-analyst/pending-gatepass"
            totalNumber={-1}
            title="Pending Gatepass"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={2.4} xl={2.4}>
          <NumberWithText
            redirectTo="/order-analyst/with-gatepass"
            totalNumber={-1}
            title="With Gatepass"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default HomePageCard;
