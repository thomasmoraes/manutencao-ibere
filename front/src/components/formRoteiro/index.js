import React,{Component} from 'react';
import { Form, Input } from "@rocketseat/unform";
import InstituicaoService from '../../services/InstituicaoService';
import axios from 'axios';
// import { Container } from './styles';

class formRoteiro extends Component {
  constructor(props) {
    super(props);
    this.instituicaoService = new InstituicaoService();

    this.state = {
      checkedInstituicao : [],
      listaInstituicoes: []
    };
  }
  

  async componentDidMount() {
    const listaInstituicoes = await this.instituicaoService.listaInstituicoes();
    console.log(listaInstituicoes, "erro")
    this.setState({ listaInstituicoes: listaInstituicoes });
  }


  clickInstituicao = (instituicao) => {
    const onList = !!this.state.checkedInstituicao.find(i => i.id === instituicao.id);
    let newList;
    if(onList){
      newList = this.state.checkedInstituicao.filter(i => i.id !== instituicao.id);
    }else{
      newList = this.state.checkedInstituicao;
      newList.push(instituicao);
    }

    this.setState({...this.state, checkedInstituicao: newList});
  }

  async handleSubmit(e, lista, closeModal) {
    const data = await axios.post('http://localhost:3001/api/v1/itinerario/', {nome: e.name, instituicoes: lista});
    if(data){
      closeModal();
    }
  }

  
  render(){
    const {closeModal} = this.props;
    return(
    <div className='container'>
      <h2 className='titleModal'>Crie o seu Roteiro</h2>
      <Form className= "form-roteiro" onSubmit={(e) => this.handleSubmit(e, this.state.checkedInstituicao, closeModal)}>
        <div className="contentForm">
          <label className="label2">
            Nome  
          </label>
          <Input name="name" type="text" />
        </div>
    
        {this.state.listaInstituicoes.map((instituicao)=>{ 
          return (
            <div key={instituicao.id} className="contentForm"> 
              <input type='checkbox' checked={this.state.checkedInstituicao.find(i => i.id === instituicao.id)} onClick = {() => this.clickInstituicao(instituicao)}/>
              <label className="label2">{instituicao.nome}</label>
            </div>
            )
        })
      }
        <button type="submit" className="button">Criar Conta</button>
      </Form>
    </div>
    )};
}

export default formRoteiro;