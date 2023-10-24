import React, { useEffect, useState, useRef  } from 'react';
// import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import toast from 'react-hot-toast';
import '../../styles/AdminDashboard.css'
import Chart from 'chart.js/auto';
import Layout2 from '../../components/Layout/Layout2';


const AdminDashboard = () => {
  const [auth] = useAuth();
  const [categoryCount, setCategoryCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const fetchDataCategoryCount = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/category/count-category`);
      if (response.data?.success) {
        setCategoryCount(response.data.categoryCount); 
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong in getting category count');
    }
  };

  const fetchDataProductCount = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/product/count-product`);
      if (response.data?.success) {
        setProductCount(response.data.productCount); // Thay đổi để lấy categoryCount từ response
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong in getting category count');
    }
  };

  useEffect(() => {
    fetchDataCategoryCount(); 
    fetchDataProductCount();

    if (chartRef.current) {
      // Check if a chart instance already exists and destroy it
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
    
  }, [categoryCount, productCount]);

  const data = {
    labels: ['Category Count', 'Product Count'],
    datasets: [
      {
        label: 'Counts',
        backgroundColor: ['#007BFF', '#28A745'],
        borderColor: ['#007BFF', '#28A745'],
        borderWidth: 1,
        hoverBackgroundColor: ['#0056b3', '#218838'],
        hoverBorderColor: ['#0056b3', '#218838'],
        data: [categoryCount, productCount],
      },
    ],
  };
  
  return (
    <Layout2>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            {/* <div className="card w-75 p-3"> */}
              {/* <h3>Admin Name: {auth?.user?.name}</h3>
              <h3>Admin Email: {auth?.user?.email}</h3>
              <h3>Admin Contact: {auth?.user?.phone}</h3> */}
              <div className="grid-container">
                <div className="row">
                  <div className="col-md-4">
                    <div className="card mb-3 card-category">
                      <div className="card-body">
                        <h5 className="card-title">Total Categories</h5>
                        <p className="card-text">{categoryCount}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card mb-3 card-product">
                      <div className="card-body">
                        <h5 className="card-title">Total Products</h5>
                        <p className="card-text">{productCount}</p>
                      </div>
                    </div>
                  </div>
                  {/* Add more cards here */}
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="chart-container">
                      <canvas ref={chartRef}></canvas>
                    </div>
                  </div>
                </div>
              </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </Layout2>
  );
};

export default AdminDashboard;
