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
import { getCustomerDetailsList, getSpecficCustomerDetails } from "../../api/customer-service";
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
    prdId: "",
    custId: "",
    custBillAddId: "",
    custShipAddId: "",
  });

  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const [selectedCustomerBillingAddress, setSelectedCustomerBillingAddress] = useState({});
  const [selectedCustomerShippingAddress, setSelectedCustomerShippingAddress] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [warrantyEndDate, setWarrantyEndDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customerRes, productRes] = await Promise.all([getCustomerDetailsList(), getProductDetailsList()]);
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
      endDate.setFullYear(startDate.getFullYear() + Number(formData.wrntyPeriod));
      setWarrantyEndDate(endDate);
    } else {
      setWarrantyEndDate(null);
    }
  }, [formData.wrntyStartDate, formData.wrntyPeriod]);

  const handleCustomerSelection = async (selectedCust) => {
    try {
      if (!selectedCust?.custId) return;

      const response = await getSpecficCustomerDetails(selectedCust.custId);
      const billingAddress = response?.data?.customerBillingAddress || {};
      const shippingAddress = response?.data?.customerShippingAddress || [];

      setFormData((prevData) => ({
        ...prevData,
        custId: selectedCust.custId.toString(),
        custBillAddId: billingAddress.custBillAddId || "",
        custShipAddId: shippingAddress.custShipAddId || "",
      }));

      setSelectedCustomerBillingAddress(billingAddress);
      setSelectedCustomerShippingAddress(shippingAddress);
    } catch (error) {
      console.error("Failed to fetch customer details", error);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === "custId") {
      const selectedCust = selectedCustomer.find((customer) => customer?.custId?.toString() === value);
      if (selectedCust) {
        setFormData((prevData) => ({ ...prevData, custId: value }));
        await handleCustomerSelection(selectedCust);
      }
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
  };

  return (
    <Card sx={{ maxWidth: 1000, mx: "auto", mt: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h6" mb={4}>
          Machine Form
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              {/* Customer Selector */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <Autocomplete
                  fullWidth
                  options={selectedCustomer}
                  getOptionLabel={(option) => option?.custName || ""}
                  onChange={(event, value) => {
                    if (value) handleCustomerSelection(value);
                    else {
                      setFormData((prev) => ({ ...prev, custId: "" }));
                      setSelectedCustomerBillingAddress({});
                      setSelectedCustomerShippingAddress([]);
                    }
                  }}
                  renderInput={(params) => <TextField {...params} label="Customer" variant="outlined" />}
                />
              </Grid>

              {/* Billing Address */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  name="custBillAddId"
                  label="Billing Address"
                  fullWidth
                  value={
                    selectedCustomerBillingAddress?.custBillAddId
                      ? `${selectedCustomerBillingAddress?.custBAdd1 || ""}, ${
                          selectedCustomerBillingAddress?.custBAdd2 || ""
                        }, ${selectedCustomerBillingAddress?.custBCity || ""}, ${
                          selectedCustomerBillingAddress?.custBState || ""
                        } - ${selectedCustomerBillingAddress?.custBPcode || ""}`
                      : ""
                  }
                  inputProps={{ readOnly: true }}
                />
              </Grid>

              {/* Shipping Address */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <FormControl fullWidth>
                  <InputLabel id="shipping-address-select-label">Shipping Address</InputLabel>
                  <Select
                    labelId="shipping-address-select-label"
                    name="custShipAddId"
                    value={formData.custShipAddId}
                    label="Shipping Address"
                    onChange={handleChange}
                  >
                    {selectedCustomerShippingAddress.map((addr) => (
                      <MenuItem key={addr.custShipAddId} value={addr.custShipAddId}>
                        {`${addr.custSAdd1}, ${addr.custSAdd2}, ${addr.custSCity}, ${addr.custSState} - ${addr.custSPcode}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Product Selector */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <Autocomplete
                  fullWidth
                  options={selectedProduct}
                  getOptionLabel={(option) => option?.prdName || ""}
                  onChange={(event, value) => setFormData((prev) => ({ ...prev, prdId: value?.prdId || "" }))}
                  renderOption={(props, option) => (
                    <li {...props} key={option.prdId}>
                      <Box display="flex" flexDirection="column" alignItems="flex-start" width="100%">
                        <Box display="flex" width="100%">
                          <Typography variant="subtitle1">{option.prdName}</Typography>
                          <Typography variant="caption" color="text.secondary" ml={1} mt={0.7}>
                            Model: {option.prdModel}
                          </Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary" noWrap>
                          {option.prdDescription}
                        </Typography>
                      </Box>
                    </li>
                  )}
                  renderInput={(params) => <TextField {...params} label="Product" variant="outlined" />}
                />
              </Grid>

              {/* Serial No */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField name="mcnSno" label="Serial No" fullWidth value={formData.mcnSno} onChange={handleChange} />
              </Grid>

              {/* Installation Date */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <DatePicker
                  label="Installation Date"
                  value={formData.instlDate}
                  onChange={(newValue) => setFormData((prev) => ({ ...prev, instlDate: newValue }))}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  sx={{ width: "300px" }}
                />
              </Grid>

              {/* Warranty Period */}
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

              {/* Warranty Start */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <DatePicker
                  label="Warranty Start Date"
                  value={formData.wrntyStartDate}
                  onChange={(newValue) => setFormData((prev) => ({ ...prev, wrntyStartDate: newValue }))}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  sx={{ width: "300px" }}
                />
              </Grid>

              {/* Warranty End */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <DatePicker
                  label="Warranty End Date"
                  value={warrantyEndDate}
                  readOnly
                  onChange={() => {}}
                  renderInput={(params) => <TextField {...params} fullWidth InputProps={{ readOnly: true }} />}
                  sx={{ width: "300px" }}
                />
              </Grid>

              {/* Machine Status */}
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

              {/* AMC Dates */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <DatePicker
                  label="AMC Start Date"
                  value={formData.amcStartDate}
                  onChange={(newValue) => setFormData((prev) => ({ ...prev, amcStartDate: newValue }))}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  sx={{ width: "300px" }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <DatePicker
                  label="AMC End Date"
                  value={formData.amcEndDate}
                  onChange={(newValue) => setFormData((prev) => ({ ...prev, amcEndDate: newValue }))}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  sx={{ width: "300px" }}
                />
              </Grid>

              {/* Submit Button */}
              <Grid size={{ xs: 12 }} display="flex" justifyContent={{ xs: "center", sm: "flex-end" }}>
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
