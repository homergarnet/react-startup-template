import React from "react";
import DashboardTableList from "./Components/DashboardTableList";
import { Box, Grid, Typography } from "@mui/material";
import { WORKSHEET_STATUS } from "../../../constants/constants";
import { CustomTableSearchField } from "../../../Components/ReusableComponents/TableComponents/StyledTableSearchBar";

const SystemGeneratedPage = () => {
  return (
    <>
      <Box
        sx={{
          marginTop: "16px",
          marginLeft: "20px",
          marginRight: "20px",
          flexGrow: 1,
        }}
      >
        <Grid container spacing={2} sx={{ mb: 3, ml: 2 }}>
          <Grid item xs={6} sm={6} md={3} xl={3}></Grid>
          <Grid item xs={6} sm={6} md={3} xl={3}></Grid>
          <Grid item xs={6} sm={6} md={3} xl={3}></Grid>
          <Grid item xs={6} sm={6} md={3} xl={3}>
            {/* <Typography
              variant="subtitle1"
              sx={{
                color: (theme) => theme.palette.text.primary,
              }}
            >
              Last Sync Date: June 19, 2024
            </Typography> */}
          </Grid>
          <Grid item xs={11.6} sm={11.6} md={11.6} xl={11.6}>
            {/* <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <h2
                  className="text-xl font-semibold"
                  style={{ color: theme.palette.text.primary }}
                >
                  📊 Dashboard Overview
                </h2>
              </AccordionSummary>
              <AccordionDetails>
                <HomePageHeader />
                <HomePageCard />
              </AccordionDetails>
            </Accordion> */}
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 3, mb: 3, ml: 2 }}>
          <Grid item xs={6} sm={6} md={3} xl={3}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: "bold",
                color: (theme) => theme.palette.text.primary,
                mb: 2,
              }}
            >
              System Generated Order
            </Typography>
            <CustomTableSearchField
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              // onChange={}
              autoFocus
              size="small"
              // onChange={debouncedSkuSearchOnChange}
              label="Search SKU"
              InputProps={
                {
                  // endAdornment: (
                  //   <InputAdornment position="end">
                  //     <IconButton onClick={handleSearch} edge="end">
                  //       <SearchIcon />
                  //     </IconButton>
                  //   </InputAdornment>
                  // ),
                }
              }
            />
          </Grid>

          <Grid item xs={6} sm={6} md={3} xl={3}></Grid>
          <Grid item xs={6} sm={6} md={3} xl={3}></Grid>
          <Grid item xs={6} sm={6} md={3} xl={3}>
            {/* {<DaySelector onSelectDay={handleSelectPOday} />} */}
          </Grid>
          <Grid item xs={11.6} sm={11.6} md={11.6} xl={11.6}>
            <DashboardTableList
              tableHeaderArr={[
                "SkuNumber",
                "ItemDescription",
                "FreightTerms",
                "SkuCount",
                "Moq",
                "SuggestedOrder",
                "CurrentWeekSupply",
                "ProjectedWeekSupply",
                "NextPoArrival",
              ]}
              isView={false}
              visibleWorksheetStatus={WORKSHEET_STATUS[0]}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SystemGeneratedPage;
