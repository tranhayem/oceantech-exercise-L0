export const getDistrictsByProvinceID = async (provinceID) => {
  try {
    const response = await fetch(`https://provinces.open-api.vn/api/d/`);
    if (!response.ok) {
      throw new Error("Failed to fetch districts");
    }
    const data = await response.json();
    return data.filter((district) => district.province_code === provinceID);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getWardsByDistrictsID = async (districtID) => {
  try {
    const response = await fetch(`https://provinces.open-api.vn/api/w/`);
    if (!response.ok) {
      throw new Error("Failed to fetch wards");
    }
    const data = await response.json();
    return data.filter((ward) => ward.district_code === districtID);
  } catch (error) {
    console.error(error);
    return [];
  }
};
