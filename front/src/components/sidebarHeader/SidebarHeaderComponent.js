import React, { useState } from 'react';

import { Box, Typography } from '@material-ui/core';

import logo from '../../assets/images/logo_fundacao_ibere_camargo.png';
import './SidebarHeader.css';
import axios from 'axios';
// import Modal from '@material-ui/core/Modal';

function SidebarHeader(){
  const [modalIsOpen, setIsOpenModal] = useState(false);
  const [ valueEmail, setValueEmail] = useState('');

  const handleSendEmail = async () => {
    console.log('value', valueEmail)
    const data = await axios.post('http://localhost:3001/api/v1/user/', {email: valueEmail});
    console.log('Sucesso', data);
    setIsOpenModal(false);
  }

  return (
      <Box p={2} display="flex">
        <Box>
          <>
          <Typography
            component="div"
            id={'simple-tabpanel'}
            aria-labelledby={'simple-tab'}
            variant="h6"
          >
            Mapas Culturais
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Fundação Iberê
          </Typography>
          <button className="button2" onClick={() => setIsOpenModal(!modalIsOpen)} type="button">Cadastrar Email</button>
          {modalIsOpen &&
            <div className="cadastrarEmail">
              <label className='label'>E-mail:</label> 
              <input className='input' value={valueEmail} onChange ={e => setValueEmail(e.target.value)}classtype="text" /> 
              <button className="button" onClick={handleSendEmail} type="button">Enviar</button>
            </div>
          }
          </>
        </Box>
        <Box className="sidebar-header-logo">
          <img width="60vw" src={logo} alt="logo" />
        </Box>
      </Box>
    );
  
}

export default SidebarHeader;
