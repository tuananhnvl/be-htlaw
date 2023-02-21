import express from "express";
import {
    Register, Login, Logout, 
    searchAllDataCustomer,
    getAllDataCustomer,
    getUsers, 
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
} from ".././view-be/controllers/UserController.js";

import { verifyToken } from ".././view-be/middlewareLog/VerifyToken.js";
import { refreshToken } from ".././view-be/controllers/RefreshToken.js";



const router = express.Router();




router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
 

//Searching ALL datacustomer 
router.post('/searchingcustomer', searchAllDataCustomer);
//GET ALL datacustomer 
router.get('/datacustomer', getAllDataCustomer);
//FILLTER -SEACHING
router.get('/datacustomer/:id', getCustomerById);
//CREAT - CURD
//router.post('/users', createCustomer);
//UPDATE - CURD
router.patch('/datacustomer/:id', updateCustomer);
//DELETE - CURD
router.delete('/datacustomer/:id', deleteCustomer);


/* router.post('/testdata', testdata); */
/* router.get('/authlogin', authLog);*/
 

export default router;