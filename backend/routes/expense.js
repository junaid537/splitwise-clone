
const router = require("express").Router();
//const Multer=require('multer');
const {createExpense}=require("../controllers/expenseController")


// const multer= Multer({
//     storage: Multer.memoryStorage(),
//     limits:{
//         fileSize:5*1024*1024     //not larger than 5MB,
//     }
// })

//router.post("/:gid",multer.single("avatar"),createExpense);
router.post("/:gid",createExpense);

module.exports=router;





