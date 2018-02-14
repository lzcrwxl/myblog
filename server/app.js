//应用程序启动

const express=require('express')
const mongoose=require('mongoose')
var bodyParser=require('body-parser')
//设置静态文件托管

//创建app 应用
var app=express();
//第一个末班引擎后缀，第二个解析方法
// app.engine('html',swig.renderFile)
app.use('/public',express.static(__dirname+'/public'))

// app.set('views','./views')
//注册所使用的模板引擎
// app.set('view engine','html')

// swig.setDefaults({cache:false})

app.use(bodyParser.urlencoded({extended:true}))
/*
 * 根据不同的功能划分模块(路由分块)
 *
 * */


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));


mongoose.connect('mongodb://127.0.0.1:27017/blog',function (err) {
  if(err){
    console.log("数据库连接失败")
  }else {
    console.log("数据库连接成功")
  }
});

module.exports = app;



