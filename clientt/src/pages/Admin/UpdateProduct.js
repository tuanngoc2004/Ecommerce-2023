import React, {useState, useEffect} from 'react'
import toast from "react-hot-toast";
import axios from "axios";
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout2 from '../../components/Layout/LayoutAdmin';
import {Select} from 'antd'
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const {Option} = Select

const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");

    //get single product
    const getSingleProduct = async () => {
        try{
            const {data} = await axios.get(
                `${process.env.REACT_APP_API}/api/product/get-product/${params.slug}`
            );
            setName(data.product.name);
            setId(data.product.id);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setQuantity(data.product.quantity);
            setShipping(data.product.shipping);
            setCategory(data.product.category_id);
        }catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        getSingleProduct(); 
        //eslint-disable-next-line  
    }, [])

    //get All Product
    const getAllCategory = async () => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/category/get-category`);
            if(data?.success){
                setCategories(data?.category);
            }
        }catch(err){
            console.error(err);
            toast.error('Something went wrong in getting all categories');
        }
    }

    useEffect(() => {
        getAllCategory();   
    },[]);

    //update product function

    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log(description);
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            photo && productData.append("photo", photo);
            productData.append("category_id", category); // Change "category" to "category_id"
            productData.append("shipping", shipping); // Add "shipping" to FormData
        
            const response = await axios.put(
            `${process.env.REACT_APP_API}/api/product/update-product/${id}`,
            productData
            );
        
            if (response.data.success) {
                toast.success("Product Updated Successfully");
                navigate("/dashboard/admin/products");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    //delete a product
    const handleDelete = async () => {
        try {
            let answer = window.prompt('Are you sure you want to delete?');
            if(!answer) return;
            const {data} = await axios.delete(
                `${process.env.REACT_APP_API}/api/product/delete-product/${id}`
            );
            toast.success('Product deleted successfully');
            navigate('/dashboard/admin/products')
        }catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }


  return (
    <Layout2 title={"Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
                <Select bordered={false}
                    placeholder="Select a category"
                    size='large'
                    showSearch
                     className='form-select mb-3' 
                     onChange={(value) => {
                        setCategory(value);
                    }}
                    value={category}
                    >
                    {categories?.map(c => (
                        <Option key={c.id} value={c.id}>
                            {c.name}
                        </Option>
                    ))}
                </Select>
                <div className="mb-3">
                    <label className='btn btn-outline-secondary col-md-12'>
                        {photo ? photo.name : "Upload photo"} 
                        <input 
                            type="file" 
                            name="photo" 
                            accept='image/*' 
                            onChange={(e) => setPhoto(e.target.files[0])} 
                            hidden
                        />
                    </label>
                </div>
                <div className="mb-3">
                {/* {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ): (
                    <div className="text-center">
                        <img
                        src={`${process.env.REACT_APP_API}/api/product/product-photo/${id}?${Date.now()}`}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-responsive"
                        />
                    </div>
                )} */}

                  {photo ? (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  ) : (
                    id ? (
                      <div className="text-center">
                        <img
                          src={`${process.env.REACT_APP_API}/api/product/product-photo/${id}?${Date.now()}`}
                          alt="product_photo"
                          height={"200px"}
                          className="img img-responsive"
                        />
                      </div>
                    ) : null
                  )}
                </div>
                <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <CKEditor
                  editor={ClassicEditor}
                  data={description}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setDescription(data);
                  }}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                    bordered={false}
                    placeholder="Select Shipping "
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    onChange={(value) => {
                        setShipping(Number(value)); // Convert back to number before setting in state
                  }}
                    value={shipping.toString()} 
                >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  Update PRODUCT
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout2>
  )
}

export default UpdateProduct