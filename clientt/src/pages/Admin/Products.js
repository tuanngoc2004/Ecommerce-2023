import React, { useState, useEffect } from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
// import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Layout2 from '../../components/Layout/LayoutAdmin';
import './Products.scss'

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState(""); // Thêm state để lưu từ khóa tìm kiếm


  const perPage = 6; // Số lượng sản phẩm trên mỗi trang

  // Hàm lấy danh sách sản phẩm dựa trên trang hiện tại
  const getProductsByPage = async (page) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/product-listt/${page}`
      );
      setProducts(data.products);
      setCurrentPage(page);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  // Hàm lấy tổng số sản phẩm
  const getProductCount = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/product-countt`
      );
      setTotalProducts(data.productCount);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  // Hàm tìm kiếm sản phẩm dựa trên từ khóa
  const searchProducts = async (keyword) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/search?keyword=${keyword}`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  // Hàm xử lý sự kiện thay đổi hộp văn bản tìm kiếm
  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
    if (event.target.value === "") {
      // Nếu hộp văn bản trống rỗng, hiển thị lại toàn bộ sản phẩm
      getProductsByPage(currentPage);
    } else {
      // Ngược lại, tìm kiếm sản phẩm dựa trên từ khóa
      searchProducts(event.target.value);
    }
  };

  // Hàm chuyển trang
  const handlePageChange = (newPage) => {
    getProductsByPage(newPage);
  };

  useEffect(() => {
    getProductsByPage(currentPage);
    getProductCount();
  }, [currentPage]);

  return (
    <Layout2>
      <div className="row">
        <div className="col md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Search by product name"
              value={searchKeyword}
              onChange={handleSearchChange}
            />
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                {/* <th>Description</th> */}
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  {/* <td>{p.description.slice(0, 200)}...</td> */}
                  <td>
                    <img
                      src={`${process.env.REACT_APP_API}/api/product/product-photo/${p.id}?${Date.now()}`}
                      alt={p.name}
                      style={{ width: '100px', height: 'auto' }}
                    />
                  </td>
                  <td>
                    <Link
                      to={`/dashboard/admin/product/${p.slug}`}
                      className="btn btn-primary"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            <div className="pagination justify-content-center">
                <ul className="pagination">
                    {Array.from({ length: Math.ceil(totalProducts / perPage) }, (_, i) => (
                    <li
                        key={i}
                        className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                    >
                        <button
                        className="page-link"
                        onClick={() => handlePageChange(i + 1)}
                        >
                        {i + 1}
                        </button>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
      </div>
    </Layout2>
  );
};

export default Products;


