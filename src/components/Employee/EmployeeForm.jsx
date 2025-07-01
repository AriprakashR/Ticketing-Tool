import {
  Box,
  TextField,
  Grid,
  Button,
  Typography,
  Card,
  CardContent,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import { postEmployeeDetails, getEmployeeDesignationList } from "../../api/employee-service";
import { getRegionalDetailsList, getBranchListByRegionalId } from "../../api/regional-service";
import { getLocationListByBranchId } from "../../api/branch-service";
import { validateEmployeeForm } from "../../utils/validator";
import { toast } from "../../utils/toastService";
import { useNavigate } from "react-router";

const EmployeeForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    empDesgId: "",
    regionalId: "",
    branchId: "",
    empName: "",
    empPhNo: "",
    add1: "",
    add2: "",
    pincode: "",
    state: "",
    city: "",
    empEmail: "",
    locId: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [cityOptions, setCityOptions] = useState([]);
  const [designationList, setDesignationList] = useState([]);
  const [regionList, setRegionList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [locationList, setLocationList] = useState([]);

  const isManagerialDesg = [1, 2, 3].includes(Number(formData.empDesgId));

  const clearErrors = (fields) => {
    setErrors((prev) => {
      const updated = { ...prev };
      fields.forEach((field) => delete updated[field]);
      return updated;
    });
  };

  const fetchPincodeDetails = async (pincode, type) => {
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await res.json();

      if (data?.[0]?.Status === "Success") {
        const postOffices = data[0].PostOffice;
        const cities = [...new Set(postOffices.flatMap(({ Name, District }) => [Name, District]))];
        const state = postOffices[0]?.State || "";

        setCityOptions(cities);
        setFormData((prev) => ({ ...prev, state: state, city: "" }));
        clearErrors(["state"]);
      }
    } catch (err) {
      console.error("Error fetching pincode:", err);
      toast.error("Failed to fetch pincode details.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [regions, designations] = await Promise.all([getRegionalDetailsList(), getEmployeeDesignationList()]);
        setRegionList(regions?.data || []);
        setDesignationList(designations?.data || []);
      } catch (err) {
        console.error("Initial data fetch failed", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchBranchList = async () => {
      if (!formData.regionalId) return;
      try {
        const res = await getBranchListByRegionalId(formData.regionalId);
        setBranchList(res?.data || []);
      } catch (err) {
        console.error("Failed to fetch branch list:", err);
      }
    };

    fetchBranchList();
  }, [formData.regionalId]);

  useEffect(() => {
    const fetchLocationList = async () => {
      if (!formData.branchId) return;
      try {
        const res = await getLocationListByBranchId(formData.branchId);
        setLocationList(res?.data || []);
      } catch (err) {
        console.error("Failed to fetch location list:", err);
      }
    };

    fetchLocationList();
  }, [formData.branchId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    clearErrors([name]);

    if (name === "empDesgId") {
      const isManagerial = [1, 2, 3].includes(Number(value));
      setFormData((prev) => ({
        ...prev,
        empDesgId: value,
        regionalId: "",
        branchId: "",
        locId: isManagerial ? "" : prev.locId,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "regionalId" ? { branchId: "", locId: "" } : {}),
      ...(name === "branchId" ? { locId: "" } : {}),
    }));

    if (name === "pincode" && value.length === 6) {
      fetchPincodeDetails(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateEmployeeForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        const res = await postEmployeeDetails(formData);
        if (res?.status === "OK") {
          toast.success("Employee details added successfully");
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
                error={!!errors.empName}
                helperText={errors.empName}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="empPhNo"
                label="Phone Number"
                fullWidth
                value={formData.empPhNo}
                onChange={handleChange}
                error={!!errors.empPhNo}
                helperText={errors.empPhNo}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="empEmail"
                label="Email"
                type="email"
                fullWidth
                value={formData.empEmail}
                onChange={handleChange}
                error={!!errors.empEmail}
                helperText={errors.empEmail}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                select
                id="designation-select-label"
                name="empDesgId"
                label="Select Designation"
                value={formData.empDesgId}
                onChange={handleChange}
                error={!!errors.empDesgId}
                helperText={errors.empDesgId}
              >
                {designationList?.map((desgn) => (
                  <MenuItem key={desgn.empDesgId} value={desgn.empDesgId}>
                    {desgn.designation}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                select
                id="region-select-label"
                name="regionalId"
                label="Select Region"
                value={formData.regionalId}
                onChange={handleChange}
                error={!!errors.regionalId}
                helperText={errors.regionalId}
                disabled={!formData.empDesgId}
              >
                {regionList?.map((reg) => (
                  <MenuItem key={reg.regionalId} value={reg.regionalId}>
                    {reg.regionalName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                select
                id="branch-select-label"
                name="branchId"
                label="Select Branch"
                value={formData.branchId}
                onChange={handleChange}
                error={!!errors.branchId}
                helperText={errors.branchId}
                disabled={!formData.empDesgId}
              >
                {branchList.map((branch) => (
                  <MenuItem key={branch.branchId} value={branch.branchId}>
                    {branch.branchName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                select
                id="location-select-label"
                name="locId"
                label="Select Location"
                value={formData.locId}
                onChange={handleChange}
                error={!!errors.locId}
                helperText={errors.locId}
                disabled={isManagerialDesg || !formData.empDesgId}
              >
                {locationList.map((loc) => (
                  <MenuItem key={loc.locId} value={loc.locId}>
                    {loc.locAssigned}
                  </MenuItem>
                ))}
              </TextField>
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
                error={!!errors.add1}
                helperText={errors.add1}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                name="add2"
                label="Address Line 2"
                fullWidth
                value={formData.add2}
                onChange={handleChange}
                error={!!errors.add2}
                helperText={errors.add2}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="pincode"
                label="Pincode"
                fullWidth
                value={formData.pincode}
                onChange={handleChange}
                error={!!errors.pincode}
                helperText={errors.pincode}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="state"
                label="State"
                fullWidth
                value={formData.state}
                onChange={handleChange}
                error={!!errors.state}
                helperText={errors.state}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                select
                id="city-select-label"
                name="city"
                label="City"
                value={formData.city}
                onChange={handleChange}
                error={!!errors.city}
                helperText={errors.city}
              >
                {cityOptions.length > 0 &&
                  cityOptions?.map((city, index) => (
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

export default EmployeeForm;
