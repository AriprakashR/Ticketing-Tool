import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useToast } from "../../context/ToastContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", formData);

    const validCredentials = {
      userId: "EMP001",
      password: "Admin@123",
    };

    if (
      formData.userId === validCredentials.userId &&
      formData.password === validCredentials.password
    ) {
      showToast("Successfully logged in", "success");
      navigate("/dashboard");
    } else {
      showToast("Incorrect User ID or Password", "error");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box maxWidth={420}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="User ID"
            name="userId"
            margin="normal"
            value={formData.userId}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 2, p: 1.5 }}
          >
            Sign In
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;
