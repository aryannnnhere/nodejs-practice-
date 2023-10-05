module.exports = (sequelize , DataTypes)=>{

const Contact = sequelize.define('contacts', {
  // Model attributes are defined here
  permanent_address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone_number: {
    type: DataTypes.INTEGER
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  tableName: 'Contact'
});

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true
return Contact;
}
