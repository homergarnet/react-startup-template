import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import DashboardTableList from "../SystemGenerated/Components/DashboardTableList";
import { WORKSHEET_STATUS } from "../../../constants/constants";
import { CustomTableSearchField } from "../../../Components/ReusableComponents/TableComponents/StyledTableSearchBar";
import useHomeContext from "../../../store/Home/useHomeContext";
import useSharedStore from "../../../store/sharedStore";

const ApprovedSAndRPage = () => {
  const { zSkuMap, zSetSkuSearchText, resetZCheckedItemsCache } =
    useHomeContext();

  const { zRoleId } = useSharedStore();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents form submission if inside a form
      console.log("event: ", (event.target as HTMLInputElement).value);
      zSetSkuSearchText((event.target as HTMLInputElement).value);
      // onSearch(zOrderFormSearch);
    }
  };

  useEffect(() => {
    zSetSkuSearchText("");
  }, []);

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
              Approved S&R
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
              onKeyDown={handleKeyDown}
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
                `${zRoleId === "2" ? "IsPOCheckbox" : ""}`,
                "SkuNumber",
                "ItemDescription",
                "FreightTerms",
                "SkuCount",
                "SuggestedOrder",
                "PoNumber",
                "OriginalETA",
              ]}
              isView={true}
              visibleWorksheetStatus={WORKSHEET_STATUS[2]}
              dashboardType="ApprovedSAndR"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ApprovedSAndRPage;
