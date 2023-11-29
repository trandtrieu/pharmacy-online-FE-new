import axios from "axios";

const Discountcodde_API_URL =
  "http://localhost:8080/pharmacy-online/discount-code/";

export const getAllDiscountCodeById = (id, accessToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return axios.get(`${Discountcodde_API_URL}list/${id}`, config);
};

export const getAllDiscountCode = (accessToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return axios.get(`${Discountcodde_API_URL}allDiscount`, config);
};

export const addDiscountToAccount = (accessToken, accountId, discountId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return axios.get(
    `${Discountcodde_API_URL}dtoa/${discountId}/${accountId}`,
    config
  );
};
