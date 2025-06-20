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
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { postCustomerDetails } from "../../api/customer-service";
import { validateCustomerForm } from "../../utils/validator";
import { toast } from "../../utils/toastService";

const CustomerForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    custName: "",
    ctcPersName: "",
    ctcPh: "",
    email: "",
    gstNo: "",
    custBAdd1: "",
    custBAdd2: "",
    custBPcode: "",
    custBState: "",
    custBCity: "",
    custSAdd1: "",
    custSAdd2: "",
    custSPcode: "",
    custSState: "",
    custSCity: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSameAsBilling, setIsSameAsBilling] = useState(false);
  const [billingCityOptions, setBillingCityOptions] = useState(["Select City"]);
  const [shippingCityOptions, setShippingCityOptions] = useState(["Select City"]);

  const fetchPincodeDetails = async (pincode, type) => {
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();

      if (data?.[0]?.Status === "Success") {
        const postOffices = data[0].PostOffice;
        const cities = [...new Set(postOffices.flatMap(({ Name, District }) => [Name, District]))];
        const state = postOffices[0]?.State || "";

        if (type === "billing") {
          setBillingCityOptions(cities);
          setFormData((prev) => ({ ...prev, custBState: state, custBCity: "" }));
        } else {
          setShippingCityOptions(cities);
          setFormData((prev) => ({ ...prev, custSState: state, custSCity: "" }));
        }

        setErrors((prev) => {
          const updated = { ...prev };
          delete updated[type === "billing" ? "custBState" : "custSState"];
          delete updated[type === "billing" ? "custBCity" : "custSCity"];
          return updated;
        });
      } else {
        toast.error("Invalid Pincode. Please enter a valid one.");
        const reset = { custBState: "", custBCity: "" };
        type === "billing"
          ? setFormData((prev) => ({ ...prev, ...reset }))
          : setFormData((prev) => ({ ...prev, custSState: "", custSCity: "" }));
      }
    } catch (error) {
      console.error("Error fetching pincode:", error);
      toast.error("Failed to fetch pincode details.");
    }
  };

  const handleCheckbox = (e) => {
    const checked = e.target.checked;
    setIsSameAsBilling(checked);

    if (checked) {
      setFormData((prevData) => ({
        ...prevData,
        custSAdd1: prevData.custBAdd1,
        custSAdd2: prevData.custBAdd2,
        custSPcode: prevData.custBPcode,
        custSState: prevData.custBState,
        custSCity: prevData.custBCity,
      }));
      setShippingCityOptions(billingCityOptions);
      setErrors((prev) => {
        const errors = { ...prev };
        delete errors.custSAdd1;
        delete errors.custSAdd2;
        delete errors.custSPcode;
        delete errors.custSState;
        delete errors.custSCity;
        return errors;
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        custSAdd1: "",
        custSAdd2: "",
        custSPcode: "",
        custSState: "",
        custSCity: "",
      }));
      setShippingCityOptions(["Select City"]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrors((prevErrors) => {
      const errors = { ...prevErrors };
      delete errors[name];
      return errors;
    });

    setFormData((prev) => {
      const errors = { ...prev, [name]: value };

      if (isSameAsBilling && name.startsWith("custB")) {
        const mapped = name.replace("custB", "custS");
        errors[mapped] = value;
      }

      return errors;
    });

    if (name === "custBPcode" && value.length === 6) fetchPincodeDetails(value, "billing");
    if (name === "custSPcode" && value.length === 6) fetchPincodeDetails(value, "shipping");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateCustomerForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        const res = await postCustomerDetails(formData);
        if (res?.status === "OK") {
          toast.success("Customer details added successfully");
          navigate(-1);
        }
      } catch (err) {
        console.error("Submission error:", err);
        toast.error("Error submitting the form.");
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(validationErrors);
      toast.error("Please check the fields with errors.");
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
                error={!!errors.custName}
                helperText={errors.custName}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="ctcPersName"
                label="Contact Person Name"
                fullWidth
                value={formData.ctcPersName}
                onChange={handleChange}
                error={!!errors.ctcPersName}
                helperText={errors.ctcPersName}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="ctcPh"
                label="Phone"
                fullWidth
                value={formData.ctcPh}
                onChange={handleChange}
                error={!!errors.ctcPh}
                helperText={errors.ctcPh}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                type="email"
                name="email"
                label="Email"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="gstNo"
                label="GST Number"
                fullWidth
                value={formData.gstNo}
                onChange={handleChange}
                error={!!errors.gstNo}
                helperText={errors.gstNo}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="subtitle1">Billing Address</Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                name="custBAdd1"
                label="Address Line 1"
                fullWidth
                value={formData.custBAdd1}
                onChange={handleChange}
                error={!!errors.custBAdd1}
                helperText={errors.custBAdd1}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                name="custBAdd2"
                label="Address Line 2"
                fullWidth
                value={formData.custBAdd2}
                onChange={handleChange}
                error={!!errors.custBAdd2}
                helperText={errors.custBAdd2}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="custBPcode"
                label="Pincode"
                fullWidth
                value={formData.custBPcode}
                onChange={handleChange}
                error={!!errors.custBPcode}
                helperText={errors.custBPcode}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="custBState"
                label="State"
                fullWidth
                value={formData.custBState}
                onChange={handleChange}
                error={!!errors.custBState}
                helperText={errors.custBState}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                select
                id="billing-city-select-label"
                name="custBCity"
                label="City"
                value={formData.custBCity}
                onChange={handleChange}
                error={!!errors.custBCity}
                helperText={errors.custBCity}
              >
                {billingCityOptions.length > 0 &&
                  billingCityOptions?.map((city, index) => (
                    <MenuItem key={index} value={city}>
                      {city}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControlLabel
                control={<Checkbox name="sameAsBilling" checked={isSameAsBilling} onChange={handleCheckbox} />}
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
                name="custSAdd1"
                label="Address Line 1"
                fullWidth
                value={formData.custSAdd1}
                onChange={handleChange}
                error={!!errors.custSAdd1}
                helperText={errors.custSAdd1}
                disabled={isSameAsBilling}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                name="custSAdd2"
                label="Address Line 2"
                fullWidth
                value={formData.custSAdd2}
                onChange={handleChange}
                error={!!errors.custSAdd2}
                helperText={errors.custSAdd2}
                disabled={isSameAsBilling}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="custSPcode"
                label="Pincode"
                fullWidth
                value={formData.custSPcode}
                onChange={handleChange}
                error={!!errors.custSPcode}
                helperText={errors.custSPcode}
                disabled={isSameAsBilling}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="custSState"
                label="State"
                fullWidth
                value={formData.custSState}
                onChange={handleChange}
                error={!!errors.custSState}
                helperText={errors.custSState}
                disabled={isSameAsBilling}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                select
                id="shipping-city-select-label"
                name="custSCity"
                label="City"
                value={formData.custSCity}
                onChange={handleChange}
                error={!!errors.custSCity}
                helperText={errors.custSCity}
              >
                {shippingCityOptions.length > 0 &&
                  shippingCityOptions?.map((city, index) => (
                    <MenuItem key={index} value={city}>
                      {city}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid size={12} display="flex" justifyContent={{ xs: "center", sm: "flex-end" }} mt={2}>
              <Button type="submit" variant="contained" loading={loading} loadingPosition="start">
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
