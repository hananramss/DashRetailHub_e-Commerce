import React, { useState } from 'react';
import axios from 'axios';
import { productsAddUrl } from '../../../utils/constant';
import Modal from 'react-modal';

// Create a new Modal instance
Modal.setAppElement('#root');

export const AddModal = ({ isOpen, onRequestClose }) => {

    // const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [color, setColor] = useState('');
    const [pricePHP, setPricePHP] = useState(0);
    const [producer, setProducer] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [inStock, setInStock] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');

    // Function to handle form submission (Add)
    const handleSubmit = (e) => {
        e.preventDefault(); // Add e as a parameter here
        axios.post(`${productsAddUrl}`, {title, color, pricePHP, producer, createdAt, inStock: isChecked })
            .then(res => {
                console.log('API Response:', res.data);
                onRequestClose(); // Close the modal after successful submission
                // You can also refresh the page here if needed
                window.location.reload();
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
    };

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
        setInStock(event.target.checked); // Update the 'inStock' state based on checkbox value
    };


    return (
        <Modal
            id="addModal"
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={{
                overlay: {
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 9999,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                content: {
                    position: 'relative',
                    inset: '0',
                    overflow: '0',
                    borderRadius: '0',
                    outline: 'none',
                    padding: '0',
                    width:'70%',
                    maxWidth: '400px',
                    borderRadius: '15px',
                    background: 'rgb(255, 255, 255)',
                    boxShadow: '0 2px 4px #3e3e3e',
                    color: 'black',
                },
            }}
        >
            <div className="modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={handleSubmit}> 
                            <div className="modal-header">						
                                <h4 className="modal-title" style={{ fontWeight: 'bold', fontSize: '18px', paddingTop: '30px', paddingLeft: '30px'}}>
                                    Add Product
                                </h4>
                            </div>
                            <div className="modal-body" style={{padding: '30px'}}>					
                                {/* <div className="form-group" style={{marginBottom:'15px'}}>
                                    <label style={{display: 'block', marginBottom:'5px', fontWeight:'bold'}}>
                                        Image
                                    </label>
                                    <input 
                                        type="file" 
                                        className="form-control" 
                                        style={{ borderRadius: '5px', border: '1px solid #ccc', width: '100%', padding: '8px'}} 
                                        onChange={(e) => handleImageChange(e)} 
                                        required
                                    />
                                </div> */}
                                <div className="form-group" style={{marginBottom:'15px'}}>
                                    <label style={{display: 'block', marginBottom:'5px', fontWeight:'bold'}}>
                                        Title
                                    </label>
                                    <input 
                                        type="text" 
                                        placeholder= "Enter Title" 
                                        className="form-control"  
                                        style={{ borderRadius: '5px', border: '1px solid #ccc', width: '100%', padding: '8px'}}  
                                        onChange={(e) => setTitle(e.target.value)} 
                                        required
                                    />
                                </div>
                                <div className="form-group"  style={{marginBottom:'15px'}}>
                                    <label style={{display: 'block', marginBottom:'5px', fontWeight:'bold'}}>
                                        Color
                                    </label>
                                    <input 
                                        type="text" 
                                        placeholder= "Enter Color" 
                                        className="form-control"  
                                        style={{ borderRadius: '5px', border: '1px solid #ccc', width: '100%', padding: '8px'}} 
                                        onChange={(e) => setColor(e.target.value)} 
                                        required
                                    />
                                </div>
                                <div className="form-group"  style={{marginBottom:'15px'}}>
                                    <label style={{display: 'block', marginBottom:'5px', fontWeight:'bold'}}>
                                        Price
                                    </label>
                                    <input 
                                    type="number" 
                                    placeholder= "Enter Price" 
                                    className="form-control"  
                                    style={{ borderRadius: '5px', border: '1px solid #ccc', width: '100%', padding: '8px'}} 
                                    onChange={(e) => setPricePHP(e.target.value)} 
                                    required
                                />
                                </div>
                                <div className="form-group"  style={{marginBottom:'15px'}}>
                                    <label style={{display: 'block', marginBottom:'5px', fontWeight:'bold'}}>
                                        Producer
                                    </label>
                                    <input 
                                    type="text" 
                                    placeholder= "Enter Producer" 
                                    className="form-control"  
                                    style={{ borderRadius: '5px', border: '1px solid #ccc', width: '100%', padding: '8px'}} 
                                    onChange={(e) => setProducer(e.target.value)} 
                                    required
                                />
                                </div>
                                <div className="form-group"  style={{marginBottom:'15px'}}>
                                    <label style={{display: 'block', marginBottom:'5px', fontWeight:'bold'}}>
                                        CreatedAt
                                    </label>
                                    <input 
                                        type="Date" 
                                        placeholder= "Enter Date" 
                                        className="form-control"  
                                        style={{ borderRadius: '5px', border: '1px solid #ccc', width: '100%', padding: '8px'}}  
                                        onChange={(e) => setCreatedAt(e.target.value)} 
                                        required
                                    />
                                </div>
                                <label style={{ display: 'block', marginBottom: '15px', fontWeight: 'bold' }}>
                                    Stock Availability
                                </label>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input 
                                        type="checkbox" 
                                        id="stockYes" 
                                        checked={isChecked} 
                                        className="form-control" 
                                        onChange={handleCheckboxChange} 
                                    />
                                    <label htmlFor="stockYes" style={{ marginLeft: '5px', marginRight: '15px' }}>
                                        Yes, there is stock
                                    </label>

                                    <input 
                                        type="checkbox" 
                                        id="stockNo" 
                                        checked={!isChecked} 
                                        className="form-control" 
                                        onChange={handleCheckboxChange}  
                                    />
                                    <label htmlFor="stockNo" style={{ marginLeft: '5px' }}>
                                        No stock
                                    </label>
                                </div>
                            </div>
                            <div className="modal-footer" style={{display:'flex', justifyContent: 'end', backgroundColor: '#E7E7E3', borderRadius: '0 0 15px 15px', padding: '15px', gap: '9px'}}>
                                <button type="button" className="btn btn-default"  onClick={onRequestClose} style={{borderRadius: '5px', minWidth:'100px', border: 'none',  backgroundColor: '#003F62', color: 'white', padding: '6px', cursor: 'pointer'}}>Cancel</button>
                                <button type="submit" className="btn btn-success" style={{borderRadius: '5px', minWidth:'100px',  border: 'none', backgroundColor: '#003F62', color: 'white', padding: '8px', cursor: 'pointer', ':hover': {backgroundColor: '#5E92A3'}}}>Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
