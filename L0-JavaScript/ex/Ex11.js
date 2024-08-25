export const validateAndProcessInput = (formData) => {
  const {
    firstName,
    lastName,
    phone,
    email,
    address,
    province,
    district,
    ward,
  } = formData;

  if (!firstName || !lastName || !phone || !email || !address) {
    throw new Error("All fields are required");
  }

  const fullName = `${firstName} ${lastName}`;
  const fullAddress = `${address}, ${ward}, ${district}, ${province}`;

  return {
    id: generateRandomID(),
    fullName,
    fullAddress,
    phone,
    email,
    purchaseDate: new Date().toLocaleDateString(),
  };
};
