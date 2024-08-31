const baseUrl = "https://provinces.open-api.vn/api";

const fetchData = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching data:", err);
    return null;
  }
};

export const getProvinceData = () => fetchData(`${baseUrl}/p`);

export const getDistrictsByProvinceID = (provinceId) =>
  fetchData(`${baseUrl}/p/${provinceId}?depth=2`).then(
    (data) => data?.districts || []
  );

export const getWardsByDistrictsID = (districtId) =>
  fetchData(`${baseUrl}/d/${districtId}?depth=2`).then(
    (data) => data?.wards || []
  );

export const loadDistrictData = getDistrictsByProvinceID;

export const loadWardData = getWardsByDistrictsID;
