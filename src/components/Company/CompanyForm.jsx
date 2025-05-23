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
      <Card sx={{ maxWidth: 700, mx: "auto", mt: 4, padding: 2 }}>
        <CardContent>
          <Typography variant="h6" mb={4}>
            Company Form
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2} rowSpacing={2.5} columns={16}>
              {/* Row 1 */}
              <Grid item size={8}>
                <TextField
                  name="compName"
                  label="Company Name"
                  fullWidth
                  required
                  value={formData.compName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item size={8}>
                <TextField
                  name="ctcPersName"
                  label="Contact Person Name"
                  fullWidth
                  required
                  value={formData.ctcPersName}
                  onChange={handleChange}
                />
              </Grid>

              {/* Row 2 */}
              <Grid item size={8}>
                <TextField
                  name="ctcPh"
                  label="Contact Phone"
                  fullWidth
                  value={formData.ctcPh}
                  onChange={handleChange}
                  type="tel"
                />
              </Grid>
              <Grid item size={8}>
                <TextField
                  name="compLandline"
                  label="Company Landline"
                  fullWidth
                  value={formData.compLandline}
                  onChange={handleChange}
                  type="tel"
                />
              </Grid>

              {/* Row 3 */}
              <Grid item size={8}>
                <TextField
                  name="ctcMail"
                  label="Contact Email"
                  fullWidth
                  value={formData.ctcMail}
                  onChange={handleChange}
                  type="email"
                />
              </Grid>
              <Grid item size={8}>
                <TextField
                  name="compUrl"
                  label="Company Website"
                  fullWidth
                  value={formData.compUrl}
                  onChange={handleChange}
                  type="url"
                />
              </Grid>

              {/* Row 4 */}
              <Grid item size={8}>
                <TextField
                  name="gstNo"
                  label="GST Number"
                  fullWidth
                  value={formData.gstNo}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item size={8}>
                <TextField
                  name="panNo"
                  label="PAN Number"
                  fullWidth
                  value={formData.panNo}
                  onChange={handleChange}
                />
              </Grid>

              {/* Row 5 */}
              <Grid item size={8}>
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
              <Grid item size={8}>
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

              {/* Row 6: Submit Button - span both columns */}
              <Grid item size={4}>
                <Button variant="contained" type="submit" fullWidth>
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
