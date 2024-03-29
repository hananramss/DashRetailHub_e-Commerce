import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { usersUpdateUrl } from '../../../utils/constant';
import Modal from 'react-modal';

// Create a new Modal instance
Modal.setAppElement('#root');

export const EditModal = ({user, onConfirm, isOpen, onRequestClose }) => {

    // const [image, setImage] = useState(user?.image || '');
    // const [newImage, setNewImage] = useState(null); // State to store the new image file
    const [firstname, setFirstname] = useState(user?.firstname || '');
    const [lastname, setLastname] = useState(user?.firstname || '');
    const [email, setEmail] = useState(user?.color || '');
    const [phone, setPhone] = useState(user?.pricePHP || '');
    const [createdAt, setCreatedAt] = useState(user?.createdAt || '');
    const [verified, setVerified] = useState(user?.verified || false);
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); // Add state for tracking form submission


    
    // Function to format the date as "yyyy-mm-dd" for the input
    const formatDate = (inputDate) => {
      const dateObject = new Date(inputDate);
      return dateObject.toISOString().split('T')[0];
    };

    // Function to unformat the date back to the original format
    const unformatDate = (formattedDate) => {
      return new Date(formattedDate).toISOString();
    };

  //   // Function to handle image change
  //   const handleImageChange = (e) => {
  //     const file = e.target.files[0];
  //     if (file) {
  //         const reader = new FileReader();
  //         reader.onload = () => {
  //             setImage(reader.result); // Update the image state with the base64 data URL
  //         };
  //         reader.readAsDataURL(file);
  //     }
  // };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true); // Set isSubmitting to true when form is submitted
  
      try {
        const updatedUser = {
          firstname,
          lastname,
          email,
          phone,
          createdAt: unformatDate(createdAt), // Unformat createdAt date before sending
          verified,
        };
  
        const response = await axios.put(`${usersUpdateUrl}/${user._id}`, updatedUser);
  
        console.log('User updated successfully:', response.data);
        onConfirm(); // Call onConfirm to close the modal or perform additional actions
        window.location.reload();
      } catch (error) {
        console.error('Error updating User by ID:', error);
        // Handle the error as needed
        // You can show an error message to the user or log specific details
      }finally {
        setIsSubmitting(false); // Reset isSubmitting to false after form submission
      }
    };

    useEffect(() => {
      // Update the state when the transaction prop changes
      // setImage(user?.newImage || user?.image);
      setFirstname(user?.firstname || '');
      setLastname(user?.lastname || '');
      setEmail(user?.email || '');
      setPhone(user?.phone || '');
      setCreatedAt(user?.createdAt ? formatDate(user.createdAt) : ''); // Format createdAt date
      setVerified(user?.verified || '');
    }, [user]);
  
    if (!user) {
      // If transaction is null, you can choose to render an error message or return null
      return null;
    }

     // Function to handle checkbox change
    const handleCheckboxChange = (event) => {
      setVerified(!verified); // Toggle verified state
    };

    return (
        <Modal
            id="editModal"
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
                                  Update User
                                </h4>
                            </div>
                            <div className="modal-body" style={{padding: '30px'}}>			
                                {/* <div className="form-group" style={{marginBottom:'10px'}}>
                                    <label style={{display: 'block', marginBottom:'3px', fontWeight:'bold'}}>
                                        Image
                                    </label>
                                <div style={{marginBottom:'10px', display:'flex'}}>
                                    <img src={user.image} alt="User" style={{ width: '80px', height: '80px' }} />
                                    <input 
                                        type="file" 
                                        className="form-control" 
                                        style={{ borderRadius: '5px', border: '1px solid #ccc', padding: '8px'}} 
                                        onChange={handleImageChange}
                                        accept="image/*"
                                    />
                                </div>
                                </div> */}
                                <div className="form-group" style={{marginBottom:'10px'}}>
                                    <label style={{display: 'block', marginBottom:'3px', fontWeight:'bold'}}>
                                      First Name
                                    </label>
                                    <input 
                                      type="text" 
                                      placeholder= "Enter Title" 
                                      className="form-control"  
                                      style={{ borderRadius: '5px', border: '1px solid #ccc', width: '100%', padding: '8px'}} 
                                      value={firstname}  
                                      onChange={(e) => setFirstname(e.target.value)} 
                                      required
                                    />
                                </div>
                                <div className="form-group" style={{marginBottom:'10px'}}>
                                    <label style={{display: 'block', marginBottom:'3px', fontWeight:'bold'}}>
                                      Last Name
                                    </label>
                                    <input 
                                      type="text" 
                                      placeholder= "Enter Title" 
                                      className="form-control"  
                                      style={{ borderRadius: '5px', border: '1px solid #ccc', width: '100%', padding: '8px'}} 
                                      value={lastname}  
                                      onChange={(e) => setLastname(e.target.value)} 
                                      required
                                    />
                                </div>
                                <div className="form-group"  style={{marginBottom:'10px'}}>
                                    <label style={{display: 'block', marginBottom:'3px', fontWeight:'bold'}}>
                                      Email Address
                                    </label>
                                    <input 
                                      type="text" 
                                      placeholder= "Enter Color" 
                                      className="form-control"  
                                      style={{ borderRadius: '5px', border: '1px solid #ccc', width: '100%', padding: '8px'}} 
                                      value={email} 
                                      onChange={(e) => setEmail(e.target.value)} 
                                      required
                                    />
                                </div>
                                <div className="form-group"  style={{marginBottom:'10px'}}>
                                    <label style={{display: 'block', marginBottom:'3px', fontWeight:'bold'}}>
                                      Phone Number
                                    </label>
                                    <input 
                                      type="number" 
                                      placeholder= "Enter Price" 
                                      className="form-control"  
                                      style={{ borderRadius: '5px', border: '1px solid #ccc', width: '100%', padding: '8px'}}  
                                      value={phone} 
                                      onChange={(e) => setPhone(e.target.value)} 
                                      required
                                    />
                                </div>
                                <div className="form-group"  style={{marginBottom:'10px'}}>
                                    <label style={{display: 'block', marginBottom:'3px', fontWeight:'bold'}}>
                                      CreatedAt
                                    </label>
                                    <input 
                                      type="Date" 
                                      placeholder= "Enter Date" 
                                      className="form-control"  
                                      style={{ borderRadius: '5px', border: '1px solid #ccc', width: '100%', padding: '8px'}}  
                                      value={createdAt} 
                                      onChange={(e) => setCreatedAt(e.target.value)} 
                                      required
                                    />
                                </div>
                                  <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
                                    Verified
                                  </label>
                                  <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input
                                        type="checkbox"
                                        id="stockCheckbox"
                                        checked={verified} // Reflect the value of verified directly
                                        className="form-control"
                                        onChange={handleCheckboxChange} // Handle checkbox change
                                    />
                                    <label htmlFor="stockCheckbox" style={{ marginLeft: '5px' }}>In stock</label>
                                  </div>
                              </div>
                              <div className="modal-footer" style={{display:'flex', justifyContent: 'end', backgroundColor: '#E7E7E3', borderRadius: '0 0 15px 15px', padding: '15px', gap: '9px'}}>
                                  <button 
                                    type="button"
                                    className="btn btn-default"  
                                    onClick={onRequestClose} style={{borderRadius: '5px', minWidth:'100px', border: 'none',  backgroundColor: '#003F62', color: 'white', padding: '6px', cursor: 'pointer'}}>
                                      
                                    Cancel
                                  </button>
                                  <button 
                                      type="button" // Specify type="button" to prevent form submission
                                      className="btn btn-success" 
                                      style={{ borderRadius: '5px', minWidth: '100px', border: 'none', backgroundColor: '#003F62', color: 'white', padding: '8px', cursor: 'pointer' }}
                                      onClick={handleSubmit} // Call handleSubmit function on button click
                                  >
                                      {isSubmitting ? 'Updating...' : 'Update'}
                                  </button>
                              </div>
                        </form>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
