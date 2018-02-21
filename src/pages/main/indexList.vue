<template>
  <div class="articleList">
    <div class="article" v-for="ctn in data.contents">
      <div class="article-time">{{ctn.addTime}}</div>
      <div class="article-title">
        <router-link to="">{{ctn.title}}</router-link>
      </div>
      <div class="line"></div>
      <div class="article-body">
        <p class="article-info">
          <span>类别: <el-tag type="primary">{{ctn.category.name}}</el-tag></span>
          <span>阅读量: <el-tag type="primary">{{ctn.views}}</el-tag></span>
          <span>评论: <el-tag type="primary">{{ctn.comments.length}}</el-tag></span>
        </p>
        <p class="summary">{{ctn.description}}</p>
        <router-link :to="{path:'/view',query:{id:ctn._id}}" class="more">阅读全文</router-link>
      </div>
    </div>

    <nav class="v-pager">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next,total"
        :total="data.count"
        :page-size="data.limit"
      > </el-pagination>
    </nav>

  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  .line {
    border-bottom: 1px solid rgba(7, 17, 27, 0.2);
    margin-bottom: 4px;
  }

  .articleList {
    .article {
      padding: 16px 20px 0;
      border-radius: 3px;
      background-color: #fff;
      box-shadow: 0 1px 2px rgba(151, 151, 151, 0.58);
      margin-bottom: 20px;
      min-height: 250px;
      .article-time {
        margin-bottom: 5px;
        line-height: 24px;
        font-weight: bold;
        color: #727272;
      }
      .article-title {
        font-size: 24px;
        line-height: 32px;
        font-weight: 400;
        margin-bottom: 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        & > a {
          color: #000;
          text-decoration: none;
        }
        &:hover {
          /*border-bottom: 1px solid #42b983;*/
        }
      }
      .article-body {
        padding: 5px;
        .article-info {
          font-size: 12px;
          color: #777;
        }
        .summary {
          font-size: 14px;
          height: 80px;
          padding-bottom: 20px;
          line-height: 1.8;
          word-break: break-all;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .more {
          display: inline-block;
          width: 150px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          background: #42b983;
          border-radius: 3px;
          font-size: 16px;
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }

</style>
<script>
  export default {
    data() {
      return {
        data: {
          contents: [],
          count: 0,
          limit: 2,
          pages: 0,
          page: 1,
        }
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      "$route": "fetchDate"
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        let id=this.$route.query['id']||"";
        console.log(id);
        this.$http.get('/main',{
          params:{
            page:this.data.page,
            limit:this.data.limit,
            category:id
          }
        }).then(response => {
          response.data.contents.forEach((content) => {
            content.addTime = this.formatDate(content.addTime);
          })
          this.data = response.data;
        }, response => {
          console.log('error:' + response);
        })
      },
      handleCurrentChange(page){
        this.data.page=page;
        this.getData();
      },
      fetchDate(){
        this.getData();
      }
    }
  }
</script>
