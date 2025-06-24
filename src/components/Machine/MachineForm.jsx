import { Box, TextField, Grid, Button, Typography, Card, CardContent, MenuItem, Autocomplete } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "../../utils/toastService";
import DatePicker from "../UI/DatePicker";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { postMachineDetails } from "../../api/machine-service";
import { getCustomerDetailsList, getSpecficCustomerDetails } from "../../api/customer-service";
import { getProductDetailsList } from "../../api/product-service";
import { validateMachineForm } from "../../utils/validator";

const MachineForm = () => {
  const [formData, setFormData] = useState({
    mcnSno: "",
    wrntyPeriod: 0,
    instlDate: null,
    wrntyStartDate: null,
    amcStartDate: null,
    amcEndDate: null,
    mcnStatusCode: "",
    prdId: "",
    custId: "",
    custShipAddId: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState([]);
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
    const { instlDate, wrntyPeriod } = formData;
    if (instlDate && wrntyPeriod > 0) {
      const startDate = new Date(instlDate);
      const endDate = new Date(startDate);
      endDate.setFullYear(endDate.getFullYear() + Number(wrntyPeriod));
      endDate.setDate(endDate.getDate() - 1); // Subtract 1 day to end warranty a day before

      setFormData((prev) => ({
        ...prev,
        wrntyStartDate: startDate,
      }));
      setWarrantyEndDate(endDate);
    } else {
      setWarrantyEndDate(null);
    }
  }, [formData.instlDate, formData.wrntyPeriod]);

  useEffect(() => {
    if (formData.mcnStatusCode === "80" || formData.mcnStatusCode === 80) return; // Don't override if in AMC

    if (formData.wrntyStartDate && warrantyEndDate) {
      const today = new Date();

      if (warrantyEndDate >= today) {
        // In Warranty
        setFormData((prev) => ({
          ...prev,
          mcnStatusCode: 70,
          amcStartDate: null,
          amcEndDate: null,
        }));
        setErrors((prev) => {
          const errors = { ...prev };
          delete errors.mcnStatusCode;
          delete errors.amcStartDate;
          delete errors.amcEndDate;
          return errors;
        });
      } else {
        // Out of Warranty
        setFormData((prev) => ({
          ...prev,
          mcnStatusCode: 71,
          amcStartDate: null,
          amcEndDate: null,
        }));
        setErrors((prev) => {
          const errors = { ...prev };
          delete errors.mcnStatusCode;
          delete errors.amcStartDate;
          delete errors.amcEndDate;
          return errors;
        });
      }
    }
  }, [formData.wrntyStartDate, warrantyEndDate]);

  const handleCustomerSelection = async (selectedCust) => {
    try {
      if (!selectedCust?.custId) return;

      const response = await getSpecficCustomerDetails(selectedCust.custId);

      const shippingAddress = response?.data?.customerShippingAddress || [];

      setFormData((prev) => ({
        ...prev,
        custId: selectedCust.custId.toString(),
        custShipAddId: shippingAddress.custShipAddId || "",
      }));

      setSelectedCustomerShippingAddress(shippingAddress);
    } catch (error) {
      console.error("Failed to fetch customer details", error);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setErrors((prevErrors) => {
      const errors = { ...prevErrors };
      delete errors[name];
      return errors;
    });

    if (name === "custId") {
      const selectedCust = selectedCustomer.find((customer) => customer?.custId?.toString() === value);
      if (selectedCust) {
        setFormData((prev) => ({ ...prev, custId: value }));
        await handleCustomerSelection(selectedCust);
      }
    } else if (name === "mcnStatusCode") {
      if (value === "80" || value === 80) {
        // In AMC manually selected
        setFormData((prev) => ({
          ...prev,
          mcnStatusCode: value,
          instlDate: null,
          wrntyPeriod: 0,
          wrntyStartDate: null,
          amcStartDate: null,
          amcEndDate: null,
        }));
        setWarrantyEndDate(null);
      } else if (value === "70" || value === 70) {
        // Manually selected In Warranty
        setFormData((prev) => ({
          ...prev,
          mcnStatusCode: value,
          amcStartDate: null,
          amcEndDate: null,
        }));
        setErrors((prev) => {
          const errors = { ...prev };
          delete errors.amcStartDate;
          delete errors.amcEndDate;
          return errors;
        });
      } else {
        setFormData((prev) => ({ ...prev, mcnStatusCode: value, amcStartDate: null, amcEndDate: null }));
        setErrors((prev) => {
          const errors = { ...prev };
          delete errors.amcStartDate;
          delete errors.amcEndDate;
          return errors;
        });
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateMachineForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        const res = await postMachineDetails(formData);
        if (res?.status === "OK") {
          toast.success("Machine details added successfully");
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
    <Card sx={{ maxWidth: 1000, mx: "auto", mt: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h6" mb={4}>
          Machine Form
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            {/* Customer Selector */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Autocomplete
                fullWidth
                options={selectedCustomer}
                getOptionLabel={(option) => option?.custName || ""}
                onChange={(event, value) => {
                  if (value) {
                    setFormData((prev) => ({ ...prev, custId: value?.custId || "" }));
                    setErrors((prev) => {
                      const errors = { ...prev };
                      delete errors.custId;
                      return errors;
                    });
                    handleCustomerSelection(value);
                  } else {
                    setFormData((prev) => ({ ...prev, custId: "" }));
                    setSelectedCustomerShippingAddress([]);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select customer"
                    variant="outlined"
                    error={!!errors.custId}
                    helperText={errors.custId}
                  />
                )}
                popupIcon={<KeyboardArrowDownRoundedIcon fontSize="24px" />}
              />
            </Grid>
            {/* Shipping Address */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                select
                id="shipping-address-select-label"
                name="custShipAddId"
                label="Machine Location"
                value={formData.custShipAddId}
                onChange={handleChange}
                error={!!errors.custShipAddId}
                helperText={errors.custShipAddId}
              >
                {selectedCustomerShippingAddress.map((addr) => (
                  <MenuItem key={addr.custShipAddId} value={addr.custShipAddId}>
                    {`${addr.custSAdd1}, ${addr.custSAdd2}, ${addr.custSCity}, ${addr.custSState} - ${addr.custSPcode}`}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Product Selector */}
            <Grid size={{ xs: 12, sm: 4 }}>
              <Autocomplete
                fullWidth
                options={selectedProduct}
                getOptionLabel={(option) => option?.prdName || ""}
                onChange={(event, value) => {
                  setFormData((prev) => ({ ...prev, prdId: value?.prdId || "" }));
                  setErrors((prev) => {
                    const errors = { ...prev };
                    delete errors.prdId;
                    return errors;
                  });
                }}
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
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select product"
                    variant="outlined"
                    error={!!errors.prdId}
                    helperText={errors.prdId}
                  />
                )}
                popupIcon={<KeyboardArrowDownRoundedIcon fontSize="24px" />}
              />
            </Grid>

            {/* Serial No */}
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                name="mcnSno"
                label="Serial No"
                fullWidth
                value={formData.mcnSno}
                onChange={handleChange}
                error={!!errors.mcnSno}
                helperText={errors.mcnSno}
              />
            </Grid>

            {/* Installation Date */}
            <Grid size={{ xs: 12, sm: 4 }}>
              <DatePicker
                label="Installation Date"
                value={formData.instlDate}
                onChange={(newValue) => {
                  setFormData((prev) => ({ ...prev, instlDate: newValue }));
                  setErrors((prev) => {
                    const errors = { ...prev };
                    delete errors.instlDate;
                    return errors;
                  });
                }}
                slotProps={{ textField: { fullWidth: true, error: !!errors.instlDate, helperText: errors.instlDate } }}
                disabled={formData.mcnStatusCode === 80 || formData.mcnStatusCode === "80"}
              />
            </Grid>

            {/* Warranty Period */}
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                name="wrntyPeriod"
                label="Warranty Period (years)"
                fullWidth
                value={formData.wrntyPeriod}
                onChange={handleChange}
                error={!!errors.wrntyPeriod}
                helperText={errors.wrntyPeriod}
                disabled={formData.mcnStatusCode === 80 || formData.mcnStatusCode === "80"}
              />
            </Grid>

            {/* Warranty Start */}
            <Grid size={{ xs: 12, sm: 4 }}>
              <DatePicker
                label="Warranty Start Date"
                value={formData.wrntyStartDate}
                onChange={(newValue) => {
                  setFormData((prev) => ({ ...prev, wrntyStartDate: newValue }));
                  setErrors((prev) => {
                    const errors = { ...prev };
                    delete errors.wrntyStartDate;
                    return errors;
                  });
                }}
                slotProps={{
                  textField: { fullWidth: true },
                }}
                readOnly
                disabled={formData.mcnStatusCode === 80 || formData.mcnStatusCode === "80"}
              />
            </Grid>

            {/* Warranty End */}
            <Grid size={{ xs: 12, sm: 4 }}>
              <DatePicker
                label="Warranty End Date"
                value={warrantyEndDate}
                readOnly
                slotProps={{ textField: { fullWidth: true } }}
                disabled={formData.mcnStatusCode === 80 || formData.mcnStatusCode === "80"}
              />
            </Grid>

            {/* Machine Status */}
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                select
                id="mcn-status-label"
                name="mcnStatusCode"
                label="Machine Status"
                value={formData.mcnStatusCode}
                onChange={handleChange}
                error={!!errors.mcnStatusCode}
                helperText={errors.mcnStatusCode}
              >
                <MenuItem value={70} disabled={formData.mcnStatusCode !== 70}>
                  In Warranty
                </MenuItem>
                <MenuItem value={71} disabled={formData.mcnStatusCode === 70}>
                  Out of Warranty
                </MenuItem>
                <MenuItem value={80} disabled={formData.mcnStatusCode === 70}>
                  In AMC
                </MenuItem>
              </TextField>
            </Grid>

            {/* AMC Dates */}
            <Grid size={{ xs: 12, sm: 4 }}>
              <DatePicker
                label="AMC Start Date"
                value={formData.amcStartDate}
                onChange={(newValue) => {
                  setFormData((prev) => ({ ...prev, amcStartDate: newValue }));
                  setErrors((prev) => {
                    const errors = { ...prev };
                    delete errors.amcStartDate;
                    return errors;
                  });
                }}
                slotProps={{
                  textField: { fullWidth: true, error: !!errors.amcStartDate, helperText: errors.amcStartDate },
                }}
                disabled={formData.mcnStatusCode !== "80" && formData.mcnStatusCode !== 80}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <DatePicker
                label="AMC End Date"
                value={formData.amcEndDate}
                onChange={(newValue) => {
                  setFormData((prev) => ({ ...prev, amcEndDate: newValue }));
                  setErrors((prev) => {
                    const errors = { ...prev };
                    delete errors.amcEndDate;
                    return errors;
                  });
                }}
                slotProps={{
                  textField: { fullWidth: true, error: !!errors.amcEndDate, helperText: errors.amcEndDate },
                }}
                disabled={formData.mcnStatusCode !== "80" && formData.mcnStatusCode !== 80}
              />
            </Grid>

            {/* Submit Button */}
            <Grid size={{ xs: 12 }} display="flex" justifyContent={{ xs: "center", sm: "flex-end" }}>
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

export default MachineForm;
