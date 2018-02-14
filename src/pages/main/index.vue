<template>
  <div class="index">
    <div class="header">
      <div class="navbar">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">Wu Xiaolong</a>
        </div>
        <ul class="nav">
          <router-link tag="li" to="/category">Home</router-link>
          <router-link tag="li" to="/">html</router-link>
          <router-link tag="li" to="/">css</router-link>
          <router-link tag="li" to="/">javascript</router-link>
          <router-link tag="li" to="/">node</router-link>
          <router-link tag="li" to="/">vue</router-link>
        </ul>
      </div>
    </div>
    <div class="main">
      <div class="mainLeft">
        <router-view id="levelTwo">

        </router-view>
      </div>
      <div class="mainRight">
        <div class="panel" v-show="showRegister">
          <div class="panel-body">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="用户名" v-model="username">
            </div>
            <div class="form-group">
              <input type="password" class="form-control" placeholder="密码" v-model="password">
            </div>
            <div class="form-group">
              <input type="password" class="form-control" placeholder="确认密码" v-model="repassword">
            </div>
          </div>
          <p class="rlBtn" @click="register">注册</p>
          <p>已有账号?去&nbsp;<span @click="toggleRL" class="toggle">登录</span></p>
          <p class="text-danger"></p>
        </div>
        <div class="panel" v-show="showLogin">
          <div class="panel-body">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="用户名" v-model="username">
            </div>
            <div class="form-group">
              <input type="password" class="form-control" placeholder="密码" v-model="password">
            </div>
          </div>
          <p class="rlBtn" @click="login">登录</p>
          <p>没有账号?去&nbsp;<span @click="toggleRL" class="toggle">注册</span></p>
          <p class="text-danger">dddd</p>
        </div>

        <div class="info" v-show="showLogined">
          <div class="title">你好, <span class="text-danger"></span></div>
          <p v-if="isAdmin">您是管理员,可以进入
            <el-button type="text">
              <router-link to="/admin">后台管理</router-link>
            </el-button>
          </p>
          <p v-else>欢迎来到我的博客</p>
          <p class="text-danger" id="logout" @click="logout">退出</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  .text-danger {
    color: #ff4949;
  }

  .index {
    .header {
      box-sizing: border-box;
      height: 90px;
      padding: 25px 150px;
      background-color: #fff;
      box-shadow: 0 1px 2px rgba(151, 151, 151, 0.58);
      .navbar {
        height: 40px;
        line-height: 40px;
        .navbar-header {
          float: left;
          .navbar-brand {
            font-size: 20px;
            color: #2c3e50;
            font-weight: 500;
          }
        }
        .nav {
          float: right;
          margin-right: 100px;
          & > li {
            font-size: 16px;
            display: inline-block;
            line-height: 40px;
            margin-right: 20px;
          }
          & > a {
            padding: 10px;
            color: #34495e;
            &:hover {
              border-bottom: 3px solid #42b983;
            }
          }
        }
      }
    }
    .main {
      display: flex;
      padding: 20px;
      .mainLeft {
        flex: 2;
        padding-left: 75px;
        #levelTwo {
          position: relative;
          min-height: 88vh;
        }
      }
      .mainRight {
        flex: 1;
        .panel {
          width: 300px;
          font-size: 14px;
          margin-left: 50px;
          .panel-body {
            border: 1px solid #d5d5d5;
            border-bottom: none;
            border-radius: 3px;
            margin-bottom: 10px;
            .form-group {
              height: 50px;
              line-height: 50px;
              background-color: #fff;
              border-bottom: 1px solid #d5d5d5;
              overflow: hidden;
              .form-control {
                width: 100%;
                box-sizing: border-box;
                padding: 10px;
                &:focus {
                  outline: none;
                }
              }

            }

          }
          .rlBtn {
            height: 40px;
            line-height: 40px;
            text-align: center;
            background: #42b983;
            border-radius: 3px;
            font-size: 20px;
            color: #fff;
            margin-bottom: 10px;
            cursor: pointer;
          }
          .toggle {
            color: #0f88eb;
            cursor: pointer;
          }
        }
        .info {
          width: 300px;
          font-size: 14px;
          margin-left: 50px;
          line-height: 20px;
          padding: 20px;
          background-color: #fff;
          border: 1px solid #d5d5d5;
          #logout {
            cursor: pointer;
          }
        }
      }
    }
  }


</style>
<script>
  export default {
    data() {
      return {
        showLogin:true,
        showLogined:false,
        showRegister:false,
        username:"",
        password:"",
        repassword:"",
        isAdmin:""
      }
    },
    methods:{
      toggleRL(){
        this.showLogin = !this.showLogin;
        this.showRegister = !this.showRegister;
      },
      register(){
        console.log(this.username)
        console.log(this.password)
        this.$http.post('/api/user/register',{
          username: this.username,
          password: this.password,
          repassword: this.repassword
        },).then(res=>{

        }).catch(err=>{
          console.log(err)
        })
      },
      login(){
        console.log(111)
        this.$http.get('/').then(

        )
      },
      logout(){

      }
    }
  }
</script>
