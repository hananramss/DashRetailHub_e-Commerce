import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { productsUrl } from '../utils/constant';
import { 
  CheckCircleFilled, 
  CloseCircleFilled, 
  SearchOutlined,
  EditOutlined, 
  DeleteOutlined, 
  PlusCircleFilled } from '@ant-design/icons';
import axios from 'axios';

import { AddModal } from '../components/Modal/Products/AddModal';
import { EditModal } from '../components/Modal/Products/EditModal';
import { DeleteModal } from '../components/Modal/Products/DeleteModal';

import '../styles/pages/products.scss';


export const Products = () => {
  // Initial state for data, modals visibility, and form input
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [showAddModal, setShowAddModal] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false); 
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  
  // useEffect to fetch transactions from the server when the component mounts
  useEffect(() => {
    axios.get(`${productsUrl}`)
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
   const handleUpdateButtonClick = (product) => {
    // Pass the entire transaction object to ensure all properties are available
    setSelectedProduct(product);
  };

  // Handle confirmation after updating
  const handleUpdateConfirm = () => {
    // After deletion is successful, you can reset the selectedTransactionId and close the modal
    setSelectedProductId(null);
  };

  
  // Filter data based on the search term
  const filteredData = data.filter((product) => {
  const createdDate = new Date(product.createdAt);
  const searchTermLowerCase = searchTerm.toLowerCase();
  
  // Extracting the month name from the date
  const monthName = createdDate.toLocaleString('en-US', { month: 'long' }).toLowerCase();
  
  return (
    product.title.toLowerCase().includes(searchTermLowerCase) ||
    product.color.toLowerCase().includes(searchTermLowerCase) ||
    product.pricePHP.toString().includes(searchTermLowerCase) || // Removed unnecessary toLowerCase() conversion
    product.producer.toLowerCase().includes(searchTermLowerCase) ||
    monthName.includes(searchTermLowerCase)
  );
  });

  
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentproducts = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };


  return (
    <div className="products">
      <div className="title">
        <span>Products</span>
      </div>
      <div className="content">
        <div className="table-responsive">
          <div className="table-wrapper">
          <div className="AddSearch">
            <button  href="#addModal"className="btn" onClick={() => setShowAddModal(true)}><PlusCircleFilled className="plus-icon"/> Add Product</button>
            <div className="search-bar">
              <input type="text" className="form-control" placeholder="Search" onChange={handleSearch}/>
              <SearchOutlined className="search-icon"/>
            </div>
          </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Color</th>
                  <th>Price</th>
                  <th>Producer</th>
                  <th>CreatedAt</th>
                  <th>InStock</th>
                  <th className="expand">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentproducts.map((product, index) => (
                  <tr key={index}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    {/* <td>
                      {product.image ? (
                        <img src={product.image} alt="Product" style={{ width: '50px', height: '50px' }} />
                      ) : null}
                    </td> */}
                    <td>{product.title}</td>
                    <td>{product.color}</td>
                    <td>{product.pricePHP}</td>
                    <td>{product.producer}</td>
                    <td>{new Date(product.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</td>
                    <td className="inStock">{product.inStock ? <CheckCircleFilled style={{ color: 'green' }} /> : <CloseCircleFilled style={{ color: 'red' }} />}</td>
                    <td>
                      <button href="#editModal" className="icon-btn" onClick={() => { setSelectedProduct(product); setShowEditModal(true); }}>
                        <EditOutlined className="icon" />
                      </button>
                      <button href="#deleteModal" className="icon-btn" onClick={() => { setSelectedProduct(product); setShowDeleteModal(true); }}>
                        <DeleteOutlined className="icon" />
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
        product={selectedProduct} 
        onConfirm={handleUpdateConfirm}  
        isOpen={showEditModal} 
        onRequestClose={() => setShowEditModal(false)} 
      />

      <DeleteModal 
        product={selectedProduct} 
        onConfirm={handleUpdateConfirm}  
        isOpen={showDeleteModal} 
        onRequestClose={() => setShowDeleteModal(false)} 
      />

    </div>
  );
};