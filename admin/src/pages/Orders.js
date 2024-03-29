import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { ordersUrl } from '../utils/constant';
import { 
  CheckCircleFilled, 
  CloseCircleFilled, 
  SearchOutlined,
 } from '@ant-design/icons';
import axios from 'axios';

import '../styles/pages/products.scss';


export const Orders = () => {
  // Initial state for data, modals visibility, and form input
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  
  // useEffect to fetch transactions from the server when the component mounts
  useEffect(() => {
    axios.get(`${ordersUrl}`)
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
  
  // Filter data based on the search term
  const filteredData = data.filter((order) => {
  const createdDate = new Date(order.createdAt);
  const searchTermLowerCase = searchTerm.toLowerCase();
  
  // Extracting the month name from the date
  const monthName = createdDate.toLocaleString('en-US', { month: 'long' }).toLowerCase();
  
  return (
    order.productTitle.toLowerCase().includes(searchTermLowerCase) ||
    order.username.toLowerCase().includes(searchTermLowerCase) ||
    order.status.toLowerCase().includes(searchTermLowerCase) ||
    order.totalPrice.toString().includes(searchTermLowerCase) || 
    monthName.toLowerCase().includes(searchTermLowerCase)
  );
  });

  
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentorders = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };


  return (
    <div className="products">
      <div className="title">
        <span>Orders</span>
      </div>
      <div className="content">
        <div className="table-responsive">
          <div className="table-wrapper">
          <div className="AddSearch">
            <div className="search-bar">
              <input type="text" className="form-control" placeholder="Search" onChange={handleSearch}/>
              <SearchOutlined className="search-icon"/>
            </div>
          </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product</th>
                  <th>Date</th>
                  <th>Customer Name</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
              {currentorders.map((order, index) => (
                    <tr key={index}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td>{order.productTitle}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</td>
                    <td>{order.username}</td>
                    <td className="inStock">{order.status ? <CheckCircleFilled style={{ color: 'green' }} /> : <CloseCircleFilled style={{ color: 'red' }} />}</td>
                    <td>{order.totalPrice}</td>
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

    </div>
  );
};