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
import { useState, useEffect } from "react";
import { getEmployeeDesignationList } from "../../api/employee-service";
import { getRegionalDetailsList, getBranchListByRegionalId } from "../../api/regional-service";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    empDesgId: "",
    regionalId: "",
    branchId: "",
    empName: "",
    empPhNo: "",
    add1: "",
    add2: "",
    pincode: "",
    city: "",
    state: "",
    empEmail: "",
    locId: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedDesignation, setSelectedDesignation] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState([]);

  const fetchPincodeDetails = async (pincode, type) => {
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();

      if (data?.[0]?.Status === "Success") {
        const postOffices = data[0].PostOffice;
        const cities = [...new Set(postOffices.flatMap(({ Name, District }) => [Name, District]))];
        const state = postOffices[0]?.State || "";

        setCityOptions(cities);
        setFormData((prev) => ({ ...prev, state: state, city: "" }));
      }
    } catch (error) {
      console.error("Error fetching pincode:", error);
      toast.error("Failed to fetch pincode details.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [RegionRes, DesignationRes] = await Promise.all([
          getRegionalDetailsList(),
          getEmployeeDesignationList(),
          getBranchListByRegionalId(),
        ]);
        setSelectedRegion(RegionRes?.data || []);
        setSelectedDesignation(DesignationRes?.data || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchBranchList = async () => {
      if (!formData.regionalId) return;
      try {
        const res = await getBranchListByRegionalId(formData.regionalId);
        setSelectedBranch(res?.data || []);
      } catch (error) {
        console.error("Failed to fetch branch list:", error);
      }
    };

    fetchBranchList();
  }, [formData.regionalId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "pincode" && value.length === 6) fetchPincodeDetails(value, "city");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
  };

  const locationOptions = [
    { id: "1", name: "North Banglore" },
    { id: "2", name: "South Banglore" },
    { id: "3", name: "East Banglore" },
    { id: "4", name: "West Banglore" },
    { id: "5", name: "Central Banglore" },
    { id: "6", name: "Head Office" },
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
              <TextField
                fullWidth
                select
                id="designation-select-label"
                name="empDesgId"
                label="Select Designation"
                value={formData.empDesgId}
                onChange={handleChange}
              >
                {selectedDesignation?.map((desgn) => (
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
              >
                {selectedRegion?.map((reg) => (
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
              >
                {selectedBranch.map((branch) => (
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
              >
                {locationOptions.map((loc) => (
                  <MenuItem key={loc.id} value={loc.id}>
                    {loc.name}
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
              <TextField name="add1" label="Address Line 1" fullWidth value={formData.add1} onChange={handleChange} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField name="add2" label="Address Line 2" fullWidth value={formData.add2} onChange={handleChange} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField name="pincode" label="Pincode" fullWidth value={formData.pincode} onChange={handleChange} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField name="state" label="State" fullWidth value={formData.state} onChange={handleChange} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel id="city-select-label">City</InputLabel>
                <Select
                  labelId="city-select-label"
                  name="city"
                  label="City"
                  value={formData.city}
                  onChange={handleChange}
                >
                  {cityOptions.length > 0 &&
                    cityOptions?.map((city, index) => (
                      <MenuItem key={index} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={12} display="flex" justifyContent={{ xs: "center", sm: "flex-end" }} mt={2}>
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
