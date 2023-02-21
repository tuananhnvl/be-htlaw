import express from "express";
import {
    Register, Login, Logout, 
    searchAllDataCustomer,
    getAllDataCustomer,
    getUsers, 
    getCustomerDNByKey,
    createCustomerDN,
    updateCustomerDN,
    deleteCustomerDN
} from "../controllers/UserController.js";

import { verifyToken } from ".././middlewareLog/VerifyToken.js";
import { refreshToken } from ".././controllers/RefreshToken.js";



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
router.get('/datacustomerdn/:key', getCustomerDNByKey);
//CREAT - CURD
router.post('/addcustomerdn', createCustomerDN);
//UPDATE - CURD
router.patch('/datacustomerdn/edit/:key', updateCustomerDN);
//DELETE - CURD
router.delete('/datacustomerdn/delete/:key', deleteCustomerDN);


/* router.post('/testdata', testdata); */
/* router.get('/authlogin', authLog);*/
 

export default router;