import axios from 'axios';

export const fetchCategoryCount = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/api/category/count-category`);
    return response.data.categoryCount;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchProductCount = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/api/product/count-product`);
    return response.data.productCount;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
