import {Sequelize} from "sequelize";
import dbhtlaw from "../config/DBUser.js";

const {DataTypes} = Sequelize;

const ModelDataDN = dbhtlaw.define('data-doanhnghiep',{
    'company':{
        type: DataTypes.STRING
    },
    'name-contact':{
        type: DataTypes.STRING
    },
    'phone-contact':{
        type: DataTypes.STRING
    },
    'mail-contact':{
        type: DataTypes.STRING
    },
    'location-contact':{
        type: DataTypes.STRING
    },
    'active-ketoan-services':{
        type: DataTypes.STRING
    },
    'active-token-services':{
        type: DataTypes.STRING
    },
    'publish-info-date':{
        type: DataTypes.STRING,
    },
    'note-space':{
        type: DataTypes.STRING
    },
    'deletedAt':{
        type: DataTypes.DATE
    },
    'key-detail-services':{
        type: DataTypes.STRING
    },
},{
    freezeTableName:true,
    paranoid: true,
  
});
 
(async () => {
    await dbhtlaw.sync();
})();
 
export default ModelDataDN