import React, { useState, useEffect } from 'react';
import toast from "react-hot-toast";
import axios from "axios";
import AdminMenu from '../../components/Layout/AdminMenu';
import { Select } from 'antd';
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import LayoutAdmin from '../../components/Layout/LayoutAdmin';
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    shipping: "",
    photo: "",
  });

  // Get All Categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong in getting all categories');
    }
  }

  useEffect(() => {
    getAllCategory();
  }, []);

  // Create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      for (const key in product) {
        if (key === 'category') {
          productData.append('category_id', product.category);
        } else {
          productData.append(key, product[key]);
        }
      }
      
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/product/create-product`,
        productData
      );

      if (response.data.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <LayoutAdmin title={"Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size='large'
                showSearch
                className='form-select mb-3'
                onChange={(value) => setProduct({ ...product, category: value })}
              >
                {categories?.map(c => (
                  <Option key={c.id} value={c.id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className='btn btn-outline-secondary col-md-12'>
                  {product.photo ? product.photo.name : "Upload photo"}
                  <input
                    type="file"
                    name="photo"
                    accept='image/*'
                    onChange={(e) => setProduct({ ...product, photo: e.target.files[0] })}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {product.photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(product.photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={product.name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setProduct({ ...product, name: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <CKEditor
                  editor={ClassicEditor}
                  data={product.description}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setProduct({ ...product, description: data });
                  }}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={product.price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setProduct({ ...product, price: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={product.quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
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
                    setProduct({ ...product, shipping: value });
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  )
}

export default CreateProduct;




// import React, {useState, useEffect} from 'react'
// import toast from "react-hot-toast";
// import axios from "axios";
// import AdminMenu from '../../components/Layout/AdminMenu'
// // import Layout from '../../components/Layout/Layout'
// import {Select} from 'antd'
// import { useNavigate } from "react-router-dom";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import Layout2 from '../../components/Layout/LayoutAdmin';
// const {Option} = Select

// const CreateProduct = () => {
//     const navigate = useNavigate();
//     const [categories, setCategories] = useState([]);
//     const [name, setName] = useState("");
//     const [description, setDescription] = useState("");
//     const [price, setPrice] = useState("");
//     const [category, setCategory] = useState("");
//     const [quantity, setQuantity] = useState("");
//     const [shipping, setShipping] = useState("");
//     const [photo, setPhoto] = useState("");


//     //get All Product
//     const getAllCategory = async () => {
//         try {
//             const {data} = await axios.get(`${process.env.REACT_APP_API}/api/category/get-category`);
//             if(data?.success){
//                 setCategories(data?.category);
//             }
//         }catch(err){
//             console.error(err);
//             toast.error('Something went wrong in getting all categories');
//         }
//     }

//     useEffect(() => {
//         getAllCategory();   
//     },[]);

//     //create product function

// const handleCreate = async (e) => {
//     e.preventDefault();
//     try {
//         const productData = new FormData();
//         productData.append("name", name);
//         productData.append("description", description);
//         productData.append("price", price);
//         productData.append("quantity", quantity);
//         productData.append("photo", photo);
//         productData.append("category_id", category); // Change "category" to "category_id"
//         productData.append("shipping", shipping); // Add "shipping" to FormData
    
//         const response = await axios.post(
//         `${process.env.REACT_APP_API}/api/product/create-product`,
//         productData
//         );
    
//         if (response.data.success) {
//             toast.success("Product Created Successfully");
//             navigate("/dashboard/admin/products");
//         } else {
//             toast.error(response.data.message);
//         }
//     } catch (error) {
//       if (error.response) {
//         toast.error(error.response.data.message);
//       } else {
//           console.log(error);
//           toast.error("Something went wrong");
//       }
//     }
// };


//   return (
//     <Layout2 title={"Dashboard - Create Category"}>
//       <div className="container-fluid m-3 p-3">
//         <div className="row">
//           <div className="col-md-3">
//             <AdminMenu />
//           </div>
//           <div className="col-md-9">
//             <h1>Create Product</h1>
//             <div className="m-1 w-75">
//                 <Select bordered={false}
//                     placeholder="Select a category"
//                     size='large'
//                     showSearch
//                      className='form-select mb-3' onChange={(value) => {setCategory(value)}}>
//                     {categories?.map(c => (
//                         <Option key={c.id} value={c.id}>
//                             {c.name}
//                         </Option>
//                     ))}
//                 </Select>
//                 <div className="mb-3">
//                     <label className='btn btn-outline-secondary col-md-12'>
//                         {photo ? photo.name : "Upload photo"} 
//                         <input 
//                             type="file" 
//                             name="photo" 
//                             accept='image/*' 
//                             onChange={(e) => setPhoto(e.target.files[0])} 
//                             hidden
//                         />
//                     </label>
//                 </div>
//                 <div className="mb-3">
//                 {photo && (
//                   <div className="text-center">
//                     <img
//                       src={URL.createObjectURL(photo)}
//                       alt="product_photo"
//                       height={"200px"}
//                       className="img img-responsive"
//                     />
//                   </div>
//                 )}
//                 </div>
//                 <div className="mb-3">
//                 <input
//                   type="text"
//                   value={name}
//                   placeholder="write a name"
//                   className="form-control"
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>
//               <div className="mb-3">
//                 {/* <textarea
//                   type="text"
//                   value={description}
//                   placeholder="write a description"
//                   className="form-control"
//                   onChange={(e) => setDescription(e.target.value)}
//                 /> */}
//                 <CKEditor
//                   editor={ClassicEditor}
//                   data={description}
//                   onChange={(event, editor) => {
//                     const data = editor.getData();
//                     setDescription(data);
//                   }}
//                 />
//               </div>

//               <div className="mb-3">
//                 <input
//                   type="number"
//                   value={price}
//                   placeholder="write a Price"
//                   className="form-control"
//                   onChange={(e) => setPrice(e.target.value)}
//                 />
//               </div>
//               <div className="mb-3">
//                 <input
//                   type="number"
//                   value={quantity}
//                   placeholder="write a quantity"
//                   className="form-control"
//                   onChange={(e) => setQuantity(e.target.value)}
//                 />
//               </div>
//               <div className="mb-3">
//                 <Select
//                   bordered={false}
//                   placeholder="Select Shipping "
//                   size="large"
//                   showSearch
//                   className="form-select mb-3"
//                   onChange={(value) => {
//                     setShipping(value);
//                   }}
//                 >
//                   <Option value="0">No</Option>
//                   <Option value="1">Yes</Option>
//                 </Select>
//               </div>
//               <div className="mb-3">
//                 <button className="btn btn-primary" onClick={handleCreate}>
//                   CREATE PRODUCT
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout2>
//   )
// }

// export default CreateProduct














