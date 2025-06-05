import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useToast } from "../../context/ToastContext";
import { postEmployeeLogin } from "../../api/auth-service";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        userId: formData.userId,
        password: formData.password,
      };

      const response = await postEmployeeLogin(data);

      if (response?.token) {
        document.cookie = `token1=${encodeURIComponent(response.token)}`;
        showToast("Successfully logged in", "success");
        navigate("/dashboard");
      } else {
        showToast("Login failed: Token not received", "error");
      }
    } catch (error) {
      showToast(error, "error");
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
