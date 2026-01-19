/* ================= ARCHIVOS DE MIGRACIONES =================== */

require('dotenv').config();
const path = require('path');

/*

// ====> VERSION LOCAL

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    migrationStorageTableName: 'migraciones' //Nombre de la Tabla de Migraciones
  },
  paths: {
    migrations: path.resolve(__dirname, '../migrations/20250803215022-add-tipo_motor-to-aeronave.js'),
    seeders: path.resolve(__dirname, '../seeders'),
    models: path.resolve(__dirname, '../src/models'),
  }
};

*/

// ====> VERSION NUBE

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL_MIGRATIONS',
    dialect: 'mysql',
    migrationStorageTableName: 'migraciones'
  },
  paths: {
    migrations: path.resolve(__dirname, '../migrations/20250901181629-upd-fechas-to-operacion.js'),
    seeders: path.resolve(__dirname, '../seeders'),
    models: path.resolve(__dirname, '../src/models'),
  }
};

/* Comando para Crear Atchivo de Configuracion de la Migración
 -> npx sequelize-cli migration:generate --name add-correo-to-usuario

El archivo que se genera con el comando anterior, hay que agregar las modificaciones a la db
que se reuieran

Nota: Agregar al path de migrations el archivo de migracion: por ejemplo:
migrations: path.resolve(__dirname, '../migrations/20250625182705-add-correo-to-usuario'),

Aplicar Migracion después de configurar el archivo anterior
 -> npx sequelize-cli db:migrate

*/