import { Typography } from "@mui/material";
import React from "react";
import EnrollmentPeopleTab from "./components/EnrollmentPeopleTab";

const EnrollmentPeoplePage = () => {
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
        Enrollment - People
      </Typography>
      <EnrollmentPeopleTab />
    </React.Fragment>
  );
};

export default EnrollmentPeoplePage;
