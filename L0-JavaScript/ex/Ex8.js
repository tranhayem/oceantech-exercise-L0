export const fetchProvinces = async () => {
  try {
    const response = await fetch("https://provinces.open-api.vn/api/");
    if (!response.ok) {
      throw new Error("Failed to fetch provinces");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
