import React, { useState } from 'react'
import { useSearch } from '../../context/search'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const {data} = await axios.get(
                `${process.env.REACT_APP_API}/api/product/search/${values.keyword}`
            );
            console.log(data);
            // setValues({...values, results: data});
            setValues((values) => ({ ...values, results: data }));
            console.log(values)
            // console.log(results:data)
            navigate("/search");
        }catch(error){
            console.log(error);
        }
    }

  return (
    <div>
        <form classname="d-flex" role="search" onSubmit={handleSubmit}>
            <input
                classname="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={values.keyword}
                onChange={(e) => setValues({...values, keyword: e.target.value})}
                style={{ borderRadius: '5px', marginRight: '10px', padding: '5px' }}
            />
            <button classname="btn btn-outline-success" type="submit" style={{ borderRadius: '5px', padding: '5px 10px', backgroundColor: '#42ba96', color: 'white', border: 'none' }}>
                Search
            </button>
        </form>
    </div>
  )
}

export default SearchInput