<template>
  <div class="index">
    <nav-head></nav-head>
    <div class="main">
      <div class="mainLeft">
        <router-view id="levelTwo">

        </router-view>
      </div>
      <main-right></main-right>
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
