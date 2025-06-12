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
import useManagerOrderingContext from "../../../../store/Manager/ManagerOrdering/useManagerOrderingContext";
import { CustomTableSearchField } from "../../../../Components/ReusableComponents/TableComponents/StyledTableSearchBar";
import ManagerOrderingTblList from "./Components/ManagerOrderingTblList";
import useSkuMasterListContext from "../../../../store/OrderAnalyst/SkuMasterList/useSkuMasterListContext";

const ManageOrderingPage = () => {
  const { debouncedSkuSearchOnChange } = useSkuEnrollmentSearch("");
  const { zSetSkuSearchText, zSkuMasterList } = useManagerOrderingContext();

  const { resetZCheckedItemsCache } = useSkuMasterListContext();

  useEffect(() => {
    zSetSkuSearchText("");
    resetZCheckedItemsCache();
  }, []);

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
          Manager Ordering
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
              onChange={debouncedSkuSearchOnChange}
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
          <ManagerOrderingTblList isView={true} data={zSkuMasterList} />
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default ManageOrderingPage;
