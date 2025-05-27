import {
  Box,
  TextField,
  Grid,
  Button,
  Typography,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    compId: "",
    empDesgId: "",
    empName: "",
    empPhNo: "",
    add1: "",
    add2: "",
    pincode: "",
    city: "",
    state: "",
    empEmail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
  };

  // Sample data for Employee DEsignation
  const designationOptions = [
    { id: "Emp1001", name: "Regional Manager" },
    { id: "Emp1002", name: "Branch Manager" },
    { id: "Emp1003", name: "Admin" },
    { id: "Emp1004", name: "Service Engineer" },
  ];

  return (
    <Card sx={{ maxWidth: 1000, mx: "auto", mt: 4, padding: 2 }}>
      <CardContent>
        <Typography variant="h6" mb={4}>
          Employee Form
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="empName"
                label="Employee Name"
                fullWidth
                value={formData.empName}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="empPhNo"
                label="Phone Number"
                fullWidth
                value={formData.empPhNo}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="empEmail"
                label="Email"
                fullWidth
                value={formData.empEmail}
                onChange={handleChange}
                type="email"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel id="designation-select-label">
                  Designation
                </InputLabel>
                <Select
                  labelId="designation-select-label"
                  name="empDesgId"
                  label="Select Designation"
                  fullWidth
                  value={formData.empDesgId}
                  onChange={handleChange}
                >
                  {designationOptions.map((desgn) => (
                    <MenuItem key={desgn.id} value={desgn.id}>
                      {desgn.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="subtitle1" mt={2}>
                Address Details
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                name="add1"
                label="Address Line 1"
                fullWidth
                value={formData.add1}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                name="add2"
                label="Address Line 2"
                fullWidth
                value={formData.add2}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="pincode"
                label="Pincode"
                fullWidth
                value={formData.pincode}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="state"
                label="State"
                fullWidth
                value={formData.state}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel id="city-select-label">City</InputLabel>
                <Select
                  labelId="city-select-label"
                  name="city"
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

export default EmployeeForm;
