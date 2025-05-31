import {
  Box,
  TextField,
  Grid,
  Button,
  Typography,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { postCustomerDetails } from "../../api/customer-service";
import { useToast } from "../../context/ToastContext";

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    custName: "",
    ctcPersName: "",
    ctcPh: "",
    email: "",
    gstNo: "",
    cusBAdd1: "",
    cusBAdd2: "",
    cusBPcode: "",
    cusBState: "",
    cusBCity: "",
    cusSAdd1: "",
    cusSAdd2: "",
    cusSPcode: "",
    cusSState: "",
    cusSCity: "",
    sameAsBilling: false,
  });
  const { showToast } = useToast();

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    if (name === "sameAsBilling") {
      const isChecked = checked;
      setFormData((prev) => ({
        ...prev,
        sameAsBilling: isChecked,
        ...(isChecked && {
          cusSAdd1: prev.cusBAdd1,
          cusSAdd2: prev.cusBAdd2,
          cusSPcode: prev.cusBPcode,
          cusSState: prev.cusBState,
          cusSCity: prev.cusBCity,
        }),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postCustomerDetails(formData);
      console.log("Response:", response);
      if (response?.data?.status === "OK") {
        showToast("Customer details added successfully", "success");
      } else {
        showToast("Failed to submit customer details.", "error");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      showToast("An error occurred while submitting the form.", "error");
    }
  };

  return (
    <Card sx={{ maxWidth: 1000, mx: "auto", mt: 4, padding: 2 }}>
      <CardContent>
        <Typography variant="h6" mb={4}>
          Customer Form
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="custName"
                label="Customer Name"
                fullWidth
                value={formData.custName}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="ctcPersName"
                label="Contact Person Name"
                fullWidth
                value={formData.ctcPersName}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="ctcPh"
                label="Phone"
                fullWidth
                value={formData.ctcPh}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="email"
                label="Email"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                type="email"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="gstNo"
                label="GST Number"
                fullWidth
                value={formData.gstNo}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="subtitle1">Billing Address</Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                name="cusBAdd1"
                label="Address Line 1"
                fullWidth
                value={formData.cusBAdd1}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                name="cusBAdd2"
                label="Address Line 2"
                fullWidth
                value={formData.cusBAdd2}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="cusBPcode"
                label="Pincode"
                fullWidth
                value={formData.cusBPcode}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="cusBState"
                label="State"
                fullWidth
                value={formData.cusBState}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel id="billing-city-select-label">City</InputLabel>
                <Select
                  labelId="billing-city-select-label"
                  name="cusBCity"
                  label="City"
                  value={formData.cusBCity}
                  onChange={handleChange}
                >
                  <MenuItem value="1">Madurai</MenuItem>
                  <MenuItem value="2">Chennai</MenuItem>
                  <MenuItem value="3">Banglore</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="sameAsBilling"
                    checked={formData.sameAsBilling}
                    onChange={handleChange}
                  />
                }
                label="Copy to Shipping Address"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="subtitle1" mt={2}>
                Shipping Address
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                name="cusSAdd1"
                label="Address Line 1"
                fullWidth
                value={formData.cusSAdd1}
                onChange={handleChange}
                disabled={formData.sameAsBilling}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                name="cusSAdd2"
                label="Address Line 2"
                fullWidth
                value={formData.cusSAdd2}
                onChange={handleChange}
                disabled={formData.sameAsBilling}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="cusSPcode"
                label="Pincode"
                fullWidth
                value={formData.cusSPcode}
                onChange={handleChange}
                disabled={formData.sameAsBilling}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="cusSState"
                label="State"
                fullWidth
                value={formData.cusSState}
                onChange={handleChange}
                disabled={formData.sameAsBilling}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel id="shipping-city-select-label">City</InputLabel>
                <Select
                  labelId="shipping-city-select-label"
                  name="cusSCity"
                  label="City"
                  value={formData.cusSCity}
                  onChange={handleChange}
                >
                  <MenuItem value="1">Madurai</MenuItem>
                  <MenuItem value="2">Chennai</MenuItem>
                  <MenuItem value="3">Banglore</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              size={12}
              display="flex"
              justifyContent={{ xs: "center", sm: "flex-end" }}
              mt={2}
            >
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CustomerForm;
