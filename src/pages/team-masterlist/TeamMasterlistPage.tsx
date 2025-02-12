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

import { Search as SearchIcon } from "@mui/icons-material/";
import { CustomTableSearchField } from "../../components/common/CustomTableSearchField";
import TeamMasterTblList from "./components/TeamMasterTblList";
import useTeamMasterlistContext from "../../store/team-masterlist/useTeamMasterlistContext";
import useMasterlistSearch from "./hooks/useMasterlistSearch";

const TeamMasterListPage = () => {
  const { debouncedMasterlistSearchOnChange } = useMasterlistSearch("");
  const { zMasterlistTab, zSetMasterlistTab, zSetTeamMasterlistList } =
    useTeamMasterlistContext();

  useEffect(() => {
    zSetTeamMasterlistList([]);
  }, []);

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: number
  ): void => {
    zSetMasterlistTab(newValue);
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
          Team Masterlist
        </Typography>
        <Divider sx={{ marginY: "20px" }} />
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={3} xl={3}>
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
          {/* <Tabs
            value={zMasterlistTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="All Items" />
            <Tab label="Grouped by Team" />
            <Tab label="Grouped by Shift" />
          </Tabs> */}
          <Divider sx={{ marginY: "20px" }} />
          <TeamMasterTblList isView={true} />
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default TeamMasterListPage;
