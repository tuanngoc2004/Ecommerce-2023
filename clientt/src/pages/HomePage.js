import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import { useNavigate } from 'react-router-dom'
// import { useAuth } from '../context/auth'
import axios from 'axios'
import {Checkbox, Radio} from 'antd'
import { Prices } from '../components/Prices'
import { useCart } from '../context/cart'
import { toast } from 'react-hot-toast'

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

  return (
    <Layout title={"All Products - Best offers"}>
      <div className="row mt-3">
        <div className="col-md-2">
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
                    <img src={`${process.env.REACT_APP_API}/api/product/product-photo/${p.id}?${Date.now()}`} alt={p.name} className="card-img-top" />
                    <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">
                          {p.description.substring(0, 30)}...
                        </p>
                        <p className="card-text"> $ {p.price}</p>
                        <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                        <button className="btn btn-secondary ms-1" 
                          onClick={() => {
                              setCart([...cart, p])
                              localStorage.setItem("cart", JSON.stringify([...cart, p]));
                              toast.success("Item Added to Cart");
                          }}>
                            ADD TO CART
                        </button>
                    </div>
                </div>
            ))}
          </div>
          <div className='m-2 p-3'>
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
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