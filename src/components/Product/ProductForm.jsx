import {
  Box,
  TextField,
  Grid,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { toast } from "../../utils/toastService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  postProductDetails,
  getGeneratedPrdCode,
} from "../../api/product-service";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    prdCode: "",
    prdName: "",
    prdModel: "",
    prdBrand: "",
    prdDescription: "",
  });
  const navigate = useNavigate();

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
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postProductDetails(formData);
      if (response?.status === "OK") {
        toast.success("Product details added successfully");
        console.log("Product Details Submission Response:", response.msg);
        navigate(-1);
      } else {
        console.log("Product Details Submisson failed");
      }
    } catch (error) {
      console.log("Product Details Submission:", error);
      toast.errortoast.error(
        "An error occurred while submitting the product form.",
        error
      );
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
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="prdName"
                label="Product Name"
                fullWidth
                value={formData.prdName}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="prdModel"
                label="Model"
                fullWidth
                value={formData.prdModel}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="prdBrand"
                label="Brand"
                fullWidth
                value={formData.prdBrand}
                onChange={handleChange}
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

export default ProductForm;
