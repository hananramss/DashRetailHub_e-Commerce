import React, { useState } from 'react';
import axios from 'axios';
import { usersAddUrl } from '../../../utils/constant';
import Modal from 'react-modal';

// Create a new Modal instance
Modal.setAppElement('#root');

export const AddModal = ({ isOpen, onRequestClose }) => {

    // const [image, setImage] = useState(null);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState(0);
    const [createdAt, setCreatedAt] = useState('');
    const [verified, setVerified] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    // const [showModal, setShowModal] = useState(false);

    // // Function to handle image upload
    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = () => {
    //             setImage(reader.result); // Update the image state with the base64 data URL
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };


    // Function to handle form submission (Add)
    const handleSubmit = (e) => {
        e.preventDefault(); // Add e as a parameter here
        axios.post(`${usersAddUrl}`, {firstname, lastname, email, phone, createdAt, verified: isChecked })
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
        setVerified(event.target.checked); // Update the 'inStock' state based on checkbox value
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
                    // borderRadius: '0',
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
                                    Add User
                                </h4>
                            </div>
                            <div className="modal-body" style={{padding: '30px'}}>					
                                {/* <div className="form-group" style={{marginBottom:'15px'}}>
                                    <label style={{display: 'block', marginBottom:'5px', fontWeight:'bold'}}>
                                        Profile
                                    </label>
                                    <input 
                                        type="file" 
                                        className="form-control" 
                                        style={{ borderRadius: '5px', border: '1px solid #ccc', width: '100%', padding: '8px'}} 
                                        onChange={handleImageChange}
                                        required
                                    />
                                </div> */}
                                <div className="form-group" style={{marginBottom:'15px'}}>
                                    <label style={{display: 'block', marginBottom:'5px', fontWeight:'bold'}}>
                                        First Name
                                    </label>
                                    <input 
                                        type="text" 
                                        placeholder= "Enter First Name" 
                                        className="form-control"  
                                        style={{ borderRadius: '5px', border: '1px solid #ccc', width: '100%', padding: '8px'}}  
                                        onChange={(e) => setFirstname(e.target.value)} 
                                        required
                                    />
                                </div>
                                <div className="form-group" style={{marginBottom:'15px'}}>
                                    <label style={{display: 'block', marginBottom:'5px', fontWeight:'bold'}}>
                                        Last Name
                                    </label>
                                    <input 
                                        type="text" 
                                        placeholder= "Enter Last Name" 
                                        className="form-control"  
                                        style={{ borderRadius: '5px', border: '1px solid #ccc', width: '100%', padding: '8px'}}  
                                        onChange={(e) => setLastname(e.target.value)} 
                                        required
                                    />
                                </div>
                                <div className="form-group"  style={{marginBottom:'15px'}}>
                                    <label style={{display: 'block', marginBottom:'5px', fontWeight:'bold'}}>
                                        Email Address
                                    </label>
                                    <input 
                                        type="text" 
                                        placeholder= "Enter Email Address" 
                                        className="form-control"  
                                        style={{ borderRadius: '5px', border: '1px solid #ccc', width: '100%', padding: '8px'}} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        required
                                    />
                                </div>
                                <div className="form-group"  style={{marginBottom:'15px'}}>
                                    <label style={{display: 'block', marginBottom:'5px', fontWeight:'bold'}}>
                                        Phone Number
                                    </label>
                                    <input 
                                    type="number" 
                                    placeholder= "Enter Phone Number" 
                                    className="form-control"  
                                    style={{ borderRadius: '5px', border: '1px solid #ccc', width: '100%', padding: '8px'}} 
                                    onChange={(e) => setPhone(e.target.value)} 
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
                                    Verified
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
                                        Verified
                                    </label>

                                    <input 
                                        type="checkbox" 
                                        id="stockNo" 
                                        checked={!isChecked} 
                                        className="form-control" 
                                        onChange={handleCheckboxChange}  
                                    />
                                    <label htmlFor="stockNo" style={{ marginLeft: '5px' }}>
                                        Not Verified
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
