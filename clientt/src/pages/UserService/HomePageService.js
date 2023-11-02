// apiService.js (chỉ sửa phần liên quan đến trang HomePage)

import axios from 'axios';

export const getCategories = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/category/get-category`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getProductList = async (page) => {
    const API = axios.create({
        baseURL: process.env.REACT_APP_API,
    });

    try {
        const response = await API.get(`/api/product/product-list/${page}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getProductCount = async () => {
    const API = axios.create({
        baseURL: process.env.REACT_APP_API,
    });

    try {
        const response = await API.get('/api/product/product-count');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const filterProducts = async (checked, radio) => {
  const API = axios.create({
    baseURL: process.env.REACT_APP_API,
  });

  try {
    const response = await API.post('/api/product/product-filters', { checked, radio });
    return response.data;
  } catch (error) {
    throw error;
  }
};
