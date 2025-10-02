import API from "../api"

// Get products (with search, filter, sort, pagination)
export const fetchProducts = async (params = {}) => {
  console.log("Fetching products from:", API.defaults.baseURL + "/products/all-products");

  const res = await API.get("/products/all-products", { params });
  return res.data; // { items, total, page, pageSize, totalPages } 
};

// Get single product details
export const fetchProductById = async (id) => {
  const res = await API.get(`/products/get-single-product/${id}`);
  return res.data; // product object
};


// import axios from "axios";

// const API_URL = "http://localhost:5002/api/all-products";

// export const fetchProducts = async () => {
//   const res = await axios.get(API_URL);
//   return res.data;
// };

// export const fetchProductById = async (id) => {
//   const res = await axios.get(`${API_URL}/${id}`);
//   return res.data;
// };
