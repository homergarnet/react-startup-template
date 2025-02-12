import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface ChildProps {
  redirectTo?: string;
  totalNumber: number;
  textValue: string;
  textBgColor: string;
  title: string;
}

const NumberWithTextSub: React.FC<ChildProps> = ({
  redirectTo,
  totalNumber,
  textValue,
  textBgColor,
  title,
}) => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Card
        onClick={() => {
          navigate(redirectTo || "");
        }}
        sx={{
          width: 175,
          height: 175,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 2,
          boxShadow: 1, // Light shadow
          backgroundColor: "white", // White background
          cursor: "pointer",
        }}
      >
        <CardContent sx={{ textAlign: "center", p: 2 }}>
          {/* Number in blue */}
          <Typography
            variant="h3"
            component="div"
            sx={{
              fontWeight: "bold",
              color: "blue", // Light blue for the number
            }}
          >
            {totalNumber}
            {textValue ? textValue : ""}
          </Typography>
          {/* Text in dark blue */}
        </CardContent>
        <CardContent
          sx={{ width: "100%", justifyContent: "center", bgcolor: textBgColor }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              marginTop: 1,
              color: "white", // Dark blue for the text below
              textAlign: "center",
            }}
          >
            {title}
          </Typography>
        </CardContent>
      </Card>
      <Typography
        variant="h5"
        component="div"
        sx={{
          fontWeight: "bold",
          color: "darkBlue", // Light blue for the number
        }}
      >
        Absent: 0
      </Typography>
      <Typography
        variant="h5"
        component="div"
        sx={{
          fontWeight: "bold",
          color: "darkBlue", // Light blue for the number
        }}
      >
        Vacancy: 0
      </Typography>
    </React.Fragment>
  );
};

export default NumberWithTextSub;
