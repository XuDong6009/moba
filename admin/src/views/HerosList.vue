<template>
    <el-table :data="items">
        <el-table-column prop="_id" label="Id"></el-table-column>
        <el-table-column prop="name" label="英雄名称"></el-table-column>
        <el-table-column prop="avatar" label="图片">
            <template slot-scope="scope">
                <img :src="scope.row.avatar " alt="" height="60px" width="auto">
            </template>
        </el-table-column>
        <el-table-column prop="title" label="称号"></el-table-column>
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
                const result = await this.$http.get('/reset/heros')
                if (result.status === 200) {
                    this.items = result.data
                }
            },
            handleEdit(index, item) {
                const {
                    _id
                } = item
                this.$router.push(`/heros/edit/${_id}`)
            },
            handleDelete(row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const result = await this.$http.delete(`/reset/heros/${row._id}`, {
                        name: '1111'
                    })
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