import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ErrorOutline } from "@mui/icons-material";
const Page404 = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Redirect to the home page
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <ErrorOutline color="error" sx={{ fontSize: 80 }} />
        <Typography variant="h3" component="h1" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" color="textSecondary">
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoHome}
          sx={{
            mt: 3,
            textTransform: "none",
            px: 4,
            py: 1.5,
            fontSize: "1rem",
          }}
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default Page404;
