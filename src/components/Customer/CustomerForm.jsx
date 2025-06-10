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
  });
  const { showToast } = useToast();
  const [isSameAsBilling, setIsSameAsBilling] = useState(false);
  const [billingCityOptions, setBillingCityOptions] = useState(["Select City"]);
  const [shippingCityOptions, setShippingCityOptions] = useState([
    "Select City",
  ]);

  const fetchPincodeDetails = async (pincode, type) => {
    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = await response.json();

      console.log(data[0].PostOffice);

      if (data && data[0].Status === "Success") {
        const postOffices = data[0].PostOffice;
        const cityList = postOffices.map((office) => office.Name);
        const districtList = postOffices.map((office) => office.District);
        const uniqueCities = [...new Set([...cityList, ...districtList])];

        if (type === "billing") {
          setBillingCityOptions(uniqueCities);
          setFormData((prev) => ({
            ...prev,
            cusBState: postOffices[0].State,
            cusBCity: postOffices[0].District,
          }));
        } else {
          setShippingCityOptions(uniqueCities);
          setFormData((prev) => ({
            ...prev,
            cusSState: postOffices[0].State,
            cusSCity: postOffices[0].District,
          }));
        }
      } else {
        showToast("Invalid Pincode. Please enter a valid one.");
        if (type === "billing") {
          setBillingCityOptions(["Select City"]);
          setFormData((prev) => ({
            ...prev,
            cusBState: "",
            cusBCity: "",
          }));
        } else {
          setShippingCityOptions(["Select City"]);
          setFormData((prev) => ({
            ...prev,
            cusSState: "",
            cusSCity: "",
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching pincode details:", error);
      showToast("Failed to fetch pincode details.");
      if (type === "billing") {
        setBillingCityOptions(["Select City"]);
      } else {
        setShippingCityOptions(["Select City"]);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cusBPcode" && value.length === 6) {
      fetchPincodeDetails(value, "billing");
    }
    if (name === "cusSPcode" && value.length === 6) {
      fetchPincodeDetails(value, "shipping");
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (isSameAsBilling && name.startsWith("cusB")) {
      const shippingField = name.replace("cusB", "cusS");
      setFormData((prevData) => ({
        ...prevData,
        [shippingField]: value,
      }));
    }
  };

  const handleCheckbox = (e) => {
    const checked = e.target.checked;
    setIsSameAsBilling(checked);

    if (checked) {
      setFormData((prevData) => ({
        ...prevData,
        cusSAdd1: prevData.cusBAdd1,
        cusSAdd2: prevData.cusBAdd2,
        cusSPcode: prevData.cusBPcode,
        cusSState: prevData.cusBState,
        cusSCity: prevData.cusBCity,
      }));

      setShippingCityOptions(billingCityOptions);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        cusSAdd1: "",
        cusSAdd2: "",
        cusSPcode: "",
        cusSState: "",
        cusSCity: "",
      }));
      setShippingCityOptions(["Select City"]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postCustomerDetails(formData);
      if (response?.status === "OK") {
        showToast("Customer details added successfully", "success");
        console.log("Customer Details Submission Response:", response.msg);
      } else {
        console.log("Submit failed response:", response);
      }
    } catch (error) {
      console.log("Submission Error:", error);
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
                  {billingCityOptions.length > 0 &&
                    billingCityOptions?.map((city, index) => (
                      <MenuItem key={index} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="sameAsBilling"
                    checked={isSameAsBilling}
                    onChange={handleCheckbox}
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
                disabled={isSameAsBilling}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                name="cusSAdd2"
                label="Address Line 2"
                fullWidth
                value={formData.cusSAdd2}
                onChange={handleChange}
                disabled={isSameAsBilling}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="cusSPcode"
                label="Pincode"
                fullWidth
                value={formData.cusSPcode}
                onChange={handleChange}
                disabled={isSameAsBilling}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="cusSState"
                label="State"
                fullWidth
                value={formData.cusSState}
                onChange={handleChange}
                disabled={isSameAsBilling}
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
                  disabled={isSameAsBilling}
                >
                  {shippingCityOptions.length > 0 &&
                    shippingCityOptions?.map((city, index) => (
                      <MenuItem key={index} value={city}>
                        {city}
                      </MenuItem>
                    ))}
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
