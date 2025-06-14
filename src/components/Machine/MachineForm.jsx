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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useState, useEffect } from "react";
import { getCustomerDetailsList } from "../../api/customer-service";
import { getProductDetailsList } from "../../api/product-service";

const MachineForm = () => {
  const [formData, setFormData] = useState({
    mcnSno: "",
    wrntyPeriod: 0,
    instlDate: null,
    wrntyStartDate: null,
    amcStartDate: null,
    amcEndDate: null,
    mcnStatucCode: 0,
    assignBranchId: "",
    assignRegionalId: "",
    prdId: "",
    custId: "",
    cusBillAddId: "",
    cusShipAddId: "",
  });
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [warrantyEndDate, setWarrantyEndDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customerRes, productRes] = await Promise.all([
          getCustomerDetailsList(),
          getProductDetailsList(),
        ]);
        setSelectedCustomer(customerRes?.data?.data || []);
        setSelectedProduct(productRes?.data?.data || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (formData.wrntyStartDate && formData.wrntyPeriod) {
      const startDate = new Date(formData.wrntyStartDate);
      const endDate = new Date(startDate);
      endDate.setFullYear(
        startDate.getFullYear() + Number(formData.wrntyPeriod)
      );
      setWarrantyEndDate(endDate);
    } else {
      setWarrantyEndDate(null);
    }
  }, [formData.wrntyStartDate, formData.wrntyPeriod]);

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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                <DatePicker
                  name="instlDate"
                  label="Installation Date"
                  fullWidth
                  value={formData.instlDate}
                  onChange={(newValue) =>
                    setFormData((prev) => ({ ...prev, instlDate: newValue }))
                  }
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
                <DatePicker
                  name="wrntyStartDate"
                  label="Warranty Start Date"
                  value={formData.wrntyStartDate}
                  onChange={(newValue) =>
                    setFormData((prev) => ({
                      ...prev,
                      wrntyStartDate: newValue,
                    }))
                  }
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  sx={{ width: "300px" }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <DatePicker
                  label="Warranty End Date"
                  value={warrantyEndDate}
                  onChange={() => {}}
                  readOnly
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      InputProps={{
                        ...params.InputProps,
                      }}
                    />
                  )}
                  sx={{ width: "300px" }}
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
                <DatePicker
                  name="amcStartDate"
                  label="AMC Start Date"
                  fullWidth
                  value={formData.amcStartDate}
                  onChange={(newValue) =>
                    setFormData((prev) => ({ ...prev, amcStartDate: newValue }))
                  }
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  sx={{ width: "300px" }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <DatePicker
                  fullWidth
                  name="amcEndDate"
                  label="AMC End Date"
                  value={formData.amcEndDate}
                  onChange={(newValue) =>
                    setFormData((prev) => ({ ...prev, amcEndDate: newValue }))
                  }
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  sx={{ width: "300px" }}
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
        </LocalizationProvider>
      </CardContent>
    </Card>
  );
};

export default MachineForm;
