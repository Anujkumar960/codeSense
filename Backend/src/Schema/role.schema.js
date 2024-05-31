const {sequelize} = require("../Config/connectToDB")
const {DataTypes} = require("sequelize")

const  role= sequelize.define('role', {
    role_id:{type:DataTypes.INTEGER,unique: true},
    role_name: { type: DataTypes.STRING, allowNull: false }
  }, { timestamps: false });
  

module.exports={role};