import {
  Box,
  TextField,
  Grid,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { useState } from "react";

const CompanyAddressForm = () => {
  const [formData, setFormData] = useState({
    compBAdd1: "",
    compBAdd2: "",
    compBPcode: "",
    compBState: "",
    compBCity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
  };

  return (
    <Card sx={{ maxWidth: 1000, mx: "auto", mt: 4, padding: 2 }}>
      <CardContent>
        <Typography variant="h6" mb={4}>
          Company Address Form
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item size={8}>
              <TextField
                name="compBAdd1"
                label="Address Line 1"
                fullWidth
                value={formData.compBAdd1}
                onChange={handleChange}
              />
            </Grid>
            <Grid item size={8}>
              <TextField
                name="compBAdd2"
                label="Address Line 2"
                fullWidth
                value={formData.compBAdd2}
                onChange={handleChange}
              />
            </Grid>
            <Grid item size={8}>
              <TextField
                name="compBPcode"
                label="Pincode"
                fullWidth
                value={formData.compBPcode}
                onChange={handleChange}
              />
            </Grid>
            <Grid item size={8}>
              <TextField
                name="compBState"
                label="State"
                fullWidth
                value={formData.compBState}
                onChange={handleChange}
              />
            </Grid>
            <Grid item size={8}>
              <TextField
                name="compBCity"
                label="City"
                fullWidth
                value={formData.compBCity}
                onChange={handleChange}
              />
            </Grid>
            <Grid item size={8}>
              <Button type="submit" variant="contained" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CompanyAddressForm;
