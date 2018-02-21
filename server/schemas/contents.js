
const mongoose=require('mongoose')


module.exports=new mongoose.Schema({
//  标题名称
  title:String,
//关联字段
  category:{
    type:mongoose.Schema.Types.ObjectId,
    //引用
    ref:'Category'
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    //引用
    ref:'User'
  },
  //添加事件
  addTime:{
    type:Date,
    default:new Date()
  },
//  阅读量
  views:{
    type:Number,
    default:0
  },
//  简介
  description:{
    type:String,
    default:''
  },
  content:{
    type:String,
    default:''
  },
//  评论
  comments:{
    type:Array,
    default:[]
  }
})
