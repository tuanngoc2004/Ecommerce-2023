import React,{useEffect, useState} from 'react'
// import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from "antd";
import LayoutAdmin from '../../components/Layout/LayoutAdmin';


const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    //handle form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const {data} = await axios.post(`${process.env.REACT_APP_API}/api/category/create-category`, {
                name,
            });
            if(data?.success) {
                // toast.success(`${data.name} is created`);
                toast.success(`${name} is created`);
                getAllCategory();
            }else{
                toast.error(data.message)
            }
        }catch(error){
            console.log(error);
            toast.error('something went wrong in input form')
        }
    }

    //get All cat
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
    },[])

    //update category 
    const handleUpdated = async (e) => {
        e.preventDefault();
        try{
            const {data} = await axios.put(
                `${process.env.REACT_APP_API}/api/category/update-category/${selected.id}`,
                {name: updatedName}
            );
            if(data.success){
                toast.success(`${updatedName} is updated successfully`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
            }else{
                toast.error(data.message);
            }
        }catch(error){
            toast.error('Something went wrong');
        }
    }

    //delete category 
    const handleDelete = async (pId) => {
        try{
            const {data} = await axios.delete(
                `${process.env.REACT_APP_API}/api/category/delete-category/${pId}`
            );
            if(data.success){
                toast.success(`Category is deleted`);

                getAllCategory();
            }else{
                toast.error(data.message);
            }
        }catch(error){
            toast.error('Something went wrong');
        }
    }
    

  return (
    <LayoutAdmin title={"Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
                <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
            </div>
            <div className='w-75'>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories?.map(c => (
                            <>
                            <tr>
                                <td key={c.id}>{c.name}</td>                              
                                <td>
                                    <button 
                                        className="btn btn-primary ms-2" 
                                        style={{ width: '70px', height: '39px', textAlign: 'center', marginBottom: '10px' }}
                                        onClick={() => {
                                            setVisible(true); 
                                            setUpdatedName(c.name)
                                            setSelected(c);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button className="btn btn-danger ms-2" 
                                        style={{ marginTop: '11px' }}
                                        onClick={() => {handleDelete(c.id)}}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                            </>
                            ))}
                    </tbody>
                </table>
            </div>
            <Modal onCancel={() => setVisible(false)} 
                footer={null} 
                visible={visible}
            >
                <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdated} />
            </Modal>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  )
}

export default CreateCategory