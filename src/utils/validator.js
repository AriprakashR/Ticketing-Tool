export const validateCustomerForm = (formData, isSameAsBilling) => {
  const errors = {};

  if (!formData.custName.trim()) errors.custName = "Customer name is required";
  if (!formData.ctcPersName.trim()) errors.ctcPersName = "Contact person name is required";
  if (!/^\d{10}$/.test(formData.ctcPh)) errors.ctcPh = "Valid 10-digit phone number is required";
  if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Valid email is required";
  if (!formData.gstNo.trim()) {
    errors.gstNo = "GST number is required";
  } else if (!/^[0-9]{2}[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}[1-9A-Za-z]{1}[Z]{1}[0-9A-Za-z]{1}$/i.test(formData.gstNo)) {
    errors.gstNo = "Invalid GST number";
  }

  if (!formData.custBAdd1.trim()) errors.custBAdd1 = "Billing address line 1 is required";
  if (!formData.custBAdd2.trim()) errors.custBAdd2 = "Billing address line 2 is required";
  if (!formData.custBPcode || formData.custBPcode.length !== 6) errors.custBPcode = "Valid 6-digit pincode required";
  if (!formData.custBState) errors.custBState = "State is required";
  if (!formData.custBCity) errors.custBCity = "City is required";

  if (!isSameAsBilling) {
    if (!formData.custSAdd1.trim()) errors.custSAdd1 = "Shipping address line 1 is required";
    if (!formData.custSAdd2.trim()) errors.custSAdd2 = "Shipping address line 2 is required";
    if (!formData.custSPcode || formData.custSPcode.length !== 6) errors.custSPcode = "Valid 6-digit pincode required";
    if (!formData.custSState) errors.custSState = "State is required";
    if (!formData.custSCity) errors.custSCity = "City is required";
  }

  return errors;
};
