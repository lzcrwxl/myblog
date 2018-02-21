const express = require('express')
const router = express.Router();

var Category = require('../models/Category')
var Content = require('../models/Content')


// 统一返回格式
var data;
router.use(function (req, res, next) {
  data = {
    userInfo: req.userInfo,
    categories: [],
  }
  Category.find().then(function (categories) {
    data.categories = categories;
    next();
  })
});

//首页


router.get('/', function (req, res, next) {
  data.category = req.query.category || "";
  data.count = 0;
  data.page = Number(req.query.page || 1);
  data.limit = Number(req.query.limit || 5);
  data.pages = 0;

  var where = {}
  if (data.category) {
    where.category = data.category
  }
  //读取所有的分类信息
  Content.where(where).count().then(function (count) {
    data.count = count;
    data.pages = Math.ceil(data.count / data.limit);
    data.page = Math.min(data.page, data.pages)
    data.page = Math.max(data.page, 1)
    var skip = (data.page - 1) * data.limit;
    return Content.where(where).find().limit(data.limit).skip(skip).populate(['category', 'user']).sort({addTime: -1})
  }).then(function (contents) {
    data.contents = contents;
    res.json(data)
  })
})

router.get('/view', function (req, res) {
  var contentId = req.query.contentid || "";

  Content.findOne({
    _id: contentId
  }).populate(['category', 'user']).then(function (content) {
    console.log(content.comments.length)
    content.views++;
    content.save();
    data.content = content;
    res.json(data)
  })
})
module.exports = router;
