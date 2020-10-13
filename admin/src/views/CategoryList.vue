<template>
    <el-table :data="items">
        <el-table-column prop="_id" label="Id"></el-table-column>
        <el-table-column prop="parent.name" label="上级分类"></el-table-column>
        <el-table-column prop="name" label="分类名称"></el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        data() {
            return {
                items: []
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            async getList() {
                const result = await this.$http.get('/reset/categories')
                if (result.status === 200) {
                    this.items = result.data
                }
            },
            handleEdit(index, item) {
                const {
                    _id
                } = item
                this.$router.push(`/categories/edit/${_id}`)
            },
            handleDelete(row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const result = await this.$http.delete(`/reset/categories/${row._id}`, {
                        name: '1111'
                    })
                    debugger
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getList() //重新渲染数据
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },

    }
</script>

<style>

</style>