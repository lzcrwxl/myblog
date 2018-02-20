<template>
  <div class="category_index">
    <breadcrumb path="分类管理"></breadcrumb>
    <el-table
      :data="tableData"
      border
      style="width: 80%">
      <el-table-column
        prop="_id"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="name"
        label="分类名称">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small">
            <router-link :to="{path: '/admin/category/edit', query:{id: scope.row._id}}">编辑</router-link>
          </el-button>
          <el-button type="text" size="small" @click="deleteCategory(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="mt10 mb10">
      <pager :url="url" @getData="gotIt" v-if="rerender"></pager>
    </div>
  </div>
</template>

<script type="es6">
  import pager from '../../components/pager.vue'
  import breadcrumb from '../../components/breadcrumb.vue'
  export default {
    data() {
      return {
        tableData: [],
        url: '/admin/category',
        rerender: true,
      }
    },
    methods: {
      gotIt(response) {
        // console.log(response);
        this.tableData = response.data.categories;
      },
      deleteCategory(id) {
        let that = this;
        this.$http.get('/admin/category/delete',{
          params:{
            id:id
          }
        }).then(response => {
          this.rerender = false;
          this.$nextTick(()=> {
            this.rerender = true;
          })
          this.$message({
            message: response.data.msg,
            type: 'success'
          });
        }, response => {
          console.log('error:' + response);
        })
      },
    },
    components: {
      breadcrumb,
      pager,
    }
  }
</script>


