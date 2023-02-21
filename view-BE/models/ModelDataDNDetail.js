import {Sequelize} from "sequelize";
import dbhtlaw from "../config/DBUser.js";

const {DataTypes} = Sequelize;

const ModelDataDNDetail = dbhtlaw.define('core-data-doanhnghiep',{
    'key-detail-services':{
        type: DataTypes.STRING
    },
    'type-company':{
        type: DataTypes.STRING
    },
    'type-services':{
        type: DataTypes.STRING
    },
    'package-services':{
        type: DataTypes.STRING
    },
    'fee-services':{
        type: DataTypes.STRING
    },
    'signing-date-services':{
        type: DataTypes.STRING
    },
    'final-date-services':{
        type: DataTypes.STRING
    },
    'status-services':{
        type: DataTypes.STRING
    },
    'deletedAt':{
        type: DataTypes.DATE
    }
},{
    freezeTableName:true,
    paranoid: true,
});
 
(async () => {
    await dbhtlaw.sync();
})();
 
export default ModelDataDNDetail