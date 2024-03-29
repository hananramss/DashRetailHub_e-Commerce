import React from 'react';
import axios from 'axios';
import { usersDeleteUrl } from '../../../utils/constant';
import Modal from 'react-modal';

export const DeleteModal = ({user, onConfirm, isOpen, onRequestClose}) => {

    const handleSubmit = async () => {
        try {
          const response = await axios.delete(`${usersDeleteUrl}/${user._id}`);
          console.log('After axios.delete:', response.data);
          onConfirm(); // Call the onConfirm callback passed as a prop
          onRequestClose();  // Call the onClose callback passed as a prop

          window.location.reload();
        } catch (error) {
          console.error('Error deleting user by ID:', error);
          // ... (rest of your error logging logic)
          return { error: true, message: 'Failed to delete user.' };
        }
      };
      

  return (
    <Modal
            id="deleteModal"
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
                                  Delete User
                                </h4>
                            </div>
                            <div className="modal-body" style={{padding: '30px'}}>					
                              <p style={{paddingBottom: '15px'}}>Are you sure you want to delete this Records?</p>
                              <p className="text-warning"><small>This action cannot be undone.</small></p>
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
                                      Delete
                                  </button>
                              </div>
                        </form>
                    </div>
                </div>
            </div>
      </Modal>
  );
};
