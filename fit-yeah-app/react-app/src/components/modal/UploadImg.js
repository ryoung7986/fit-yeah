import React, { useState } from 'react';
import UploadForm from '../UploadForm';
import Modal from 'react-modal';

function UploadImg() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      style={{
        overlay: {
          backgroundColor: 'rgba(16, 125, 126, 0.5)'
        },
        content: {
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'space-evenly',
          justifyContent: 'space-evenly',
          top: '33%',
          left: '33%',
          right: '33%',
          bottom: '33%',
          border: '1px solid #ccc',
          background: '#107D7E',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: "0px 5px 8px -2px rgba(0, 0, 0, 0.75);"
        }
      }}
    >
      <div className="modal__body">
        <UploadForm />
      </div>
    </Modal>
  )
}

export default UploadImg
