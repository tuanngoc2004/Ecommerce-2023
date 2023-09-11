import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../styles/ProductDetailsStyles.css";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/get-product/${params.slug}?${Date.now()}`
      );
      setProduct(data?.product);
      
      if (data?.product?.category_id) {
        try {
          const categoryId = data.product.category_id;
          const categoryResponse = await axios.get(
            `${process.env.REACT_APP_API}/api/category/singlee-category/${categoryId}?${Date.now()}`
          );
          if (categoryResponse.status === 200) {
            setCategory(categoryResponse.data?.category);
            // Call the function to get related products here
            getRelatedProducts(data.product.id, categoryId);
          } else {
            setCategory({ name: 'Category Not Found' }); // Handle category not found
          }
        } catch (error) {
          console.error(error);
          setCategory({ name: 'Category Error' }); // Handle category request error
        }
      } else {
        // Handle case where category_id is not provided in product data
        setCategory({ name: 'Category Not Provided' });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to get related products
  const getRelatedProducts = async (productId, categoryId) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/related-product/${productId}/${categoryId}?${Date.now()}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
        <div className="row container product-details">
            <div className="col-md-6">
            <img
                src={`${process.env.REACT_APP_API}/api/product/product-photo/${product.id}?${Date.now()}`}
                alt={product.name}
                className="card-img-top"
                height="300"
                width="350px"
            />
            </div>
            <div className="col-md-6 product-details-info">
            <h1 className="text-center">Product Details</h1>
            <h6>Name : {product.name}</h6>
            <h6>Description : {product.description}</h6>
            <h6>
              Price :
              {product?.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h6>
            <h6>Category : {category?.name}</h6>
            <button className="btn btn-secondary ms-1">ADD TO CART</button>
            </div>
        </div>
        <hr />
        <div className="row container similar-products">
          <h4>Similar Products ➡️</h4>
          {relatedProducts.length < 1 && <p className='text-center'>No similar product found</p>}
          <div className="d-flex flex-wrap">
            {relatedProducts?.map((p) => (
                <div className="card m-2" style={{ width:"18rem" }}>
                    <img src={`${process.env.REACT_APP_API}/api/product/product-photo/${p.id}?${Date.now()}`} alt={p.name} className="card-img-top" />
                    <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">
                          {p.description.substring(0, 30)}...
                        </p>
                        <p className="card-text"> $ {p.price}</p>
                        <button className="btn btn-secondary ms-1">ADD TO CART</button>
                    </div>
                </div>
            ))}
          </div>
        </div>
      
    </Layout>
  );
};

export default ProductDetails;
