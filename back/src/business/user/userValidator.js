const { ValidacaoException } = require("../../utils/Exceptions");

const validarUsuario = (usuario) => {
  if (usuario == null) {
    throw new ValidacaoException('Não é possivel criar um usuario null');
  }
};

module.exports = { validarUsuario };