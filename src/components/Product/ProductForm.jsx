import { Box, TextField, Grid, Button, Typography, Card, CardContent } from "@mui/material";
import { toast } from "../../utils/toastService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { postProductDetails, getGeneratedPrdCode } from "../../api/product-service";
import { validateProductForm } from "../../utils/validator";

const ProductForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    prdCode: "",
    prdName: "",
    prdModel: "",
    prdBrand: "",
    prdDescription: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchGeneratedPrdCode = async () => {
    try {
      const response = await getGeneratedPrdCode();
      if (response?.data) {
        setFormData((prevData) => ({
          ...prevData,
          prdCode: response.data.prdCode,
        }));
      }
    } catch (error) {
      console.error("Error fetching generated Product Code:", error);
      toast.error("Failed to fetch product code");
    }
  };

  useEffect(() => {
    fetchGeneratedPrdCode();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrors((prevErrors) => {
      const errors = { ...prevErrors };
      delete errors[name];
      return errors;
    });

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateProductForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        const res = await postProductDetails(formData);
        if (res?.status === "OK") {
          toast.success("Product details added successfully");
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
          Product Form
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="prdCode"
                label="Product Code"
                fullWidth
                value={formData.prdCode}
                onChange={handleChange}
                error={!!errors.prdCode}
                helperText={errors.prdCode}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="prdName"
                label="Product Name"
                fullWidth
                value={formData.prdName}
                onChange={handleChange}
                error={!!errors.prdName}
                helperText={errors.prdName}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="prdModel"
                label="Model"
                fullWidth
                value={formData.prdModel}
                onChange={handleChange}
                error={!!errors.prdModel}
                helperText={errors.prdModel}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="prdBrand"
                label="Brand"
                fullWidth
                value={formData.prdBrand}
                onChange={handleChange}
                error={!!errors.prdBrand}
                helperText={errors.prdBrand}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                name="prdDescription"
                label="Description"
                fullWidth
                multiline
                rows={4}
                value={formData.prdDescription}
                onChange={handleChange}
                error={!!errors.prdDescription}
                helperText={errors.prdDescription}
              />
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

export default ProductForm;
