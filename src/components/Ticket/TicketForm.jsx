import { Box, TextField, Grid, Button, Typography, Card, CardContent, MenuItem, Autocomplete } from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "../../utils/toastService";
import { postTicketDetails } from "../../api/ticket-service";
import { getCustomerDetailsList, getSpecficCustomerDetails } from "../../api/customer-service";
import { getMachineDetailsList } from "../../api/machine-service";
import { getRegionalDetailsList, getBranchListByRegionalId } from "../../api/regional-service";
import { getLocationListByBranchId } from "../../api/branch-service";
import { getEmployeeDetailsList } from "../../api/employee-service";
import { validateTicketForm } from "../../utils/validator";

const TicketForm = () => {
  const [formData, setFormData] = useState({
    custId: "",
    custShipAddId: "",
    mcnId: "",
    prblmDesc: "",
    remarks: "",
    regionalId: "",
    branchId: "",
    locId: "",
    empAssignId: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [customers, setCustomers] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [machineLocation, setMachineLocation] = useState([]);
  const [machineSerialNo, setMachineSerialNo] = useState([]);
  const [regionList, setRegionList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [assignedEmployee, setAssignedEmployee] = useState([]);

  const clearErrors = (fields) => {
    setErrors((prev) => {
      const updated = { ...prev };
      fields.forEach((field) => delete updated[field]);
      return updated;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customerRes, machineRes, regionalRes, employeeRes] = await Promise.all([
          getCustomerDetailsList(),
          getMachineDetailsList(),
          getRegionalDetailsList(),
          getEmployeeDetailsList(),
        ]);

        setCustomers(customerRes?.data?.data || []);
        setMachineSerialNo(machineRes?.data || []);
        setRegionList(regionalRes?.data || []);
        setAssignedEmployee(employeeRes?.data?.data || []);
      } catch (error) {
        console.error("Data load error:", error);
        toast.error("Failed to load form data.");
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

  const handleCustomerSelection = async (selectedCust) => {
    if (!selectedCust?.custId) return;
    try {
      const res = await getSpecficCustomerDetails(selectedCust.custId);
      const { customerShippingAddress = [] } = res?.data || {};

      setFormData((prev) => ({
        ...prev,
        custId: selectedCust.custId,
        custShipAddId: customerShippingAddress?.custShipAddId || "",
      }));

      setCustomerName(selectedCust?.custName || "");
      setMachineLocation(customerShippingAddress);
    } catch (err) {
      console.error("Customer detail error:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    clearErrors([name]);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateTicketForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        const res = await postTicketDetails(formData);
        if (res?.status === "OK") {
          toast.success("Ticket created successfully");
          navigate(-1);
        }
      } catch (err) {
        toast.error("Failed to create ticket.");
        console.error("Submit error:", err);
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
          Ticket Form
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            {/* Customer Phone */}
            <Grid size={{ xs: 12, sm: 3 }}>
              <Autocomplete
                fullWidth
                options={customers}
                getOptionLabel={(option) => option?.ctcPh || ""}
                onChange={(e, value) => {
                  if (value) {
                    setFormData((prev) => ({ ...prev, custId: value?.custId || "" }));
                    handleCustomerSelection(value);
                    clearErrors(["custId"]);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Customer Phone"
                    error={!!errors.custId}
                    helperText={errors.custId}
                  />
                )}
                popupIcon={<KeyboardArrowDownRoundedIcon fontSize="24px" />}
              />
            </Grid>

            {/* Customer Name */}
            <Grid size={{ xs: 12, sm: 3 }}>
              <TextField name="customerName" label="Customer" fullWidth value={customerName} readOnly />
            </Grid>

            {/* Machine Location */}
            <Grid size={{ xs: 12, sm: 3 }}>
              <TextField
                fullWidth
                select
                id="machine-location-select-label"
                name="custShipAddId"
                label="Machine Location"
                value={formData.custShipAddId}
                onChange={handleChange}
                error={!!errors.custShipAddId}
                helperText={errors.custShipAddId}
              >
                {machineLocation?.map((addr) => (
                  <MenuItem key={addr.custShipAddId} value={addr.custShipAddId}>
                    {`${addr.custSAdd1}, ${addr.custSAdd2}, ${addr.custSCity}, ${addr.custSState} - ${addr.custSPcode}`}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Machine */}
            <Grid size={{ xs: 12, sm: 3 }}>
              <Autocomplete
                fullWidth
                options={machineSerialNo}
                getOptionLabel={(option) => option?.mcnSno || ""}
                onChange={(e, value) => {
                  setFormData((prev) => ({ ...prev, mcnId: value?.mcnId || "" }));
                  clearErrors(["mcnId"]);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Machine Serial No"
                    error={!!errors.mcnId}
                    helperText={errors.mcnId}
                  />
                )}
                popupIcon={<KeyboardArrowDownRoundedIcon fontSize="24px" />}
              />
            </Grid>

            {/* Problem Description */}
            <Grid size={{ sm: 12 }}>
              <TextField
                fullWidth
                name="prblmDesc"
                label="Problem Description"
                value={formData.prblmDesc}
                onChange={handleChange}
                error={!!errors.prblmDesc}
                helperText={errors.prblmDesc}
                multiline
                rows={3}
              />
            </Grid>

            {/* Remarks */}
            <Grid size={{ sm: 12 }}>
              <TextField
                fullWidth
                name="remarks"
                label="Remarks"
                value={formData.remarks}
                onChange={handleChange}
                error={!!errors.remarks}
                helperText={errors.remarks}
                multiline
                rows={2}
              />
            </Grid>

            {/* Region */}
            <Grid size={{ xs: 12, sm: 3 }}>
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
              >
                {regionList?.map((reg) => (
                  <MenuItem key={reg.regionalId} value={reg.regionalId}>
                    {reg.regionalName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Branch */}
            <Grid size={{ xs: 12, sm: 3 }}>
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
              >
                {branchList?.map((branch) => (
                  <MenuItem key={branch.branchId} value={branch.branchId}>
                    {branch.branchName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Location */}
            <Grid size={{ xs: 12, sm: 3 }}>
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
              >
                {locationList.map((loc) => (
                  <MenuItem key={loc.locId} value={loc.locId}>
                    {loc.locAssigned}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Employee */}
            <Grid size={{ xs: 12, sm: 3 }}>
              <TextField
                select
                fullWidth
                name="empAssignId"
                label="Assigned Employee"
                value={formData.empAssignId}
                onChange={handleChange}
                error={!!errors.empAssignId}
                helperText={errors.empAssignId}
              >
                {assignedEmployee?.map((emp) => (
                  <MenuItem key={emp.credsId} value={emp.credsId}>
                    {emp.empName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Submit */}
            <Grid size={{ xs: 12 }} display="flex" justifyContent={{ xs: "center", sm: "flex-end" }}>
              <Button type="submit" variant="contained" loading={loading} loadingPosition="start">
                Generate ticket
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TicketForm;
