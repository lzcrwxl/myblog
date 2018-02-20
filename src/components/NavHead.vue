<template>
  <div class="header">
    <div class="navbar">
      <div class="navbar-header">
        <a class="navbar-brand" href="#">Wu Xiaolong</a>
      </div>
      <ul class="nav">
        <router-link tag="li" to="/category" v-for="(item,index) in categories">{{item.name}}</router-link>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "nav-head",
    data(){
      return{
        categories:[]
      }
    },
    created(){
      this.getCategories()
    },
    methods:{
      getCategories(){
        this.$http.get('/main').then(res=>{
          this.categories=res.data.categories;
        })
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
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
          cursor: pointer;
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
</style>
