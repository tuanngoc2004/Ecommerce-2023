import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminMenu.scss';   // Import tệp CSS

const AdminMenu = () => {
  return (
    <div className="admin-menu">
      <h4 className="admin-menu-title">Admin Panel</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <NavLink to="/dashboard/admin/" className="nav-link">
            Admin Dashboard
          </NavLink>
        </li>
        <li className="list-group-item">
          <NavLink to="/dashboard/admin/create-category" className="nav-link">
            Create Category
          </NavLink>
        </li>
        <li className="list-group-item">
          <NavLink to="/dashboard/admin/create-product" className="nav-link">
            Create Product
          </NavLink>
        </li>
        <li className="list-group-item">
          <NavLink to="/dashboard/admin/products" className="nav-link">
            Products
          </NavLink>
        </li>
        <li className="list-group-item">
          <NavLink to="/dashboard/admin/orders" className="nav-link">
            Orders
          </NavLink>
        </li>
        <li className="list-group-item">
          <NavLink to="/dashboard/admin/users" className="nav-link">
            Users
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminMenu;


// import React from 'react'
// import { NavLink } from "react-router-dom";
// import '../../styles/AdminMenu.css'

// const AdminMenu = () => {
//   return (
//     <>
//         <div className="text-center">
//             <div className="list-group">
//                 <h4>Admin Panel</h4>
//                 <NavLink
//                 to="/dashboard/admin/create-category"
//                 className="list-group-item list-group-item-action"
//                 >
//                 Create Category
//                 </NavLink>
//                 <NavLink
//                 to="/dashboard/admin/create-product"
//                 className="list-group-item list-group-item-action"
//                 >
//                 Create Product
//                 </NavLink>
//                 <NavLink
//                 to="/dashboard/admin/products"
//                 className="list-group-item list-group-item-action"
//                 >
//                 Products
//                 </NavLink>
//                 <NavLink
//                 to="/dashboard/admin/orders"
//                 className="list-group-item list-group-item-action"
//                 >
//                 Orders
//                 </NavLink>
//                 <NavLink
//                 to="/dashboard/admin/users"
//                 className="list-group-item list-group-item-action"
//                 >
//                 Users
//                 </NavLink>
//             </div>
//         </div>
//     </>
//   )
// }

// export default AdminMenu