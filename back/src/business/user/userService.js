const userRepository = require("../../infrastructure/user/userRepository");
const userValidator = require("../../business/user/userValidator");

const nodemailer = require('nodemailer');

module.exports = {


  mountEmail: function (remetente, destino, assunto, texto) {
    return {
      from: remetente,
      to: destino,
      subject: assunto,
      text: texto,
    }
  },

  salvarUsuario: function (usuario) {
    return new Promise((resolve, reject) => {
      try {
        userValidator.validarUsuario(usuario);
      } catch (err) {
        reject(err);
      }
      
      let transport = nodemailer.createTransport({
        service:"gmail",
        host: 'smtp.gmail.com',
        port: 587,
        secure: true,
        auth: {
          user: 'iberecamargo123@gmail.com',
          pass: 'Senha123'
        }
      });
      
      const bodyEmail = this.mountEmail('iberecamargo@gmail.com', usuario.email, 'Conta Criada', 'Sua conta foi criada!');
      console.log(bodyEmail)
      transport.sendMail(bodyEmail, function(error, info){
        if(error){
          return console.log(error);
        }
          console.log('Message sent: ' + info.response);
      });
      userRepository.salvarUsuario(usuario)

        .then(() => {
          resolve(usuario);
        }).catch(err => {

          reject(err);
        });
    });

  },

  

}