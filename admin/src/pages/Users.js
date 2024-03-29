import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { usersUrl } from '../utils/constant';
import { 
  CheckCircleFilled, 
  CloseCircleFilled, 
  SearchOutlined,
  EditOutlined, 
  UserDeleteOutlined, 
  UserAddOutlined } from '@ant-design/icons';
import axios from 'axios';

import { AddModal } from '../components/Modal/Users/AddModal';
import { EditModal } from '../components/Modal/Users/EditModal';
import { DeleteModal } from '../components/Modal/Users/DeleteModal';

import '../styles/pages/products.scss';


export const Users = () => {
  // Initial state for data, modals visibility, and form input
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [showAddModal, setShowAddModal] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false); 
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedsUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  
  // useEffect to fetch transactions from the server when the component mounts
  useEffect(() => {
    axios.get(`${usersUrl}`)
      .then(res => {
        console.log('API Response:', res.data);
        setData(res.data);  // Update the state with the fetched data
      })
      .catch(err => {
        console.error('Error fetching data:', err);
  
        // Log specific details of the error
        if (err.response) {
          // The request was made and the server responded with a status code
          console.error('Server responded with:', err.response.status, err.response.data);
        } else if (err.request) {
          // The request was made but no response was received
          console.error('No response received. Request details:', err.request);
        } else {
          console.error('Error details:', err.message);
        }
      });
  }, []);


  // Function to handle searching
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

   // Handle click on update button
   const handleUpdateButtonClick = (user) => {
    // Pass the entire transaction object to ensure all properties are available
    setSelectedUser(user);
  };

  // Handle confirmation after updating
  const handleUpdateConfirm = () => {
    // After deletion is successful, you can reset the selectedTransactionId and close the modal
    setSelectedUserId(null);
  };

    // Handle confirmation after updating
    const handleDeleteConfirm = () => {
      // After deletion is successful, you can reset the selectedTransactionId and close the modal
      setSelectedUser(null);
    };

  // Handle click on delete button for a specific transaction
  const handleDeleteButtonClick = (user) => {
    // Set the selected transaction ID before showing the modal
    setSelectedUser(user);
  };

  
  // Filter data based on the search term
  const filteredData = data.filter((user) => {
  const createdDate = new Date(user.createdAt);
  const searchTermLowerCase = searchTerm.toLowerCase();
  
  // Extracting the month name from the date
  const monthName = createdDate.toLocaleString('en-US', { month: 'long' }).toLowerCase();
  
  return (
    user.firstname.toLowerCase().includes(searchTermLowerCase) ||
    user.lastname.toLowerCase().includes(searchTermLowerCase) ||
    user.email.toLowerCase().includes(searchTermLowerCase) ||
    user.phone.toString().includes(searchTermLowerCase) || 
    monthName.toLowerCase().includes(searchTermLowerCase)
  );
  });

  
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentusers = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };


  return (
    <div className="products">
      <div className="title">
        <span>Users</span>
      </div>
      <div className="content">
        <div className="table-responsive">
          <div className="table-wrapper">
          <div className="AddSearch">
            <button  href="#addModal"className="btn" onClick={() => setShowAddModal(true)}><UserAddOutlined className="plus-icon"/> Add User</button>
            <div className="search-bar">
              <input type="text" className="form-control" placeholder="Search" onChange={handleSearch}/>
              <SearchOutlined className="search-icon"/>
            </div>
          </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email Address</th>
                  <th>Phone Number</th>
                  <th>CreatedAt</th>
                  <th>Verified</th>
                  <th className="expand">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentusers.map((user, index) => (
                  <tr key={index}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</td>
                    <td className="inStock">{user.verified ? <CheckCircleFilled style={{ color: 'green' }} /> : <CloseCircleFilled style={{ color: 'red' }} />}</td>
                    <td>
                      <button href="#editModal" className="icon-btn" onClick={() => { setSelectedUser(user); setShowEditModal(true); }}>
                        <EditOutlined className="icon" />
                      </button>
                      <button href="#deleteModal" className="icon-btn" onClick={() => { setSelectedUser(user); setShowDeleteModal(true); }}>
                      <UserDeleteOutlined className="icon" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>  
          </div>
        </div>
      </div>

      {/* Pagination */}
      <ReactPaginate
        pageCount={Math.ceil(filteredData.length / itemsPerPage)}
        marginPagesDisplayed={1}
        previousLabel="Previous"
        nextLabel="Next"
        breakLabel="..."
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
        pageClassName="page-item"
        previousClassName="page-item"
        nextClassName="page-item"
        pageLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
      />

      
      {/* Modals */}
      <AddModal 
        isOpen={showAddModal} 
        onRequestClose={() => setShowAddModal(false)} 
      />

      <EditModal 
        user={selectedUser} 
        onConfirm={handleUpdateConfirm}  
        isOpen={showEditModal} 
        onRequestClose={() => setShowEditModal(false)} 
      />

      <DeleteModal 
        user={selectedUser} 
        onConfirm={handleUpdateConfirm}  
        isOpen={showDeleteModal} 
        onRequestClose={() => setShowDeleteModal(false)} 
      />

    </div>
  );
};