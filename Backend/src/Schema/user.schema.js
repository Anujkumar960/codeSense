const {sequelize} = require("../Config/connectToDB")
const {DataTypes} = require("sequelize")

const User = sequelize.define('User', {
    user_id:{type:DataTypes.INTEGER,unique: true},
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    preferred_languages: { type: DataTypes.STRING, allowNull: false },
    role_id: { type:DataTypes.INTEGER, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    isSubscribed:{type: DataTypes.BOOLEAN, defaultValue: false},
    Documentationlimit:{type:DataTypes.INTEGER,defaultValue:5},
    Reviewlimit:{type:DataTypes.INTEGER,defaultValue:5},
  }, { timestamps: false });
  

module.exports={User};