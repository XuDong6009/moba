<template>
    <div>
        <h1>{{id ? '修改' : '创建'}}分类</h1>
        <el-form @submit.native.prevent="save" label-width="120px">
            <el-form-item label="名称">
                <el-input v-model="modal.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        props: ['id'],
        data() {
            return {
                modal: {
                    name: ''
                }
            }
        },
        mounted() {
            this.id && this.fetch() //默认读取修改的内容
        },
        watch: {
            $route: {
                handler: function (val, oldVal) {
                    if(val.name === 'CategoryCreate') {
                        this.modal.name = ''
                    }
                },
                // 深度观察监听
                deep: true
            },
        },
        methods: {
            async save() {
                let result;
                if (this.id) {
                    result = await this.$http.put(`/categories/${this.id}`, this.modal)
                } else {
                    result = await this.$http.post('/categories', this.modal)
                }


                if (result.status === 200) {
                    this.$router.push('/categories/list')
                    this.$message({
                        type: 'success',
                        message: '成功'
                    })
                }
            },
            async fetch() {
                const result = await this.$http.get(`/categories/${this.id}`)
                this.modal.name = result.data.name
            }
        }
    }
</script>

<style>

</style>