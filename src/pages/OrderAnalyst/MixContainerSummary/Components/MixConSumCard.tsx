import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import useHomeContext from "../../../../store/Home/useHomeContext";

const MixConSumCard = () => {
  const { zPalletsPerContainer, zCasesPerContainer, zTotalPallets, zMoqUnits } =
    useHomeContext();
  return (
    <Card
      sx={{
        height: { xs: "auto", md: 100 },
        borderRadius: { xs: "10px", md: "25px" },
        boxShadow: 3,
        padding: 2,
        display: "flex",
        alignItems: "center",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          gap: { xs: 1, md: 4 },
          // incharge for making the text block if user shrinks the website
          flexWrap: { xs: "wrap", md: "nowrap" },
          padding: 0,
          "&:last-child": { paddingBottom: 0 },
        }}
      >
        <Typography
          component="span"
          variant="body1"
          sx={{
            // display: { xs: "block", sm: "inline" },
            fontSize: { xs: "1.5rem", sm: "1.25rem", md: "1rem" },
          }}
        >
          Pallets per Container: {zPalletsPerContainer}
        </Typography>
        <Typography
          component="span"
          variant="body1"
          sx={{
            // display: { xs: "block", sm: "inline" },
            fontSize: { xs: "1.5rem", sm: "1.25rem", md: "1rem" },
          }}
        >
          Cases per Container: {zCasesPerContainer}
        </Typography>
        <Typography
          component="span"
          variant="body1"
          sx={{
            display: { xs: "block", sm: "inline" },
            fontSize: { xs: "1.5rem", sm: "1.25rem", md: "1rem" },
          }}
        >
          Total Pallets: {zTotalPallets}
        </Typography>
        <Typography
          component="span"
          variant="body1"
          sx={{
            display: { xs: "block", sm: "inline" },
            fontSize: { xs: "1.5rem", sm: "1.25rem", md: "1rem" },
          }}
        >
          MOQ Units: {zMoqUnits}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MixConSumCard;
