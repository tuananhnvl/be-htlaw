import {Sequelize} from "sequelize";

const db = new Sequelize('datacustomer','root','',{
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false // turn off timespamt
    }
});

export default db;