import DataCustomer from "../models/DataCustomer.js";
import SchemeLogDetail from "../models/ModelUser.js";
import {Sequelize} from "sequelize";

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




export const Register = async (req, res) => {
    const { name, email, password, confPassword } = req.body;
    if (password !== confPassword) return res.status(400).json({ msg: "Password and Confirm Password do not match" });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await SchemeLogDetail.create({
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
        const user = await SchemeLogDetail.findAll({
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
        await SchemeLogDetail.update({ refresh_token: refreshToken }, {
            where: {
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({ msg: "Email not found" });
    }
}

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await SchemeLogDetail.findAll({
        where: {
            refresh_token: refreshToken
        }
    });
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await SchemeLogDetail.update({ refresh_token: null }, {
        where: {
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}




//////////////////////////// curd ////////////////////////////////////////////////
/* export const getUsers = async(req, res) =>{
    try {
        const response = await SchemeLogDetail.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
} */

export const getUsers = async (req, res) => {
    try {
        const users = await SchemeLogDetail.findAll({

            attributes: ['id', 'name', 'email']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}
export const getAllDataCustomer = async (req, res) => {
    try {
        const response = await DataCustomer.findAll();
        res.status(200).json(response);
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
export const getCustomerById = async (req, res) => {
    try {
        const response = await DataCustomer.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createCustomer = async (req, res) => {
    try {
        await DataCustomer.create(req.body);
        res.status(201).json({ msg: "User Created" });
    } catch (error) {
        console.log(error.message);
    }
}

export const updateCustomer = async (req, res) => {
    try {
        await DataCustomer.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "User Updated" });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteCustomer = async (req, res) => {
    try {
        await DataCustomer.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "User Deleted" });
    } catch (error) {
        console.log(error.message);
    }
}