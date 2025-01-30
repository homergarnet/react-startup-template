import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
} from "@mui/material";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setError("Both fields are required");
      return;
    }
    setError("");
    alert("Login Successful!");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{ padding: 3, marginTop: 8, textAlign: "center" }}
      >
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <Box component="form" noValidate>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ marginTop: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
