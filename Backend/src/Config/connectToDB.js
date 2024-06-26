require('dotenv').config();
const {Sequelize} = require("sequelize");


const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});


async function ConnectToDb(){
    try{
      await sequelize.authenticate();
      console.log('Connection to database has been established successfully.');
      await sequelize.sync();
      console.log('All models were synchronized successfully.');
    }catch(error){
        console.error('Unable to connect to the database:', error);
    }
}

module.exports={sequelize,ConnectToDb};