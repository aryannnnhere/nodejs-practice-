module.exports = ( sequelize , DataTypes)=>{
const User = sequelize.define('users', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure email uniqueness
        validate: {
            isEmail: {
                msg: "Must be a valid email address",
              }
        }
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false
  }

}, {
  // Other model options go here
  tableName: 'users'
});

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true
return User;

}