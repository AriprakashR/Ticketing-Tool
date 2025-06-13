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
  Autocomplete,
} from "@mui/material";
import { useState, useEffect } from "react";
import { getCustomerDetailsList } from "../../api/customer-service";
import { getProductDetailsList } from "../../api/product-service";

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
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);

  const fetchCustomerList = async () => {
    try {
      const response = await getCustomerDetailsList();
      if (response?.data?.data) {
        setSelectedCustomer(response.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchProductList = async () => {
    try {
      const response = await getProductDetailsList();
      if (response?.data?.data) {
        setSelectedProduct(response.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomerList();
    fetchProductList();
  }, []);

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
          Machine Form
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 3 }}>
              <Autocomplete
                fullWidth
                options={selectedCustomer}
                getOptionLabel={(option) => option.custName || ""}
                onChange={(event, value) =>
                  setFormData((prev) => ({
                    ...prev,
                    custId: value ? value.cusId : "",
                  }))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    labelId="customer-select-label"
                    name="custId"
                    label="Customer"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }}>
              <Autocomplete
                fullWidth
                options={selectedProduct}
                getOptionLabel={(option) => option.prdName || ""}
                onChange={(event, value) =>
                  setFormData((prev) => ({
                    ...prev,
                    prdId: value ? value.prdId : "",
                  }))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Product"
                    labelId="product-select-label"
                    name="prdId"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }}>
              <TextField
                name="mcnSno"
                label="Serial No"
                fullWidth
                value={formData.mcnSno}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }}>
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
              <TextField
                name="wrntyEndDate"
                label="Warranty End Date"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
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
