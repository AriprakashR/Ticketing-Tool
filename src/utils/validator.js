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

export const validateProductForm = (formData) => {
  const errors = {};

  if (!formData.prdCode.trim()) errors.prdCode = "Product code is required";
  if (!formData.prdName.trim()) errors.prdName = "Product name is required";
  if (!formData.prdModel.trim()) errors.prdModel = "Product model is required";
  if (!formData.prdBrand.trim()) errors.prdBrand = "Product brand is required";
  if (!formData.prdDescription.trim()) errors.prdDescription = "Product Description is required";

  return errors;
};

export const validateMachineForm = (formData) => {
  const errors = {};

  const isAMC = formData.mcnStatusCode === "80" || formData.mcnStatusCode === 80;

  if (!formData.custId?.trim()) errors.custId = "Customer is required.";
  if (!formData.custShipAddId) errors.custShipAddId = "Machine Location is required.";
  if (!formData.prdId) errors.prdId = "Product is required.";
  if (!formData.mcnSno?.trim()) errors.mcnSno = "Serial Number is required.";
  if (!formData.mcnStatusCode) errors.mcnStatusCode = "Machine Status is required.";

  if (isAMC) {
    // Validate AMC-related fields only
    if (!formData.amcStartDate) errors.amcStartDate = "AMC Start Date is required.";
    if (!formData.amcEndDate) errors.amcEndDate = "AMC End Date is required.";
  } else {
    // Validate Warranty-related fields only
    if (!formData.instlDate) errors.instlDate = "Installation Date is required.";
    if (
      formData.wrntyPeriod === undefined ||
      formData.wrntyPeriod === null ||
      isNaN(formData.wrntyPeriod) ||
      Number(formData.wrntyPeriod) <= 0
    ) {
      errors.wrntyPeriod = "Valid Warranty Period is required.";
    }
  }

  return errors;
};
