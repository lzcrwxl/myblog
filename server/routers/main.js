const express=require('express')
const router=express.Router();

var Category=require('../models/Category')


// 统一返回格式
var responseData;
router.use(function (req, res, next) {
  responseData = {
    code: 0,
    msg: '',
  }
  next();
});

router.get('/',function (req, res, next) {
  console.log("gogo")
  //读取所有的分类信息
  Category.find().then(function (categories) {
    console.log(categories)
    responseData.code=0;
    res.json({
      userInfo:req.userInfo,
      categories:categories
    })
  })
})

module.exports=router;
