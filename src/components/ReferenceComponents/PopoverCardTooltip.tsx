import React, { useState } from "react";
import { Tooltip, Card, CardContent, Typography, Box } from "@mui/material";

const PopoverCardTooltip: React.FC = () => {
  const [open, setOpen] = useState(false);
  const textColor = Math.random() > 0.5 ? "red" : "green"; // Randomly choose red or green for text

  return (
    <Tooltip
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      title={
        <Card sx={{ minWidth: 200, p: 1 }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: textColor }}>
              Tooltip Card
            </Typography>
            <Typography variant="body2" sx={{ color: textColor }}>
              This is a card inside a tooltip.
            </Typography>
          </CardContent>
        </Card>
      }
      arrow
    >
      <Box
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        sx={{
          display: "inline-block",
          p: 2,
          bgcolor: "primary.main",
          color: textColor, // Apply red or green text
          borderRadius: 1,
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Hover Me
      </Box>
    </Tooltip>
  );
};

export default PopoverCardTooltip;
