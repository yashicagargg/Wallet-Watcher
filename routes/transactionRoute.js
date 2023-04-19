const express=require('express');
const { addTransaction, getAllTransaction } = require('../controllers/transactionController');

const router=express.Router();

router.post('/add-transaction',addTransaction);
// aab yeah get ki jagah post hoga coz we are passing userid 
router.post('/get-transaction',getAllTransaction);

module.exports=router;