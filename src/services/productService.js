import API from "../api"

// Get products (with search, filter, sort, pagination)
export const fetchProducts = async (params = {}) => {
  console.log("Fetching products from:", API.defaults.baseURL + "/api/products/all-products");

  const res = await API.get("/api/products/all-products", { params });
  const data = res.data.productDetails;
  console.log("Fetched data:", data);

  console.log("Fetched data:", data); // 

  return res.data.productDetails || null; // { items, total, page, pageSize, totalPages } 
};

// Get single product details
export const fetchProductById = async (id) => {
  const res = await API.get(`/api/products/get-single-product/${id}`);
  return res.data.productDetails; // product object
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
