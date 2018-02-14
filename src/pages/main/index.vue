<template>
  <div class="index">
    <nav-head></nav-head>
    <!--<div class="header">
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
    </div>-->
    <div class="main">
      <div class="mainLeft">
        <router-view id="levelTwo">

        </router-view>
      </div>
      <main-right></main-right>
      <!--<div class="mainRight">
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
              <input type="password" class="form-control" placeholder="密码" v-model="password">
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
      </div>-->
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>

  .index {

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
    }
  }


</style>
<script>
  import NavHead from '@/components/NavHead'
  import MainRight from '@/components/MainRight'
  export default {
    data() {
      return {

      }
    },
    mounted(){
    //  确认是否登陆

    },
    components:{
      NavHead,
      MainRight
    },
    methods:{
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
            this.warningInfo=res.data.msg;
            this.toggleRL();
          }
          console.log(res)


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
            this.username = response.data.userInfo.username;
          }
        })
      },
      logout(){

      }
    }
  }
</script>
