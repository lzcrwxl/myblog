<template>
  <div class="user_index">
    <breadcrumb path="用户管理"></breadcrumb>
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 80%">
      <el-table-column
        prop="_id"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码">
      </el-table-column>
      <el-table-column
        prop="isAdmin"
        label="是否是管理员">
      </el-table-column>
    </el-table>
    <div class="mt10 mb10">
      <pager :url="url" @getData="gotIt"></pager>
      <!--<el-pagination
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next,total"
        :total="total"
        :page-size="pageSize"
      >
      </el-pagination>-->
      <!--<span>每页显示{{pageSize}}条</span>-->
    </div>
  </div>
</template>

<script type="es6">
  import pager from '../../components/pager.vue'
  import breadcrumb from '../../components/breadcrumb'
  export default {
    data() {
      return {
        tableData: [],
        url:'/admin/user'
      }
    },
    created() {
      this.getData();
    },
    methods: {
      gotIt(response) {
        let users = response.data.users;
        for (let i = 0; i < users.length; i++) {
          users[i].isAdmin = users[i].isAdmin ? '是' : '否';
        }
        this.tableData = response.data.users;
      },
    },
    components: {
      breadcrumb,
      pager
    }
  }
</script>

