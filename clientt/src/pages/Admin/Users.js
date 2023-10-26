import React, { useEffect, useState } from 'react'
import Layout2 from '../../components/Layout/Layout2';
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios';
import UserDetail from './UserDetails';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editedStatus, setEditedStatus] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  useEffect(() => {
    // Fetch all users
    axios.get(`${process.env.REACT_APP_API}/api/all-users`)
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleEditStatus = (userId) => {
    // Send a PUT request to update the user status
    const role_as = editedStatus[userId]; // Get the selected role value for this user
    axios.put(`${process.env.REACT_APP_API}/api/user-status/${userId}`, { role_as })
      .then((response) => {
        if (response.data.success) {
          // Update the user status in the local state
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === userId ? { ...user, role_as } : user
            )
          );
          setEditedStatus({
            ...editedStatus,
            [userId]: role_as, // Update the local editedStatus object
          });
        } else {
          console.error('Error updating user status:', response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error updating user status:', error);
      });
  };
  const handleDetailsClick = (userId) => {
    // Set the selectedUserId state to display details for the selected user
    setSelectedUserId(userId);
  };
  return (
    <Layout2 title={"Dashboard - All Users"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Users</h1>
            <div className='w-75'>
                <table className="table">
                    <thead>
                        <tr>
                          <th scope='col'>ID</th>
                          <th scope='col'>Name</th>
                          <th scope='col'>Email</th>
                          <th scope='col'>Role</th>
                          <th scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            <select
                              value={editedStatus[user.id] || user.role_as}
                              onChange={(e) =>
                                setEditedStatus({
                                  ...editedStatus,
                                  [user.id]: e.target.value,
                                })
                              }
                              style={{
                                padding: '8px',
                                fontSize: '16px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                backgroundColor: 'white',
                                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)',
                                width: '100%',
                              }}
                            >
                              <option value="0">Open</option>
                              <option value="3">Locked</option>
                            </select>
                          </td>
                          <td>
                            <button className='btn btn-primary' style={{ height: '38px', marginBottom: '20px' }} onClick={() => handleDetailsClick(user.id)}>Details</button>
                            <button className='btn btn-warning ms-2' onClick={() => handleEditStatus(user.id)}>Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                </table>
                {selectedUserId !== null && (
                  <UserDetail userId={selectedUserId} />
                )}
            </div>
            
          </div>
        </div>
      </div>
    </Layout2>
  )
}

export default Users

