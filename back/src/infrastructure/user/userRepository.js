const { User } = require('../../models');

module.exports = {
  salvarUsuario: function (usuario) {

    return User.create({
      email: usuario.email

    },
    )
  }
}
