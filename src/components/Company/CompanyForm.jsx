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

const CompanyForm = () => {
  const [formData, setFormData] = useState({
    compName: "",
    ctcPersName: "",
    ctcPh: "",
    compLandline: "",
    ctcMail: "",
    compUrl: "",
    gstNo: "",
    panNo: "",
    compLogo: null,
    signatureStamp: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
  };

  return (
    <>
      <Card sx={{ maxWidth: 1000, mx: "auto", mt: 4, padding: 2 }}>
        <CardContent>
          <Typography variant="h6" mb={4}>
            Company Form
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2} rowSpacing={2.5}>
              {/* Responsive fields */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  name="compName"
                  label="Company Name"
                  fullWidth
                  value={formData.compName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  name="ctcPersName"
                  label="Contact Person"
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
                  type="tel"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  name="compLandline"
                  label="Landline"
                  fullWidth
                  value={formData.compLandline}
                  onChange={handleChange}
                  type="tel"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  name="ctcMail"
                  label="Email"
                  fullWidth
                  value={formData.ctcMail}
                  onChange={handleChange}
                  type="email"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  name="compUrl"
                  label="URL"
                  fullWidth
                  value={formData.compUrl}
                  onChange={handleChange}
                  type="url"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  name="gstNo"
                  label="GST"
                  fullWidth
                  value={formData.gstNo}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  name="panNo"
                  label="PAN"
                  fullWidth
                  value={formData.panNo}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Button variant="outlined" component="label" fullWidth>
                  Upload Company Logo
                  <input
                    name="compLogo"
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleChange}
                  />
                </Button>
                {formData.compLogo && (
                  <Typography variant="body2" mt={1}>
                    {formData.compLogo.name}
                  </Typography>
                )}
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Button variant="outlined" component="label" fullWidth>
                  Upload Signature / Stamp
                  <input
                    name="signatureStamp"
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleChange}
                  />
                </Button>
                {formData.signatureStamp && (
                  <Typography variant="body2" mt={1}>
                    {formData.signatureStamp.name}
                  </Typography>
                )}
              </Grid>

              {/* Submit Button - Full width on xs, aligned to end on larger screens */}
              <Grid
                size={12}
                display="flex"
                justifyContent={{ xs: "center", sm: "flex-end" }}
                mt={2}
              >
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default CompanyForm;
