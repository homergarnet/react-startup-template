import { Grid, Typography } from "@mui/material";
import React from "react";
import IconWithText from "./IconWithText";
import StorefrontIcon from "@mui/icons-material/Storefront";
const HomePageHeader = () => {
  return (
    <>
      <Grid container spacing={2} sx={{ mt: 3, mb: 3, ml: 2 }}>
        <Grid item xs={6} sm={6} md={3} xl={3}>
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontWeight: "bold",
              color: (theme) => theme.palette.text.primary,
            }}
          >
            Events
          </Typography>
        </Grid>

        <Grid item xs={6} sm={6} md={3} xl={3}></Grid>

        <Grid item xs={6} sm={6} md={3} xl={3}></Grid>
        <Grid item xs={6} sm={6} md={3} xl={3}></Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 3, mb: 3, ml: 2 }}>
        <Grid item xs={12} sm={12} md={12} xl={12}>
          <IconWithText
            icon={<StorefrontIcon color="primary" />}
            text1="November 1 (Friday) All Saints' Day is a non-working holiday. November 2 (Saturday) All Souls' Day is also non-working holiday."
            text2=""
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} xl={12}>
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontWeight: "bold",
              color: (theme) => theme.palette.text.primary,
            }}
          >
            Scorecard Details
          </Typography>
        </Grid>
        {/* 
        <Grid item xs={6} sm={6} md={3} xl={3}></Grid>

        <Grid item xs={6} sm={6} md={3} xl={3}></Grid>
        <Grid item xs={6} sm={6} md={3} xl={3}></Grid> */}
      </Grid>
    </>
  );
};

export default HomePageHeader;
