import DataCustomer from "../models/DataCustomer.js";
import ModelUser from "../models/ModelUser.js";
import ModelDataDN from "../models/ModelDataDN.js";
import ModelDataDNDetail from "../models/ModelDataDNDetail.js";
import {Sequelize,Op} from "sequelize";




import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//TESTING router.get('/authlogin', authLog);


/* export const authLog = async(req, res) =>{
    try {
        const response = await SchemeLogDetail.findAll();
        res.status(200).json(response);
   
    } catch (error) {
        console.log(error.message);
    }
}
export const testdata = (req, res) =>{
    
    console.log(req.body); 

} */

const dateInUTC7 = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });


function initRandomCode(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}


export const Register = async (req, res) => {
    const { name, email, password, confPassword } = req.body;
    if (password !== confPassword) return res.status(400).json({ msg: "Password and Confirm Password do not match" });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await ModelUser.create({
            name: name,
            email: email,
            password: hashPassword
        });
        res.json({ msg: "Registration Successful" });
    } catch (error) {
        console.log(error);
    }
}

export const Login = async (req, res) => {
    try {
        const user = await ModelUser.findAll({
            where: {
                email: req.body.email
            }
        });

        const match = await bcrypt.compare(req.body.password, user[0].password);
        if (!match) return res.status(400).json({ msg: "Wrong Password" });

        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15s'
        });
        const refreshToken = jwt.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        await ModelUser.update({ refresh_token: refreshToken }, {
            where: {
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: false,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'none'
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({ msg: "Email or Name not found, let's try again" });
    }
}

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await ModelUser.findAll({
        where: {
            refresh_token: refreshToken
        }
    });
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await ModelUser.update({ refresh_token: null }, {
        where: {
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}




//////////////////////////// curd ////////////////////////////////////////////////


export const getUsers = async (req, res) => {
    try {
        const users = await ModelUser.findAll({

            attributes: ['id', 'name', 'email']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const getAllDataCustomer = async (req, res) => {
    try {
        const datainfo = await ModelDataDN.findAll({
            where: {
                deletedAt: null
            }
        });
        const datadetail = await ModelDataDNDetail.findAll({
            where: {
                deletedAt: null
            }
         });
        res.status(200).json({
            'datainfo' : datainfo,
            'datadetail' : datadetail
        });
    } catch (error) {
        console.log(error);
    }
}

export const searchAllDataCustomer = async (req, res) => {
    try {
       /*  res.send("Hello from searchAllDataCustomer"); */ // ONLY 1 RES PUSH 'ERR_HTTP_HEADERS_SENT'
        const Op = Sequelize.Op;
        const result = req.body.querySearching;
        const response = await DataCustomer.findAll({
            where: {
                [Op.or]: [ 
                    { lhdk:{ [Op.like]: '%' + result + '%' } }, 
                    { tdn:{ [Op.like]: '%' + result + '%' } },
                    { nlh:{ [Op.like]: '%' + result + '%' } },
                    { sdt:{ [Op.like]: '%' + result + '%' } },
                    { mail:{ [Op.like]: '%' + result + '%' } },
                    { ldv:{ [Op.like]: '%' + result + '%' } }   
                ]
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
    }
}
export const getCustomerDNByKey = async (req, res) => {
    try {
        const info = await ModelDataDN.findOne({
            where: {
                'key-detail-services': req.params.key
            }
        });
        const detail = await ModelDataDNDetail.findOne({
            where: {
                'key-detail-services': req.params.key
            }
        });
        res.status(200).json({info,detail});
    } catch (error) {
        console.log(error.message);
    }
}

export const createCustomerDN = async (req, res) => {
    try {
        let datainfo = req.body['dataReady']['data-doanhnghiep']
        let datadetail = req.body['dataReady']['core-data-doanhnghiep']
        //console.log(datainfo,datadetail)
        let storeCode = initRandomCode(10)
        await ModelDataDN.create({
            'company':datainfo[0],
            'name-contact':datainfo[1],
            'phone-contact':datainfo[2],
            'mail-contact':datainfo[3],
            'location-contact':datainfo[4],
            'active-ketoan-services':datainfo[5],
            'active-token-services':datainfo[6],
            'publish-info-date':dateInUTC7,
            'note-space':datainfo[7],
            'key-detail-services':storeCode,
        });

        await ModelDataDNDetail.create({
            'key-detail-services':storeCode,
            'type-company':datadetail[0],
            'type-services':datadetail[1],
            'package-services':datadetail[2],
            'fee-services':datadetail[3],
            'signing-date-services':datadetail[4],
            'final-date-services':datadetail[5],
            'status-services':datadetail[6]
            
        });

        res.status(200).json({ msg: "Data Created" ,status: "PASS"});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message , status: "FAIL" });
    }
}

export const updateCustomerDN = async (req, res) => {
  const dataChange = req.body.dataChange;
  const keyChange = req.params.key;
  console.log(dataChange);
  console.log(keyChange);

  try {
    await Promise.all(
      dataChange.map(async (data) => {
        await ModelDataDN.update(
          {
            "company": data["company"],
            "name-contact": data["name-contact"],
            "phone-contact": data["name-contact"],
            "mail-contact": data["mail-contact"],
            "location-contact": data["location-contact"],
            "active-ketoan-services": data["active-ketoan-services"],
            "active-token-services": data["active-token-services"],
            "note-space": data["note-space"]
          },
          {
            where: {
              "key-detail-services": keyChange,
            },
          }
        );
        await ModelDataDNDetail.update(
            {
                'type-company':data['type-company'],
                'type-services':data['type-services'],
                'package-services':data['package-services'],
                'fee-services':data['fee-services'],
                'signing-date-services':data['signing-date-services'],
                'final-date-services':data['final-date-services'],
                'status-services':data['status-services'],
            },
            {
              where: {
                "key-detail-services": keyChange,
              },
            }
          );
      })
    );
    res.status(200).json({ msg: "Data Updated" ,status: "PASS"});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message , status: "FAIL" });
  }
};



export const deleteCustomerDN = async (req, res) => {
    try {
        await ModelDataDN.update(
            {
                deletedAt:dateInUTC7
            },
            {
            where: {
                'key-detail-services': req.params.key,
            }
        }); 
        await ModelDataDNDetail.update(
            {
            deletedAt:dateInUTC7
            },
                {
                where: {
                    'key-detail-services': req.params.key,
                }
            }); 
        res.status(200).json({ msg: `Đã xoá thành công ${req.params.key}`,status: true });
    } catch (error) {
        console.log(error.message);
        res.status(200).json({ msg: `ERR-Server: ${error.message}`,status: false });
    }
}