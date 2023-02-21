import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const DataCustomer = db.define('data-customer',{
    lhdk: DataTypes.STRING,
    tdn: DataTypes.STRING,
    nlh: DataTypes.STRING,
    sdt: DataTypes.STRING,
    mail: DataTypes.STRING,
    dc: DataTypes.STRING,
    ldv: DataTypes.STRING
},{
    freezeTableName:true
});

export default DataCustomer;

(async()=>{
    await db.sync();
})();