<template>
  <div class="category_edit">
    <breadcrumb path="分类编辑"></breadcrumb>
    <h3>编辑 -- {{ category.name }}</h3>
    <el-form :model="form" :rules="rules">
      <el-form-item label="分类名称" prop="newCateName">
        <el-input v-model="form.newCateName" placeholder="请输入新的分类名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="es6">
  import breadcrumb from '../../components/breadcrumb.vue'
  export default {
    data() {
      return {
        form: {
          newCateName: '',
        },
        rules: {
          newCateName: [
            {required: true, message: '请输入新的分类名称', trigger: 'blur'},
          ],
        },
        category: {},
      }
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        this.$http.get('/admin/category/edit?id=' + this.$route.query['id']).then(response => {
          this.category = response.data.category;
        }, response => {
          console.log('error:' + response);
        })
      },
      onSubmit() {
        if (this.form.newCateName == '') {
          this.$message({
            message: '分类名不能为空',
            type: 'warning'
          });
          return;
        }
        if (this.form.newCateName == this.category.name) {
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          return;
        }

        this.$http.post('/admin/category/edit', {
          id: this.category._id,
          name: this.form.newCateName,
        }).then(response => {
          if (response.data.code != 0) {
            this.$message({
              message: response.data.msg,
              type: 'warning'
            });
          } else {
            this.$message({
              message: response.data.msg,
              type: 'success'
            });
          }
          this.form.newCateName = '';
          this.getData();
        }, response => {
          console.log('error:' + response);
        })
      },
    },
    components: {
      breadcrumb,
    }
  }

</script>


