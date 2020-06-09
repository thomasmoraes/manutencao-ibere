import React, {useState} from 'react';
import Modal from 'react-modal'

// import { Container } from './styles';
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

function ModalEmail({children}) {
  const [modalIsOpen,setIsOpen] = useState(true);

  return (
    <Modal isOpen={modalIsOpen} 
          onRequestClose={ () => setIsOpen(false)} 
          style={customStyles}
          contentLabel="Modal">
            {children}  
    </Modal>);
}

export default ModalEmail;