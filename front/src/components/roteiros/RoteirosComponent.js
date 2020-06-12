import React, { Component } from 'react';
import {
  ListItem,
  Divider,
  List,
  ListItemText,
  Collapse,
  Button
} from '@material-ui/core';
import {
  ExpandLess,
  ExpandMore,
  SubdirectoryArrowRight
} from '@material-ui/icons';

import MapIcon from '../../assets/icons/map_icon.svg';
import './roteiros.css';
import RoteiroService from '../../services/RoteiroService';
import InstituicaoRoteiro from '../instituicaoRoteiro/InstituicaoRoteiro';
import FormRoteiro from '../formRoteiro'

export class Roteiros extends Component {
  constructor(props) {
    super(props);

    this.state = {modal: false};
    this.roteirosService = new RoteiroService();
  }

  handleClick = e => {
    this.setState({...this.state, [e]: !this.state[e] });
  };

  openModal = () => {
    this.setState({...this.state, modal: true})
  };

  closeModal = () => {
    this.setState({...this.state, modal: false})
  };

  render() {
    const { roteiros } = this.props;
    if (roteiros !== undefined) {
      return (
        <List>
          <Button variant="outlined" onClick={this.openModal}>
                        +
          </Button>
          {roteiros.map(roteiro => {
            return (
              <React.Fragment key={roteiro.id}>
                {roteiro != null ? (
                  <React.Fragment>

                    <ListItem
                      button
                      onClick={this.handleClick.bind(this, roteiro.nome)}
                    >
                      <img src={MapIcon} alt="pointer" />
                      <ListItemText
                        className="titulo-roteiro"
                        primary={roteiro.nome}
                      />
                      {this.state[roteiro.nome] ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </ListItem>
                    <Collapse
                      component="li"
                      in={this.state[roteiro.nome]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List disablePadding>
                        <Divider />
                        {roteiro.instituicoes.map(instituicao => {
                          return (
                            <InstituicaoRoteiro
                              instituicao={instituicao}
                              key={instituicao.id}
                            />
                          );
                        })}
                      </List>

                      <div className="rotas">
                        <Button
                          variant="outlined"
                          href={this.roteirosService.montaRoteiro(roteiro)}
                        >
                          <SubdirectoryArrowRight />
                          ROTAS
                        </Button>
                      </div>
                    </Collapse>
                  </React.Fragment>
                ) : (
                  <ListItem onClick={this.handleClick.bind(this, roteiro.nome)}>
                    <ListItemText primary={roteiro.name} />
                  </ListItem>
                )}
                {this.state.modal &&
                 <div className="try-modal-overlay">
                    <div className="modal">
                      <FormRoteiro closeModal={this.closeModal}/>
                     </div>
                  </div>
          }
              </React.Fragment>
            );
          })}
          <Divider />
        </List>
      );
    } else return null;
  }
}

export default Roteiros;
