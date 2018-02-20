const express = require('express')
const router = express.Router();

var User = require('../models/User')
var Category = require('../models/Category')
var Content = require('../models/Content')

// 统一返回格式
var responseData;
router.use(function (req, res, next) {
  responseData = {
    code: 0,
    msg: '',
  }
  next();
});


router.use(function (req, res, next) {
  if (!req.userInfo.isAdmin || req.userInfo == null) {
    responseData.code = 1;
    responseData.msg = "无管理员权限"
    res.json(responseData)
    return;
  }
  next()
})
router.get('/', function (req, res, next) {
  responseData.code = 0;
  responseData.msg = "你好，管理员"
  responseData.userInfo = req.userInfo;
  res.json(responseData)
})

//用户管理

router.get('/user', function (req, res) {

  var page = Number(req.query.page || 1);
  var limit = Number(req.query.limit || 5);
  ;
  var pages = 0;
  User.count().then(function (count) {
    pages = Math.ceil(count / limit);
    page = Math.min(page, pages)
    page = Math.max(page, 1)
    var skip = (page - 1) * limit;

    User.find().limit(limit).skip(skip).then(function (users) {
      res.json({
        userInfo: req.userInfo,
        users: users,
        page: page,
        pages: pages,
        count: count,
        limit: limit
      })
    })
  })

})

//分类首页
router.get('/category', function (req, res) {
  var page = Number(req.query.page || 1);
  var limit = Number(req.query.limit || 5);
  ;
  var pages = 0;
  Category.count().then(function (count) {
    pages = Math.ceil(count / limit);
    page = Math.min(page, pages)
    page = Math.max(page, 1)
    var skip = (page - 1) * limit;

    Category.find().sort({_id:-1}).limit(limit).skip(skip).then(function (categories) {
      res.json({
        userInfo: req.userInfo,
        categories: categories,
        page: page,
        pages: pages,
        count: count,
        limit: limit
      })
    })
  })
})
//分类的添加
router.post('/category/add', function (req, res) {

  let name = req.body.name;
  Category.findOne({
    name: name
  }).then(function (rs) {
    if (rs) {
      responseData.msg = '数据库中已存在该类别';
      responseData.code = 1;
      res.json(responseData);
      return Promise.reject();
    } else {
      //  数据库中不存在
      return new Category({
        name: name
      }).save();
    }
  }).then(function (newCategory) {
    responseData.msg = '分类添加成功';
    responseData.code = 0;
    res.json(responseData);
  })
})

//分类修改
router.get('/category/edit', function (req, res) {
//  获取要修改的分类信息，并且用表单的形式展现出来
  console.log(req.query.id)
  var id = req.query.id || "";
  Category.findOne({
    _id: id
  }).then(function (category) {
    if (!category) {
      responseData.code = 1;
      responseData.msg = "分类信息不存在"
      res.json(responseData)
      return Promise.reject();
    } else {
      res.json({
        userInfo: req.userInfo,
        category: category
      })
    }
  })
})

router.post('/category/edit', function (req, res) {
  var id = req.body.id;
  console.log(id)
  var name = req.body.name || "";
  Category.findOne({
    _id: id
  }).then(function (category) {
    if (!category) {
      responseData.code = 1;
      responseData.msg = "分类信息不存在"
      res.json(responseData)
      return Promise.reject();
    } else {
      return Category.findOne({
        _id: {$ne: id},
        name: name
      })
    }
  }).then(function (sameCategory) {
    if (sameCategory) {
      responseData.code = 2;
      responseData.msg = "该分类名称已被占用";
      res.json(responseData)
      return Promise.reject();
    } else {
      return Category.update({
        _id: id
      }, {
        name: name
      })
    }
  }).then(function () {
    responseData.code = 0;
    responseData.msg = '修改成功';
    res.json(responseData)
  })
})


//分类删除
router.get('/category/delete',function (req, res) {
  var id = req.query.id || "";
  Category.remove({
    _id:id
  }).then(function () {
    responseData.code = 0;
    responseData.msg = '删除成功';
    res.json(responseData)
  })
})
//内容首页
router.get('/content',function (req,res) {
  var page = Number(req.query.page || 1);
  var limit = Number(req.query.limit || 5);
  ;
  var pages = 0;
  Content.count().then(function (count) {
    pages = Math.ceil(count / limit);
    page = Math.min(page, pages)
    page = Math.max(page, 1)
    var skip = (page - 1) * limit;

    Content.find().sort({_id:-1}).limit(limit).skip(skip).then(function (contents) {
      res.json({
        userInfo: req.userInfo,
        contents: contents,
        page: page,
        pages: pages,
        count: count,
        limit: limit
      })
    })
  })
})

//内容添加
router.get('/content/add',function (req,res) {
  Category.find().sort({_id:-1}).then(categories=>{
    res.json({
      categories:categories
    })
  })
})
//内容保存
router.post('/content/add',function (req,res) {
  new Content({
    category:req.body.category,
    title:req.body.title,
    description:req.body.description,
    content:req.body.content
  }).save().then(rs=>{
    responseData.code=0;
    responseData.msg="内容保存成功";
    res.json(responseData)
  })
  console.log(req.body)
})
module.exports = router;
