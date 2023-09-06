import React, {useState, useEffect} from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);

    //getAll products
    const getAllProducts = async () => {
        try{
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/product/get-product`);
            setProducts(data.products)
        }catch(error){
            console.log(error);
            toast.error('Something went wrong')
        }
    }

    //lifecycle method
    useEffect(() => {
        getAllProducts();   
    }, []);

  return (
    <Layout>
        <div className="row">
            <div className="col md-3">
                <AdminMenu />
            </div>
            <div className="col-md-9">
                <h1 className="text-center">All Products List</h1>
                <div className="d-flex">
                    {products?.map(p => (
                        <Link 
                            key={p.id} 
                            to={`/dashboard/admin/product/${p.slug}`}
                            className='product-link'
                        >
                            <div className="card m-2" style={{ width:"18rem" }}>
                                <img src={`${process.env.REACT_APP_API}/api/product/product-photo/${p.id}?${Date.now()}`} alt={p.name} className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description}</p>
                                </div>
                            </div>
                        </Link>
                        
                    ))}
                </div>    
            </div>
        </div>
    </Layout>
  )
}

export default Products