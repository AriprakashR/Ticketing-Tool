import {
  Box,
  TextField,
  Grid,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { useState } from "react";

const BankForm = () => {
  const [formData, setFormData] = useState({
    bankName: "",
    accHolderName: "",
    accNo: "",
    cnfrmAccNo: "",
    ifscCode: "",
    branchName: "",
  });

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
          Bank Details Form
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2} rowSpacing={2.5}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="bankName"
                label="Bank Name"
                fullWidth
                value={formData.bankName}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="accHolderName"
                label="Account Holder Name"
                fullWidth
                value={formData.accHolderName}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="accNo"
                label="Account Number"
                fullWidth
                value={formData.accNo}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="cnfrmAccNo"
                label="Confirm Account Number"
                fullWidth
                value={formData.cnfrmAccNo}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="ifscCode"
                label="IFSC Code"
                fullWidth
                value={formData.ifscCode}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="branchName"
                label="Branch Name"
                fullWidth
                value={formData.branchName}
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

export default BankForm;
