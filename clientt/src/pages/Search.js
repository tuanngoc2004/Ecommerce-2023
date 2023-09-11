import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/search'
import { useNavigate } from 'react-router-dom'

const Search = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    // useEffect(() => {
    //     console.log(values); // Check the values being set
    // }, [values]);
    console.log(values);
    return (
        <Layout title={'Search Result'}>
            <div className="container">
                <div className="text-center">
                    <h1>Search Result</h1>
                    <h6>
                        {values?.results?.length < 1 ? "No Products Found" 
                        : `Found ${values?.results.length}`}    
                    </h6>
                    <div className="d-flex flex-wrap">
                        {Array.isArray(values?.results) &&
                            values?.results.map((p) => (
                                <div className="card m-2" style={{ width:"20rem" }} key={p.id}>
                                    <img src={`${process.env.REACT_APP_API}/api/product/product-photo/${p.id}?${Date.now()}`} alt={p.name} className="card-img-top" />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">
                                            {p.description.substring(0, 30)}...
                                        </p>
                                        <p className="card-text"> $ {p.price}</p>
                                        <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                        <button className="btn btn-secondary ms-1">ADD TO CART</button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Search;
