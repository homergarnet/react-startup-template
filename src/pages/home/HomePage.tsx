import React from "react";
import HomePageCard from "./components/HomePageCard";
import { Typography } from "@mui/material";

const HomePage = () => {
  return (
    <React.Fragment>
      <Typography
        variant="h4"
        component="div"
        sx={{
          fontWeight: "bold",
          color: "darkblue", // Light blue for the number
        }}
        textAlign={"center"}
      >
        My Dashboard
      </Typography>
      <HomePageCard />
    </React.Fragment>
  );
};

export default HomePage;
