import { Grid, Typography } from "@mui/material";
import React from "react";
import NumberWithText from "./NumberWithText";
import NumberWithTextSub from "./NumberWithTextSub";

const HomePageCard = () => {
  return (
    <>
      <Grid container spacing={2} sx={{ mt: 3, mb: 3, ml: 2 }}>
        <Grid item xs={6} sm={6} md={3} xl={3}>
          <NumberWithText
            redirectTo=""
            totalNumber={100}
            textValue=""
            textBgColor="blue"
            title="Active Employees"
          />
        </Grid>

        <Grid item xs={6} sm={6} md={3} xl={3}>
          <NumberWithText
            redirectTo=""
            totalNumber={50}
            textValue="%"
            textBgColor="blue"
            title="Attendance Rate"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3} xl={3}>
          <NumberWithText
            redirectTo=""
            totalNumber={50}
            textValue="%"
            textBgColor="blue"
            title="Absenteeism Rate"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3} xl={3}>
          <NumberWithText
            redirectTo=""
            totalNumber={20}
            textValue=""
            textBgColor="blue"
            title="Vacancies"
          />
        </Grid>
      </Grid>
      <Typography variant="h5">Inbound</Typography>
      <Grid container spacing={2} sx={{ mt: 3, mb: 3, ml: 2 }}>
        <Grid item xs={6} sm={6} md={3} xl={3}>
          <NumberWithTextSub
            redirectTo=""
            totalNumber={12}
            textValue=""
            textBgColor="purple"
            title="Purple"
          />
        </Grid>

        <Grid item xs={6} sm={6} md={3} xl={3}>
          <NumberWithTextSub
            redirectTo=""
            totalNumber={10}
            textValue=""
            textBgColor="red"
            title="Red"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3} xl={3}>
          <NumberWithTextSub
            redirectTo="/order-analyst/pending-gatepass"
            totalNumber={11}
            textValue=""
            textBgColor="yellow"
            title="Yellow"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3} xl={3}>
          <NumberWithTextSub
            redirectTo="/order-analyst/with-gatepass"
            totalNumber={12}
            textValue=""
            textBgColor="green"
            title="Green"
          />
        </Grid>
      </Grid>
      <Typography variant="h5">Outbound</Typography>
      <Grid container spacing={2} sx={{ mt: 3, mb: 3, ml: 2 }}>
        <Grid item xs={6} sm={6} md={3} xl={3}>
          <NumberWithTextSub
            redirectTo=""
            totalNumber={15}
            textValue=""
            textBgColor="orange"
            title="Orange"
          />
        </Grid>

        <Grid item xs={6} sm={6} md={3} xl={3}>
          <NumberWithTextSub
            redirectTo=""
            totalNumber={14}
            textValue=""
            textBgColor="pink"
            title="Pink"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3} xl={3}>
          <NumberWithTextSub
            redirectTo="/order-analyst/pending-gatepass"
            totalNumber={15}
            textValue=""
            textBgColor="lime"
            title="Lime"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3} xl={3}>
          <NumberWithTextSub
            redirectTo="/order-analyst/with-gatepass"
            totalNumber={8}
            textValue=""
            textBgColor="black"
            title="Black"
          />
        </Grid>
      </Grid>
      <Typography variant="h5">Agency</Typography>
      <Grid container spacing={2} sx={{ mt: 3, mb: 3, ml: 2 }}>
        <Grid item xs={6} sm={6} md={3} xl={3}>
          <NumberWithText
            redirectTo=""
            totalNumber={90}
            textValue="%"
            textBgColor="blue"
            title="Manscout"
          />
        </Grid>

        <Grid item xs={6} sm={6} md={3} xl={3}>
          <NumberWithText
            redirectTo=""
            totalNumber={100}
            textValue="%"
            textBgColor="blue"
            title="Dynamics"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3} xl={3}>
          <NumberWithText
            redirectTo="/order-analyst/pending-gatepass"
            totalNumber={40}
            textValue="%"
            textBgColor="blue"
            title="ATSI"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3} xl={3}>
          <NumberWithText
            redirectTo="/order-analyst/with-gatepass"
            totalNumber={80}
            textValue="%"
            textBgColor="blue"
            title="Nuebe"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default HomePageCard;
