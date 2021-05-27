// Update with your config settings.
require('dotenv').config()
const {LOCAL_DB_URL, LOCAL_DB_USER, LOCAL_DB_PWD, LOCAL_DB_NAME, PROD_DATABASE_URL, PROD_DATABASE_USER, PROD_DATABASE_PASSWORD, PROD_DATABASE_NAME} = process.env;

module.exports = {
  development: {
    client: 'pg',
    connection: {
    host:LOCAL_DB_URL,
    user: LOCAL_DB_USER,
    password: LOCAL_DB_PWD,
    database: LOCAL_DB_NAME
    },
  },
  staging: {
    client: "postgresql",
    connection: {
      user: LOCAL_DB_USER,
      password: LOCAL_DB_PWD,
      database: LOCAL_DB_NAME
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
  production: {
      client: "pg",
      connection: {
          host: PROD_DATABASE_URL,
          user: PROD_DATABASE_USER,
          password: PROD_DATABASE_PASSWORD,
          database: PROD_DATABASE_NAME
      },
      pool: {
          min: 2,
          max: 10,
      },
      migrations: {
          tableName: "knex_migrations",
      },
  },
};
