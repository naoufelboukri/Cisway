const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      host: "127.0.0.1",
      user: "root",
      password: "root",
      database: "products",
    },
    listPerPage: 10,
    hash: "Mot de passe super secret"
  };
  module.exports = config;