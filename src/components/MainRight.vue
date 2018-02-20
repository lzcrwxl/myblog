<template>
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
      <p class="text-danger">{{warningInfo}}</p>
    </div>
    <div class="panel" v-show="showLogin">
      <div class="panel-body">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="用户名" v-model="username">
        </div>
        <div class="form-group">
          <input type="password" class="form-control" placeholder="密码" v-model="password" @keyup.enter="login">
        </div>
      </div>
      <p class="rlBtn" @click="login">登录</p>
      <p>没有账号?去&nbsp;<span @click="toggleRL" class="toggle">注册</span></p>
      <p class="text-danger">{{ warningInfo }}</p>
    </div>

    <div class="info" v-show="showLogined">
      <div class="title">你好,{{username}} <span class="text-danger"></span></div>
      <p v-if="isAdmin">您是管理员,可以进入
        <el-button type="text">
          <router-link to="/admin">后台管理</router-link>
        </el-button>
      </p>
      <p v-else>欢迎来到我的博客</p>
      <p class="text-danger" id="logout" @click="logout">退出</p>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  .text-danger {
    color: #ff4949;
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
        isAdmin:false,
        warningInfo:""
      }
    },
    mounted(){
      //  确认是否登陆
      this.checkLogin()
    },
    components:{
    },
    methods:{
      checkLogin(){
        this.$http.get('/api/user/checkLogin').then(response=>{
          var res=response.data;
          if(res.code==0){
            this.showLogin = !this.showLogin;
            this.showLogined = !this.showLogined;
            this.username = res.userInfo.username;
            this.isAdmin=res.userInfo.isAdmin
          }
          console.log(res)
        })
      },
      toggleRL(){
        this.showLogin = !this.showLogin;
        this.showRegister = !this.showRegister;
      },
      register(){
        let _that=this;
        if (this.username == '') {
          this.warningInfo = '用户名不能为空';
          return;
        }
        if (this.password == '') {
          this.warningInfo = '密码不能为空';
          return;
        }
        if (this.password != this.repassword) {
          this.warningInfo = '两次输入的密码不一致';
          return;
        }
        this.$http.post('/api/user/register',{
          username: this.username,
          password: this.password,
          repassword: this.repassword
        },).then(response=>{
          var res=response.data;
          if(res.code==0){
            this.warningInfo=res.msg;
            this.toggleRL();
          }else {
            console.log(res)
            this.warningInfo=res.msg;
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      login(){
        if (this.username == ''||this.password == '') {
          this.warningInfo = '用户名或密码不能为空';
          return;
        }
        this.$http.post('/api/user/login',{
          username: this.username,
          password: this.password,
        }).then(response=>{
          var res=response.data;
          if (res.code != 0) {
            this.warningInfo = res.msg;
            return;
          }else {
            this.showLogin = !this.showLogin;
            this.showLogined = !this.showLogined;
            this.username = res.userInfo.username;
            this.isAdmin=res.userInfo.isAdmin
          }
        })
      },
      logout(){
        this.$http.get('/api/user/logout').then(res=>{
          if(res.data.code==0){
            this.showLogin = !this.showLogin;
            this.showLogined = !this.showLogined;
          }
        })
      }
    }
  }
</script>
