const express = require('express');
const router = express.Router();

const salesController = require('../controller/salesController');
const expenseController = require('../controller/expenseController');
const employeesController = require('../controller/employeesController');
const productsController = require('../controller/productsController');
const usersController = require('../controller/usersController');
const ordersController = require('../controller/ordersController');
const SignupLoginController = require('../controller/SignupLoginController');

router.get('/getAllSales', salesController.getAllSales);
router.get('/getAllExpenses', expenseController.getAllExpenses);
router.get('/getAllEmployees', employeesController.getAllEmployees);

router.get('/getAllProducts', productsController.getAllProducts);
router.post('/createProducts', productsController.createProducts);
router.put('/updateProducts/:id', productsController.updateProductsById);
router.delete('/deleteProducts/:id', productsController.deleteProductsById);

router.get('/getAllUsers', usersController.getAllUsers);
router.post('/createUsers', usersController.createUsers);
router.put('/updateUsers/:id', usersController.updateUsersById);
router.delete('/deleteUsers/:id', usersController.deleteUsersById);

router.get('/getAllOrders', ordersController.getAllOrders);

//register
router.get('/getAllAdmin', SignupLoginController.getAllAdmin);
router.post('/registerAdmin', SignupLoginController.registerAdmin);

//login
router.post('/loginAdmin', SignupLoginController.loginAdmin)

//logout
router.get('/logoutAdmin', SignupLoginController.logoutAdmin)


module.exports = router;