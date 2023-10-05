const { Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize('db', 'root', '', {
    host: 'localhost',
    logging: false,
    dialect: 'mysql'
  });


  sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
 .catch(err => {
 console.error('Unable to connect to the database:', err);
});


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.contact = require('./contact')(sequelize, DataTypes)
db.user = require('./user')(sequelize, DataTypes)
db.sequelize.sync({force: false})

module.exports = db;