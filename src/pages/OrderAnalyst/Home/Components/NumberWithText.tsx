import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface ChildProps {
  redirectTo?: string;
  totalNumber: number;
  title: string;
}

const NumberWithText: React.FC<ChildProps> = ({
  redirectTo,
  totalNumber,
  title,
}) => {
  const index = title.indexOf("(");
  const beforeParen = index !== -1 ? title.substring(0, index).trim() : title;
  const afterParen = index !== -1 ? title.substring(index).trim() : "";
  // console.log("Before:", beforeParen); // "System Generated"
  // console.log("After:", afterParen); // "(SGO)"

  const navigate = useNavigate();
  return (
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
          {totalNumber > -1 ? totalNumber : "-"}
        </Typography>
        {/* Text in dark blue */}
        <Typography
          variant="subtitle1"
          sx={{
            marginTop: 1,
            color: (theme) => theme.palette.text.primary,
          }}
        >
          {beforeParen}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            marginTop: 1,
            color: (theme) => theme.palette.text.primary,
          }}
        >
          {afterParen}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NumberWithText;
