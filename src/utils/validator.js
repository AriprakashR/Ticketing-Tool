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

export const validateEmployeeForm = (formData) => {
  const errors = {};

  const isManagerialDesg = [1, 2, 3].includes(Number(formData.empDesgId));

  // Required Fields
  if (!formData.empName?.trim()) errors.empName = "Employee Name is required.";
  if (!formData.empPhNo?.trim()) errors.empPhNo = "Phone Number is required.";
  if (!formData.empEmail?.trim()) errors.empEmail = "Email is required.";
  if (!formData.empDesgId) errors.empDesgId = "Employee Designation is required.";
  if (!formData.regionalId) errors.regionalId = "Region is required.";
  if (!formData.branchId) errors.branchId = "Branch is required.";

  if (!isManagerialDesg && !formData.locId) {
    errors.locId = "Location is required.";
  }

  if (!formData.add1?.trim()) errors.add1 = "Address Line 1 is required.";
  if (!formData.add2?.trim()) errors.add2 = "Address Line 2 is required.";
  if (!formData.pincode?.trim()) {
    errors.pincode = "Pincode is required.";
  } else if (!/^\d{6}$/.test(formData.pincode)) {
    errors.pincode = "Pincode must be 6 digits.";
  }
  if (!formData.state) errors.state = "State is required.";
  if (!formData.city) errors.city = "City is required.";

  if (formData.empEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.empEmail)) {
    errors.empEmail = "Enter a valid email address.";
  }

  if (formData.empPhNo && !/^[6-9]\d{9}$/.test(formData.empPhNo)) {
    errors.empPhNo = "Enter a valid 10-digit phone number.";
  }

  return errors;
};

export const validateTicketForm = (formData) => {
  const errors = {};

  if (!formData.custId) errors.custId = "Customer Phone is required.";
  if (!formData.custShipAddId) errors.custShipAddId = "Machine Location is required.";
  if (!formData.mcnId) errors.mcnId = "Machine Serial Number is required.";
  if (!formData.prblmDesc) errors.prblmDesc = "Problem Description is required.";
  if (!formData.remarks) errors.remarks = "Remarks is required.";
  if (!formData.regionalId) errors.regionalId = "Region is required.";
  if (!formData.branchId) errors.branchId = "Branch is required.";
  if (!formData.locId) errors.locId = "Location is required.";
  if (!formData.empAssignId) errors.empAssignId = "Assigned Employee is required.";

  return errors;
};
