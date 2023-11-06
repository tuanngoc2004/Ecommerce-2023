import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
// import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./ProductDetailsStyles.scss";
// import CKEditor from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from 'react-html-parser';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';
import { useProductDetails } from '../hooks/useProductDetails';

const ProductDetails = () => {
  const params = useParams();
  // const [product, setProduct] = useState({});
  // const [category, setCategory] = useState({});
  // const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart(); // Import the cart state and setter

  // //initalp details
  // useEffect(() => {
  //   if (params?.slug) getProduct();
  // }, [params?.slug]);

  // const getProduct = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_API}/api/product/get-product/${params.slug}?${Date.now()}`
  //     );
  //     setProduct(data?.product);

  //     if (data?.product?.category_id) {
  //       try {
  //         const categoryId = data.product.category_id;
  //         const categoryResponse = await axios.get(
  //           `${process.env.REACT_APP_API}/api/category/singlee-category/${categoryId}?${Date.now()}`
  //         );
  //         if (categoryResponse.status === 200) {
  //           setCategory(categoryResponse.data?.category);
  //           // Call the function to get related products here
  //           getRelatedProducts(data.product.id, categoryId);
  //         } else {
  //           setCategory({ name: 'Category Not Found' }); // Handle category not found
  //         }
  //       } catch (error) {
  //         console.error(error);
  //         setCategory({ name: 'Category Error' }); // Handle category request error
  //       }
  //     } else {
  //       // Handle case where category_id is not provided in product data
  //       setCategory({ name: 'Category Not Provided' });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // // Function to get related products
  // const getRelatedProducts = async (productId, categoryId) => {
  //   try {
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_API}/api/product/related-product/${productId}/${categoryId}?${Date.now()}`
  //     );
  //     setRelatedProducts(data?.products);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const addToCart = (product) => {
    const productInCart = cart.find((item) => item.id === product.id);

    if (productInCart) {
      // Sản phẩm đã tồn tại trong giỏ hàng, không thêm nữa
      toast.error("This item is already in your cart");
    } else {
      // Sản phẩm chưa tồn tại trong giỏ hàng, thêm vào giỏ hàng với số lượng mặc định là 1
      const productWithQuantity = { ...product, quantity: 1 }; // Set quantity to 1
      setCart([...cart, productWithQuantity]);
      localStorage.setItem("cart", JSON.stringify([...cart, productWithQuantity]));
      toast.success("Item Added to Cart");
    }
  }

  const { product, category, relatedProducts } = useProductDetails(params.slug);

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
                // style={{ maxWidth: '100%', maxHeight: '300px' }} 
            />
            </div>
            <div className="col-md-6 product-details-info">
            <h1 className="text-center">Product Details</h1>
            <h6>Name : {product.name}</h6>
            <h6>Description : {ReactHtmlParser(product.description)}</h6>
            <h6>
              Price :
              {product?.price?.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </h6>
            <h6>Category : {category?.name}</h6>
            <button className="btn btn-secondary ms-1" onClick={() => addToCart(product)}>ADD TO CART</button>
            </div>
        </div>
        <hr />
        <div className="row container similar-products">
          <h4>Similar Products ➡️</h4>
          {relatedProducts.length < 1 && <p className='text-center'>No similar product found</p>}
          <div className="d-flex flex-wrap">
            {relatedProducts?.map((p) => (
                <div className="card m-2" style={{ width:"18rem" }}>
                    <a href={`/product/${p.slug}`}>
                      <img src={`${process.env.REACT_APP_API}/api/product/product-photo/${p.id}?${Date.now()}`} alt={p.name} className="card-img-top" />
                    </a>
                    <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">
                          {p.description.substring(0, 30)}...
                        </p>
                        <p className="card-text"> Price: {p.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}</p>
                        <button
                          className="btn btn-dark ms-1"
                          onClick={() => addToCart(p)}
                        >
                          ADD TO CART
                        </button>
                    </div>
                </div>
            ))}
          </div>
        </div>
      
    </Layout>
  );
};

export default ProductDetails;

 