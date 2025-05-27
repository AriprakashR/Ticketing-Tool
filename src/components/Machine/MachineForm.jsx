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

const MachineForm = () => {
  const [formData, setFormData] = useState({
    mcnSno: "",
    wrntyPeriod: "",
    instlDate: "",
    wrntyStartDate: "",
    amcStartDate: "",
    amcEndDate: "",
    mcnStatucCode: "",
    brMgrEmpId: "",
    regMgrEmpId: "",
    prdId: "",
    custId: "",
    cusBillAddId: "",
    cusShipAddId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
  };

  // Sample data for Customer and Product
  const customerOptions = [
    { id: "C1001", name: "ABC Corp" },
    { id: "C1002", name: "XYZ Ltd" },
    { id: "C1003", name: "Test Company" },
  ];

  const productOptions = [
    { id: "P2001", name: "Machine A" },
    { id: "P2002", name: "Machine B" },
    { id: "P2003", name: "Machine C" },
  ];

  return (
    <Card sx={{ maxWidth: 1000, mx: "auto", mt: 4, padding: 2 }}>
      <CardContent>
        <Typography variant="h6" mb={4}>
          Machine Form
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControl fullWidth>
                <InputLabel id="customer-select-label">Customer</InputLabel>
                <Select
                  labelId="customer-select-label"
                  name="custId"
                  value={formData.custId}
                  label="Customer"
                  onChange={handleChange}
                >
                  {customerOptions.map((cust) => (
                    <MenuItem key={cust.id} value={cust.id}>
                      {cust.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControl fullWidth>
                <InputLabel id="product-select-label">Product</InputLabel>
                <Select
                  labelId="product-select-label"
                  name="prdId"
                  value={formData.prdId}
                  label="Product"
                  onChange={handleChange}
                >
                  {productOptions.map((prod) => (
                    <MenuItem key={prod.id} value={prod.id}>
                      {prod.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                name="mcnSno"
                label="Serial No"
                fullWidth
                value={formData.mcnSno}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                name="instlDate"
                label="Installation Date"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formData.instlDate}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                name="wrntyPeriod"
                label="Warranty Period (years)"
                type="number"
                fullWidth
                value={formData.wrntyPeriod}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                name="wrntyStartDate"
                label="Warranty Start Date"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formData.wrntyStartDate}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControl fullWidth>
                <InputLabel id="mcn-status-label">Machine Status</InputLabel>
                <Select
                  labelId="mcn-status-label"
                  name="mcnStatucCode"
                  value={formData.mcnStatucCode}
                  label="Machine Status"
                  onChange={handleChange}
                >
                  <MenuItem value="70">In Warranty</MenuItem>
                  <MenuItem value="71">Out of Warranty</MenuItem>
                  <MenuItem value="80">In AMC</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                name="amcStartDate"
                label="AMC Start Date"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formData.amcStartDate}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                name="amcEndDate"
                label="AMC End Date"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formData.amcEndDate}
                onChange={handleChange}
              />
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

export default MachineForm;
