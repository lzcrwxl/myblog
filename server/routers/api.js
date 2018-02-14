const express=require('express')

const router=express.Router();
const mongoose=require('mongoose')




router.post('/user/register',function (req, res, next) {
  res.send("apiOk")
  console.log("succreg")
})

module.exports=router;
