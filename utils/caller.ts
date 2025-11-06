import axios from "./axios";

export const getProductVariations = async (identifier: string) => {
  const response = await axios.get(`/bills/products/${identifier}`);
  return response.data;
};

export const payForPlan = async (data: any, token: string) => {
  const response = await axios.post(`/bills/pay`, data);
  return response.data;
};

export const getProducts = async (identifier: string) => {
  const response = await axios.get(`/bills/products?identifier=${identifier}`);
  return response.data;
};

export const verifyIUC = async (data: any) => {
  const response = await axios.post(`/bills/verify`, data);
  return response.data;
};
