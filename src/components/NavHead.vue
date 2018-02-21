<template>
  <div class="header">
    <div class="navbar">
      <div class="navbar-header">
        <a class="navbar-brand" href="#">Musk</a>
      </div>
      <ul class="nav">
        <li @click="switchTab" class="activeTab">
          <router-link to="/">
            首页
            {{category}}
          </router-link>
          </li>
        <li v-for="(item,index) in categories" @click="switchTab">
          <router-link :to="{path:'/category',query:{id:item._id}}" :class="{'activeTab':item._id==category}">{{item.name}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "nav-head",
    data(){
      return{
        categories:[],
        category:""
      }
    },
    created(){
      this.getCategories()
    },
    methods:{
      getCategories(){
        this.$http.get('/main',{
          params:{
            category:""
          }
        }).then(res=>{
          this.categories=res.data.categories;
          this.category=res.data.category;
        })
      },
      switchTab(e){
        $(e.currentTarget).addClass('activeTab').siblings('li').removeClass('activeTab')
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .activeTab{
    border-bottom: 3px solid #42b983!important;
  }
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
          a {
            padding: 10px;
            color: #34495e;
            &:hover {
              border-bottom: 3px solid #42b983;
            }
          }
        }
      }
    }
  }
</style>
