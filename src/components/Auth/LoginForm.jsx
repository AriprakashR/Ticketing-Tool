import { Box, Button, TextField, Typography, InputAdornment, IconButton, useTheme } from "@mui/material";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { postEmployeeLogin } from "../../api/auth-service";
import { toast } from "../../utils/toastService";

const LoginForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const iconColor = theme.palette.mode === "dark" ? "#919EAB" : "#637381";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault(); // prevent focus loss
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postEmployeeLogin(formData);
      if (response?.access_token) {
        document.cookie = `token1=${encodeURIComponent(response.access_token)}; path=/;`;
        toast.success("Login successful");
        navigate("/dashboard");
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    document.cookie = "token1=";
  }, []);

  return (
    <Box display="flex" minHeight="100vh">
      <Box
        sx={{
          width: {
            md: 480,
          },
          bgcolor: theme.palette.mode === "dark" ? "#1D242B" : "#FAFAFA",
          paddingTop: "72px",
          paddingBottom: "24px",
          paddingX: "24px",
          display: {
            xs: "none",
            md: "flex",
          },
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: {
            md: `calc(8 * var(--spacing))`, // your media query equivalent
          },
        }}
      >
        <Typography variant="h3" fontWeight={700} fontSize={30} align="center" gutterBottom>
          Hi, Welcome back
        </Typography>
        <Typography variant="body1" color="#919EAB" align="center" gutterBottom>
          Manage and Resolve Support Tickets Seamlessly.
        </Typography>
        <Box
          component="img"
          src="/src/assets/login-illustration.png" // Replace with your image path
          alt="Login Illustration"
          sx={{ width: "100%", maxWidth: 400, mt: 4 }}
        />
      </Box>

      <Box display="flex" justifyContent="center" flexGrow={1} alignItems="center" p={4}>
        <Box maxWidth={440} width="100%">
          <Box>
            <Typography variant="h4" fontWeight={700} fontSize={30} gutterBottom>
              Login
            </Typography>
            <Typography variant="body2" color="#919EAB" gutterBottom>
              Please log in with your credentials to access the Ticketing System.
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="User ID"
              name="username"
              margin="normal"
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                      <Icon
                        icon={showPassword ? "solar:eye-bold" : "solar:eye-closed-bold"}
                        color={iconColor}
                        fontSize={20}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button fullWidth variant="contained" type="submit" sx={{ mt: 4, p: 1.5, fontWeight: 700 }}>
              Login now
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
