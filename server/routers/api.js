const express=require('express')
const router=express.Router();

var responseData;
var User=require('../models/User')




router.use(function (req,res,next) {
  responseData={
    code:0,
    msg:''
  }
  next();
})


router.get('/user/checkLogin',function (req,res,next) {
  console.log(req.userInfo)
  if(req.userInfo.username){
    responseData.userInfo=req.userInfo;
    res.json(responseData)
  }else {
    responseData.code=99999;
    responseData.msg="未登录"
    res.json(responseData)
  }
})
//注册
router.post('/user/register',function (req, res, next) {
  var username=req.body.username;
  var password=req.body.password;
  var repassword=req.body.repassword;

  //用户名是否为空
  if(username==''){
    responseData.code=1;
    responseData.msg="用户名不为空"
    res.json(responseData)
    return;
  }

  //密码不为空
  if(password==''){
    responseData.code=2;
    responseData.msg="密码不能为空"
    res.json(responseData)
    return;
  }
  //密码不一致
  if(password!=repassword){
    responseData.code=3;
    responseData.msg="两次输入的密码不一致"
    res.json(responseData)
    return;
  }
  //用户是否已经被注册

  User.findOne({
    username:username
  }).then(function (userInfo) {
    console.log(userInfo)
    if(userInfo){
      responseData.code=4;
      responseData.msg="用户名已经被注册"
      res.json(responseData)
      return;
    }
    var user=new User({
      username:username,
      password:password
    });
    return user.save()
  }).then(function (newUserInfo) {
    console.log(newUserInfo);
    responseData.msg="注册成功"
    res.json(responseData)
  })
})

router.post('/user/login',(req,res,next)=>{
  var username=req.body.username;
  var password=req.body.password;

  if (username == ''||password == '') {
    responseData.code=1;
    responseData.msg= '用户名或密码不能为空';
    res.json(responseData)
    return;
  }
  User.findOne({
    username:username,
    password:password,
  },function (err, doc) {
    console.log(doc)
    if(err){
      responseData.code=1001;
      responseData.msg=err.message
      res.json(responseData)
    }
  }).then(function (userInfo) {
      console.log(userInfo)
      if(!userInfo){
        responseData.code=2;
        responseData.msg="用户名或密码错误"
        res.json(responseData)
      }else {
        //  用户名密码正确
        responseData.msg="登陆成功";
        responseData.userInfo={
          id:userInfo._id,
          username:userInfo.username,
          isAdmin: userInfo.isAdmin,
        }
        req.cookies.set("userInfo",JSON.stringify({
          id:userInfo._id,
          username:userInfo.username
        }),{
          path:'/',
          maxAge:1000*60*60
        });
        res.json(responseData)
        return;
      }

  })
})

router.get('/user/logout',function (req, res, next) {
  req.cookies.set("userInfo",null)
  res.json(responseData)
})
module.exports=router;
