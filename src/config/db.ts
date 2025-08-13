import { Sequelize } from 'sequelize-typescript'
import { DB_DATABASE, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DATABASE_URL } from '../config'

//const db = DATABASE_URL
const db = process.env.DATABASE_URL
  ? new Sequelize(DATABASE_URL, {
      models: [__dirname + '/../models/**/*.ts'],
      dialect: 'mysql', // o el que uses
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      logging: true, // quítalo o ajusta según tu entorno
    })
  : new Sequelize({
      database: DB_DATABASE,
      username: DB_USER,
      password: DB_PASSWORD,
      host: DB_HOST,
      port: parseInt(DB_PORT),
      dialect: 'mysql', // o el que uses
      models: [__dirname + '/../models/**/*.ts'],
      logging: true,
    })

export default db