import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import { useNavigate } from 'react-router-dom'
// import { useAuth } from '../context/auth'
import axios from 'axios'
import { AiOutlineReload } from "react-icons/ai"; 
import {Checkbox, Radio} from 'antd'
import { Prices } from '../components/Prices'
import { useCart } from '../context/cart'
import { toast } from 'react-hot-toast'
import "../styles/Homepage.css";
import ReactHtmlParser from 'react-html-parser';
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper-bundle.min.css'; // Import CSS for Swiper
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
// import { Pagination, Navigation } from "swiper";

const HomePage = () => {
  // const [auth, setAuth] =useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);


  //get All cat
  const getAllCategory = async () => {
    try {
        const {data} = await axios.get(`${process.env.REACT_APP_API}/api/category/get-category`);
        if(data?.success){
            setCategories(data?.category);
        }
    }catch(err){
        console.error(err);
    }
  }


  useEffect(() => {
      getAllCategory();   
      getTotal();
  },[])

  //get products
  const getAllProducts = async () => {
    try{
      setLoading(true);
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    }catch(err){
      setLoading(false);
      console.log(err);
    }
  }

  //get total count
  const getTotal = async () => {
    try{
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/product/product-count`);
      setTotal(data?.total)
    }catch(error){
      console.error(error);
    }
  }

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //filter by cat
  const handleFilter = (value,id) => {
    let all = [...checked]
    if(value){
      all.push(id)
    }else{
      all = all.filter(c => c !== id )
    }
    setChecked(all);
  }

  // useEffect(() => {
  //   if (!checked.length || !radio.length) getAllProducts(); 
  // }, [checked.length, radio.length]);

  // useEffect(() => {
  //   if (checked.length || radio.length) filterProduct(); 
  // }, [checked, radio]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      getAllProducts();
    } else {
      
    filterProduct();
    }
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    }
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try{
      const {data} = await axios.post(`${process.env.REACT_APP_API}/api/product/product-filters`,{checked,radio})
      setProducts(data?.products)
    }catch(error){
    console.error(error);
    }
  }

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
  

  return (
    <Layout title={"All Products - Best offers"}>
      {/* banner image */}
      <img
        src="/images/banner.png"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />

      <h1 className="text-center mt-3" style={{ fontSize: '40px', color: 'gray', fontFamily: 'Playfair Display, serif' }}>New Products</h1>

      <div className="d-flex flex-wrap">
        <Swiper
          spaceBetween={18} // Khoảng cách giữa các slide
          slidesPerView={4} // Số lượng slide hiển thị trên màn hình
          loop={true}
          pagination={{ clickable: true }}
          navigation={true}
          className="mySwiper"
        >
          
        {products?.map((p) => (
            <SwiperSlide key={p.id}>
                <div className="card m-2" style={{ width: "18rem" }}>
                  <a href={`/product/${p.slug}`}>
                      <img
                          src={`${process.env.REACT_APP_API}/api/product/product-photo/${p.id}?${Date.now()}`}
                          alt={p.name}
                          className="card-img-top"
                      />
                  </a>    
                    <div className="card-body">
                        <h5 className="card-title">{p.name.substring(0, 40)}...</h5>
                        <p className="card-text">
                          {p.price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </p>
                        <button
                            className="btn btn-info ms-1"
                            onClick={() => navigate(`/product/${p.slug}`)}
                        >
                            More Details
                        </button>
                        <button
                            className="btn btn-dark ms-1"
                            onClick={() => addToCart(p)}
                        >
                            ADD TO CART
                        </button>
                    </div>
                </div>
            </SwiperSlide>
        ))}

        </Swiper>
      </div>

      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-3 filters">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
          {categories?.map(c => (
            <Checkbox key={c.id} onChange={(e) => handleFilter(e.target.checked, c.id)}>
              {c.name}
            </Checkbox>
          ))}
          </div>

            {/* price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={e => setRadio(e.target.value)}>
              {Prices?.map(p => (
                <div key={p.id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button className="btn btn-danger" onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
          
        </div>
        <div className="col-md-9">
          {/* {JSON.stringify(radio, null, 4)} */}
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
                <div className="card m-2" style={{ width:"18rem" }}>
                    <a href={`/product/${p.slug}`}>
                      <img src={`${process.env.REACT_APP_API}/api/product/product-photo/${p.id}?${Date.now()}`} alt={p.name} className="card-img-top" />
                    </a>
                    <div className="card-body">
                        <h5 className="card-title">{p.name.substring(0, 40)}...</h5>
                        {/* <p className="card-text">
                          {ReactHtmlParser(p.description.substring(0, 30))}...
                        </p> */}
                        {/* <p className="card-text">  {p.price} VNĐ</p> */}
                        <p className="card-text">
                          {p.price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </p>
                        <button
                          className="btn btn-info ms-1"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          More Details
                        </button>
                        {/* <button className="btn btn-dark ms-1" 
                          onClick={() => {
                              setCart([...cart, p])
                              localStorage.setItem("cart", JSON.stringify([...cart, p]));
                              toast.success("Item Added to Cart");
                          }}>
                            ADD TO CART
                        </button> */}
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
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
        {/* <h1>HomePage</h1>
        <pre>{JSON.stringify(auth, null, 4)}</pre> */}
    </Layout>
  )
}

export default HomePage