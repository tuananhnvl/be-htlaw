import {Sequelize} from "sequelize";
import dbhtlaw from "../config/DBUser.js";

const {DataTypes} = Sequelize;

const ModelUser = dbhtlaw.define('user-manager',{
    name:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    permission:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
},{
    freezeTableName:true
});
 
(async () => {
    await dbhtlaw.sync();
})();
 
export default ModelUser