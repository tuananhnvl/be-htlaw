import {Sequelize} from "sequelize";

/* const db = new Sequelize('datacustomer','root','',{
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false // turn off timespamt
    }
}); */

const db = new Sequelize('sql12600163','sql12600163','wbRVF86vG8',{
    host: 'sql12.freesqldatabase.com',
    dialect: 'mysql',
    define: {
        timestamps: false // turn off timespamt
       
    }
});

export default db;