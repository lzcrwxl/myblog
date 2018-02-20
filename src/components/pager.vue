<template>
  <el-pagination
    background
    @current-change="handleCurrentChange"
    layout="prev, pager, next,total"
    :total="total"
    :page-size="pageSize"
  >
  </el-pagination>
</template>

<script type="es6">
	export default {
		name: 'pager',
		props: {
			url: {
				type: String,
				required: true
			}
		},
		data() {
			return {
        total:0,
        page:1,
        pageSize:4
			}
		},
		created(){
			this.getData();
		},
		methods: {
      getData(){
        let url=this.url;
        this.$http.get(url,{
          params: {
            page:this.page,
            limit:this.pageSize
          }
        }).then(res=>{
          this.total=res.data.count;
          this.pageSize=res.data.limit;
          this.$emit('getData', res);
        })
      },
      handleCurrentChange(page) {
        this.page=page;
        this.getData();
      }
		}
	}
</script>

<style lang="less">
  .v-pager{
    position:absolute;
    bottom:5px;
    width:100%;
    ul{
      display:flex;
      li{
        flex:1;
        text-align:center;
        .enable{
          cursor:pointer;
        }
        .disable{
          cursor:default;
          color:#ccc;
        }
      }
    }
  }
</style>
