<template>
  <div class="articleList">

    <div class="article">
      <div class="article-time">sdfsd</div>
      <div class="article-title">
        <router-link to="">测试</router-link>
      </div>
      <div class="line"></div>
      <div class="article-body">
        <p class="article-info">
          <span>类别: <el-tag type="primary">sss</el-tag></span>
          <span>阅读量: <el-tag type="primary">222</el-tag></span>
          <span>评论: <el-tag type="primary">3333</el-tag></span>
        </p>
        <p class="summary">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur at, culpa, cumque deserunt enim est ipsam ipsum labore laudantium nam odio optio perferendis praesentium quasi quidem recusandae ullam vitae voluptas!</p>
        <router-link to="" class="more">阅读全文</router-link>
      </div>
    </div>

    <nav class="v-pager">

    </nav>

  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  .line{
    border-bottom:1px solid rgba(7,17,27,0.2);
    margin-bottom:4px;
  }
  .articleList{
    .article{
      padding: 16px 20px 0;
      border-radius: 3px;
      background-color: #fff;
      box-shadow:0 1px 2px rgba(151,151,151,0.58);
      margin-bottom:20px;
      min-height: 250px;
      .article-time{
        margin-bottom: 5px;
        line-height: 24px;
        font-weight: bold;
        color: #727272;
      }
      .article-title{
        font-size: 24px;
        line-height: 32px;
        font-weight : 400;
        margin-bottom: 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &>a{
          color:#000;
          text-decoration: none;
        }
        &:hover{
          /*border-bottom: 1px solid #42b983;*/
        }
      }
      .article-body{
        padding:5px;
        .article-info{
          font-size:12px;
          color: #777;
        }
        .summary{
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
        .more{
          display:inline-block;
          width:150px;
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
      return {}
    },
  }
</script>
