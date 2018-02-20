
const mongoose=require('mongoose')


module.exports=new mongoose.Schema({
//  标题名称
  title:String,
//关联字段
  category:{
    type:mongoose.Schema.Types.ObjectId,
    //引用
    ref:'Content'
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
})
