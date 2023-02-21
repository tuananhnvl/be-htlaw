import {Sequelize} from "sequelize";

const dbhtlaw = new Sequelize('ht-law','root','',{
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false // turn off timespamt
       
    }
});

export default dbhtlaw;