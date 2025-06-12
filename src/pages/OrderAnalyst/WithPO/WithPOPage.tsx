import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { CustomTableSearchField } from "../../../Components/ReusableComponents/TableComponents/StyledTableSearchBar";
import useHomeContext from "../../../store/Home/useHomeContext";
import WithPOTblList from "./Components/WithPOTblList";

const WithPOPage = () => {
  const { zSetSkuSearchText } = useHomeContext();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents form submission if inside a form
      console.log("event: ", (event.target as HTMLInputElement).value);
      zSetSkuSearchText((event.target as HTMLInputElement).value);
      // onSearch(zOrderFormSearch);
    }
  };

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
              With PO
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
          <Grid item xs={6} sm={6} md={3} xl={3}></Grid>
          <Grid item xs={11.6} sm={11.6} md={11.6} xl={11.6}>
            <WithPOTblList isView={false} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default WithPOPage;
