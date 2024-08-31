import { getProvinceData, loadDistrictData, loadWardData } from "./Ex8.js";

const provinceSelect = document.getElementById("province");
const districtSelect = document.getElementById("district");
const wardSelect = document.getElementById("ward");

const initProvinces = async () => {
  const provinces = await getProvinceData();
  if (provinces) {
    provinces.forEach((province) => {
      const option = document.createElement("option");
      option.value = province.code;
      option.textContent = province.name;
      provinceSelect.appendChild(option);
    });
  }
};

const loadDistricts = async (provinceId) => {
  const districts = await loadDistrictData(provinceId);
  if (Array.isArray(districts)) {
    districtSelect.innerHTML =
      '<option selected disabled value="">--Chọn Huyện/Quận--</option>';
    districts.forEach((district) => {
      const option = document.createElement("option");
      option.value = district.code;
      option.textContent = district.name;
      districtSelect.appendChild(option);
    });
    districtSelect.disabled = false;
  }
};

const loadWards = async (districtId) => {
  const wards = await loadWardData(districtId);
  if (Array.isArray(wards)) {
    wardSelect.innerHTML =
      '<option selected disabled value="">--Chọn Phường/Xã--</option>';
    wards.forEach((ward) => {
      const option = document.createElement("option");
      option.value = ward.code;
      option.textContent = ward.name;
      wardSelect.appendChild(option);
    });
    wardSelect.disabled = false;
  }
};

provinceSelect.addEventListener("change", (event) => {
  const provinceId = event.target.value;
  loadDistricts(provinceId);
  wardSelect.disabled = true;
});

districtSelect.addEventListener("change", (event) => {
  const districtId = event.target.value;
  loadWards(districtId);
});

initProvinces();
